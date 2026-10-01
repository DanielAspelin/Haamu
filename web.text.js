'use strict';

/**
 * Haamu Web Text — web-family text processor, allocator, parser and renderer.
 *
 * Text is retained as semantic Unicode data while exposing deterministic
 * vector-ready geometry. WebText emits renderer-neutral render records; browser/graphics layers own final painting.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const freezePoint = (x, y) => Object.freeze({ x, y });
const finite = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;

const HaamuWebText = Object.freeze({
  family: 'web',
  role: 'web.text',
  type: 'text-input-output-processor-allocator-symbolizer-parser-mutator-deparser-font-renderer',
  version: '1.7.0',

  key(event = {}) {
    const key = event.key ?? null;
    const code = event.code ?? null;
    const phase = event.type === 'keyup' ? 'up' : event.type === 'keydown' ? 'down' : (event.phase ?? 'unknown');
    const printable = typeof key === 'string' && Array.from(key).length === 1;
    return Object.freeze({
      type:'web-text-key',
      key,
      code,
      phase,
      pressed:phase === 'down',
      released:phase === 'up',
      repeat:!!event.repeat,
      location:event.location ?? 0,
      printable,
      modifier:!!(key && ['Alt','AltGraph','Control','Meta','Shift'].includes(key)),
      editing:!!(key && ['Backspace','Delete','Enter','Tab'].includes(key)),
      navigation:!!(key && ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown'].includes(key)),
      modifiers:Object.freeze({
        alt:!!event.altKey,
        control:!!event.ctrlKey,
        meta:!!event.metaKey,
        shift:!!event.shiftKey,
      }),
    });
  },

  input(event = {}, state = {}) {
    const key = event.key ?? null, code = event.code ?? null;
    const selectionStart = Math.max(0, Math.trunc(finite(state.selectionStart ?? event.target?.selectionStart, 0)));
    const selectionEnd = Math.max(selectionStart, Math.trunc(finite(state.selectionEnd ?? event.target?.selectionEnd, selectionStart)));
    const phase = event.type ?? 'input';
    return Object.freeze({
      type: 'web-text-input', phase, key, code,
      keyState: this.key(event),
      repeat: !!event.repeat, location: event.location ?? 0,
      inputType: event.inputType ?? null, data: event.data ?? null,
      composing: !!event.isComposing,
      selection: Object.freeze({ start:selectionStart, end:selectionEnd, collapsed:selectionStart===selectionEnd }),
      modifiers: Object.freeze({ alt:!!event.altKey, control:!!event.ctrlKey, meta:!!event.metaKey, shift:!!event.shiftKey }),
      producesText: typeof event.data === 'string' || (typeof key === 'string' && Array.from(key).length === 1),
      timestamp: finite(event.timeStamp, 0),
    });
  },

  symbolize(value) {
    let utf16Offset = 0;
    return Object.freeze(this.characters(value).map((character, index) => {
      const codePoint = character.codePointAt(0);
      const category = /^\p{N}$/u.test(character) ? 'number'
        : /^[\p{L}\p{M}]$/u.test(character) ? 'character' : 'special-character';
      const symbol = Object.freeze({
        type:'symbol', id:`symbol:${index}`, index, value:character, codePoint,
        unicode:`U+${codePoint.toString(16).toUpperCase().padStart(4,'0')}`,
        class:category, whitespace:/^\s$/u.test(character),
        newline:character==='\n'||character==='\r',
        utf16:Object.freeze({ start:utf16Offset, end:utf16Offset+character.length }),
      });
      utf16Offset += character.length;
      return symbol;
    }));
  },

  mutate(value, mutation = {}) {
    const source = this.normalize(value);
    const start = Math.max(0, Math.min(source.length, Math.trunc(finite(mutation.start, source.length))));
    const end = Math.max(start, Math.min(source.length, Math.trunc(finite(mutation.end, start))));
    const insert = mutation.value == null ? '' : String(mutation.value);
    const text = source.slice(0,start) + insert + source.slice(end);
    return Object.freeze({
      type:'web-text-mutation', operation:mutation.operation ?? (start===end?'insert':'replace'),
      before:source, after:text, range:Object.freeze({start,end}),
      inserted:insert, removed:source.slice(start,end),
      selection:Object.freeze({start:start+insert.length,end:start+insert.length}),
      changed:text!==source,
    });
  },

  deparse(parsed, options = {}) {
    if (!parsed || parsed.type !== 'parsed-text') throw new TypeError('WebText deparser requires parsed-text.');
    const text = parsed.tokens.map(token => token.value).join('');
    return options.record ? Object.freeze({
      type:'deparsed-text', text, lossless:text===parsed.source,
      source:parsed, normalization:parsed.normalization,
    }) : text;
  },

  font(options = {}) {
    return Object.freeze({
      type: 'web-text-font',
      family: options.family ?? 'inherit',
      weight: options.weight ?? 'inherit',
      style: options.style ?? 'normal',
      size: options.size ?? 'inherit',
      lineHeight: options.lineHeight ?? 'normal',
      letterSpacing: options.letterSpacing ?? 'normal',
      wordSpacing: options.wordSpacing ?? 'normal',
      fallback: Object.freeze([...(options.fallback ?? [])]),
      stretch: options.stretch ?? 'normal',
      variant: options.variant ?? 'normal',
      features: Object.freeze({ ...(options.features ?? {}) }),
      axes: Object.freeze({ ...(options.axes ?? {}) }),
      direction: options.direction ?? 'inherit',
      writingMode: options.writingMode ?? 'horizontal-tb',
    });
  },

  evolveRight(value, options = {}) {
    const symbols = this.symbolize(value);
    const start = Math.max(0, Math.trunc(finite(options.start, 0)));
    const advance = Math.max(0, finite(options.advance, 1));
    return Object.freeze({
      type:'web-text-evolve-right',
      direction:'right',
      start,
      end:start + symbols.length * advance,
      advance,
      symbols,
    });
  },

  pullLeft(value, options = {}) {
    const symbols = this.symbolize(value);
    const capacity = Math.max(0, Math.trunc(finite(options.capacity, symbols.length)));
    const overflow = Math.max(0, symbols.length - capacity);
    return Object.freeze({
      type:'web-text-pull-left',
      direction:'left',
      capacity,
      overflow,
      displaced:Object.freeze(symbols.slice(0, overflow)),
      visible:Object.freeze(symbols.slice(overflow)),
    });
  },

  lineBreak(value = '', options = {}) {
    const text = this.normalize(value);
    const position = Math.max(0, Math.min(text.length, Math.trunc(finite(options.position, text.length))));
    const kind = options.kind ?? 'soft';
    const sequence = kind === 'hard' ? (options.sequence ?? '\n') : '';
    return Object.freeze({
      type:'web-text-line-break',
      kind,
      position,
      sequence,
      source:options.source ?? (kind === 'hard' ? 'explicit' : 'wrap'),
      before:text,
      after:sequence ? text.slice(0,position)+sequence+text.slice(position) : text,
      preservesText:sequence.length === 0,
    });
  },

  whiteSpace(value = '', options = {}) {
    const text = this.normalize(value);
    const symbols = this.symbolize(text).filter(symbol => symbol.whitespace);
    return Object.freeze({
      type:'web-text-white-space',
      mode:options.mode ?? 'preserve',
      collapse:options.collapse ?? false,
      wrap:options.wrap ?? true,
      trim:options.trim ?? false,
      symbols:Object.freeze(symbols),
      spaces:symbols.filter(symbol => symbol.value === ' ').length,
      tabs:symbols.filter(symbol => symbol.value === '\t').length,
      newlines:symbols.filter(symbol => symbol.newline).length,
    });
  },

  space(value = '', options = {}) {
    const text = this.normalize(value);
    const position = Math.max(0, Math.min(text.length, Math.trunc(finite(options.position, text.length))));
    const character = options.character ?? ' ';
    const after = text.slice(0, position) + character + text.slice(position);
    return Object.freeze({
      type:'web-text-space',
      position,
      character,
      before:text,
      after,
      cursor:position + character.length,
    });
  },

  backspace(value = '', options = {}) {
    const text = this.normalize(value);
    const position = Math.max(0, Math.min(text.length, Math.trunc(finite(options.position, text.length))));
    const start = Math.max(0, Math.min(position, Math.trunc(finite(options.start, position))));
    const end = Math.max(start, Math.min(text.length, Math.trunc(finite(options.end, position))));
    if (start !== end) {
      return Object.freeze({
        type:'web-text-backspace', before:text,
        after:text.slice(0,start)+text.slice(end),
        removed:text.slice(start,end), start, end, cursor:start,
      });
    }
    if (position === 0) return Object.freeze({
      type:'web-text-backspace', before:text, after:text,
      removed:'', start:0, end:0, cursor:0,
    });
    const prefix = Array.from(text.slice(0,position));
    const removed = prefix.pop() ?? '';
    const cut = position - removed.length;
    return Object.freeze({
      type:'web-text-backspace', before:text,
      after:text.slice(0,cut)+text.slice(position),
      removed, start:cut, end:position, cursor:cut,
    });
  },

  newLine(value = '', options = {}) {
    const text = this.normalize(value);
    const position = Math.max(0, Math.min(text.length, Math.trunc(finite(options.position, text.length))));
    const newline = options.sequence ?? '\n';
    const after = text.slice(0, position) + newline + text.slice(position);
    return Object.freeze({
      type:'web-text-new-line',
      sequence:newline,
      position,
      before:text,
      after,
      cursor:position + newline.length,
      lineCount:this.lines(after).length,
    });
  },

  cursor(options = {}) {
    const position = Math.max(0, Math.trunc(finite(options.position, 0)));
    const anchor = Math.max(0, Math.trunc(finite(options.anchor, position)));
    const focus = Math.max(0, Math.trunc(finite(options.focus, position)));
    return Object.freeze({
      type:'web-text-cursor',
      position,
      anchor,
      focus,
      collapsed:anchor===focus,
      visible:options.visible !== false,
      active:options.active !== false,
      affinity:options.affinity ?? 'forward',
      direction:options.direction ?? 'auto',
      line:Math.max(0,Math.trunc(finite(options.line,0))),
      column:Math.max(0,Math.trunc(finite(options.column,0))),
      preferredColumn:Math.max(0,Math.trunc(finite(options.preferredColumn ?? options.column,0))),
      shape:options.shape ?? 'bar',
      blink:options.blink !== false,
    });
  },

  wrapper(options = {}) {
    return Object.freeze({
      type:'web-text-wrapper',
      width:Math.max(0,finite(options.width,0)),
      height:Math.max(0,finite(options.height,0)),
      maxLines:Math.max(1,Math.trunc(finite(options.maxLines,3))),
      direction:options.direction ?? 'inward',
    });
  },

  area(options = {}) {
    return Object.freeze({
      type:'web-text-area',
      x:finite(options.x,0), y:finite(options.y,0),
      width:Math.max(0,finite(options.width,0)),
      height:Math.max(0,finite(options.height,0)),
      overflow:options.overflow ?? 'hidden',
    });
  },

  field(value = '', options = {}) {
    const text=this.normalize(value);
    return Object.freeze({
      type:'web-text-field', text,
      lines:Object.freeze(this.lines(text)),
      editable:options.editable !== false,
      maxLines:Math.max(1,Math.trunc(finite(options.maxLines,3))),
    });
  },

  line(value = '', options = {}) {
    return Object.freeze({
      type:'web-text-line',
      number:Math.max(0,Math.trunc(finite(options.number,0))),
      value:this.normalize(value),
      softBreak:!!options.softBreak,
      hardBreak:!!options.hardBreak,
    });
  },

  selection(options = {}) {
    const anchor=Math.max(0,Math.trunc(finite(options.anchor ?? options.start,0)));
    const focus=Math.max(0,Math.trunc(finite(options.focus ?? options.end,anchor)));
    return Object.freeze({
      type:'web-text-selection', anchor, focus,
      start:Math.min(anchor,focus), end:Math.max(anchor,focus),
      collapsed:anchor===focus,
      direction:focus<anchor?'backward':focus>anchor?'forward':'none',
    });
  },

  caret(options = {}) {
    const position=Math.max(0,Math.trunc(finite(options.position,0)));
    return Object.freeze({
      type:'web-text-caret', position,
      visible:options.visible !== false,
      active:options.active !== false,
      shape:options.shape ?? 'bar',
      blink:options.blink !== false,
    });
  },

  alignment(options = {}) {
    return Object.freeze({
      type:'web-text-alignment',
      horizontal:options.horizontal ?? 'start', vertical:options.vertical ?? 'start',
      direction:options.direction ?? 'auto', writingMode:options.writingMode ?? 'horizontal-tb',
    });
  },

  viewport(value, options = {}) {
    const lines=this.lines(value), capacity=Math.max(1,Math.trunc(finite(options.lines,lines.length||1)));
    const first=Math.max(0,lines.length-capacity);
    return Object.freeze({
      type:'web-text-viewport', capacity, first, last:Math.max(first,lines.length-1),
      overflowing:lines.length>capacity, visible:Object.freeze(lines.slice(first)),
    });
  },

  measure(value, options = {}) {
    const font=this.font(options.font ?? {}), symbols=this.symbolize(value);
    const advance=Math.max(0,finite(options.advance,1)), lineHeight=Math.max(0,finite(options.lineHeight,1));
    const lines=this.lines(value);
    return Object.freeze({
      type:'web-text-measure', font, symbolCount:symbols.length, lineCount:lines.length,
      width:Math.max(0,...lines.map(line=>Array.from(line).length*advance)),
      height:Math.max(1,lines.length)*lineHeight, advance, lineHeight,
    });
  },

  output(value, options = {}) {
    return Object.freeze({
      type: 'web-text-output',
      symbols: this.symbolize(value),
      font: this.font(options.font ?? {}),
      alignment: this.alignment(options.alignment ?? {}),
      cursor: this.cursor(options.cursor ?? {}),
      viewport: this.viewport(value, options.viewport ?? {}),
      measure: this.measure(value, options),
      render: this.render(value, options),
    });
  },

  normalize(value, form = 'NFC') {
    const text = value == null ? '' : String(value);
    return text.normalize(form);
  },

  lines(value) {
    return this.normalize(value).split(/\r?\n/);
  },

  words(value) {
    const text = this.normalize(value).trim();
    return text ? text.split(/\s+/u) : [];
  },

  characters(value) {
    return Array.from(this.normalize(value));
  },

  codePoints(value) {
    return this.characters(value).map(character => character.codePointAt(0));
  },

  parse(value, options = {}) {
    const text = this.normalize(value, options.normalization ?? 'NFC');
    const tokens = [];
    const lines = [];
    const pattern = /\r\n|\r|\n|[\p{L}\p{M}\p{N}_]+|[ \t]+|[^\p{L}\p{M}\p{N}_ \t\r\n]/gu;
    let match;
    let line = 0;
    let column = 0;

    while ((match = pattern.exec(text)) !== null) {
      const lexeme = match[0];
      let type = 'punctuation';
      if (/^\r\n|\r|\n$/u.test(lexeme)) type = 'newline';
      else if (/^[ \t]+$/u.test(lexeme)) type = 'whitespace';
      else if (/^[\p{L}\p{M}\p{N}_]+$/u.test(lexeme)) type = 'word';

      const token = Object.freeze({
        type,
        value: lexeme,
        start: match.index,
        end: match.index + lexeme.length,
        line,
        column,
      });
      tokens.push(token);

      if (type === 'newline') {
        line += 1;
        column = 0;
      } else {
        column += Array.from(lexeme).length;
      }
    }

    for (let number = 0; number <= line; number += 1) {
      const members = tokens.filter(token => token.line === number && token.type !== 'newline');
      lines.push(Object.freeze({
        type: 'text-line',
        number,
        tokens: Object.freeze(members),
        text: members.map(token => token.value).join(''),
      }));
    }

    return Object.freeze({
      type: 'parsed-text',
      source: text,
      normalization: options.normalization ?? 'NFC',
      tokens: Object.freeze(tokens),
      lines: Object.freeze(lines),
    });
  },

  negotiate(stage, units, options = {}) {
    const request = {
      stage,
      units,
      completed: options.completed ?? [],
      capacity: options.capacity,
      direction: options.direction ?? 'forward',
    };
    const concurrency = globalThis.HaamuWebConcurrency?.negotiate
      ? globalThis.HaamuWebConcurrency.negotiate(request)
      : Object.freeze({ type:'concurrency-negotiation', stage, ready:Object.freeze(units), blocked:Object.freeze([]), backPressure:false });
    const parallelism = globalThis.HaamuWebParallelism?.negotiate
      ? globalThis.HaamuWebParallelism.negotiate({ ...request, units:concurrency.ready })
      : Object.freeze({ type:'parallelism-negotiation', stage, capacity:1, lanes:Object.freeze([Object.freeze(concurrency.ready)]) });
    return Object.freeze({ type:'web-text-negotiation', stage, concurrency, parallelism });
  },

  composition(plate, value, options = {}) {
    if (!plate || plate.type !== 'web-plate') throw new TypeError('WebText target must be a Plate.');
    const record = this.process(value, options);
    const unit = options.unit ?? 'token';
    const sourceUnits = unit === 'glyph' ? record.characters : record.parsed.tokens;
    const columns = Math.max(1, Math.trunc(finite(options.columns, 1)));
    const cells = sourceUnits.map((source, index) => {
      const text = unit === 'glyph' ? source : source.value;
      const id = `${unit}:${index}`;
      return {
        row: Math.trunc(index / columns), column: index % columns,
        id, text, link: options.links?.[id] ?? null,
      };
    });
    const rows = Math.max(1, Math.ceil(cells.length / columns));
    const matrix = plate.generateMatrix({ rows, columns, cells });
    const grid = plate.generateGrid(options.grid ?? {});
    const mesh = plate.generateMesh({ ...(options.mesh ?? {}), animationScope: unit });
    return Object.freeze({ plateId: plate.id, unit, record, matrix, grid, mesh });
  },

  processForPlate(value, plate, options = {}) {
    const composition = this.composition(plate, value, options);
    const negotiation = this.negotiate('processor', composition.mesh.nodes, options.execution ?? {});
    return Object.freeze({
      type: 'plate-text-processing',
      negotiation,
      target: plate.id,
      record: composition.record,
      matrix: composition.matrix,
      grid: composition.grid,
      mesh: composition.mesh,
    });
  },

  allocate(value, options = {}) {
    const record = this.process(value, options);
    const start = Math.max(0, Math.trunc(finite(options.start, 0)));
    const capacity = Math.max(record.characters.length, Math.trunc(finite(options.capacity, record.characters.length)));
    const end = start + record.characters.length;
    if (end > start + capacity) throw new RangeError('Text allocation exceeds capacity.');

    return Object.freeze({
      type: 'text-allocation',
      start,
      end,
      length: record.characters.length,
      capacity,
      available: capacity - record.characters.length,
      units: options.allocationUnits ?? 'characters',
      record,
    });
  },

  allocateToPlate(value, plate, options = {}) {
    const composition = this.composition(plate, value, options);
    const allocation = this.allocate(value, options);
    const negotiation = this.negotiate('allocator', composition.mesh.nodes, options.execution ?? {});
    return Object.freeze({
      type: 'plate-text-allocation',
      negotiation,
      target: plate.id,
      allocation,
      matrix: composition.matrix,
      grid: composition.grid,
      mesh: composition.mesh,
    });
  },

  process(value, options = {}) {
    const text = this.normalize(value, options.normalization ?? 'NFC');
    const characters = this.characters(text);
    const parsed = this.parse(text, options);
    return Object.freeze({
      type: 'text',
      text,
      parsed,
      lines: Object.freeze(this.lines(text)),
      words: Object.freeze(this.words(text)),
      characters: Object.freeze(characters),
      codePoints: Object.freeze(characters.map(character => character.codePointAt(0))),
      symbols: this.symbolize(text),
      direction: options.direction ?? 'auto',
      language: options.language ?? 'und',
      writingMode: options.writingMode ?? 'horizontal-tb',
    });
  },

  renderToPlate(value, plate, options = {}) {
    const composition = this.composition(plate, value, options);
    const rendered = this.render(value, options);
    const negotiation = this.negotiate('renderer', composition.mesh.nodes, options.execution ?? {});
    return Object.freeze({
      type: 'plate-text-render',
      negotiation,
      target: plate.id,
      text: rendered,
      matrix: composition.matrix,
      grid: composition.grid,
      mesh: composition.mesh,
    });
  },

  render(value, options = {}) {
    const record = this.process(value, options);
    const vector = this.vectorize(record.text, options);
    const units = (options.unit ?? 'token') === 'glyph'
      ? vector.glyphs.map(glyph => Object.freeze({
          type: 'text-render-unit',
          id: `glyph:${glyph.index}`,
          kind: 'glyph',
          value: glyph.character,
          source: glyph,
        }))
      : record.parsed.tokens.map((token, index) => Object.freeze({
          type: 'text-render-unit',
          id: `token:${index}`,
          kind: token.type,
          value: token.value,
          source: token,
        }));

    return Object.freeze({
      type: 'text-render',
      mode: options.mode ?? 'projection',
      source: record,
      vector,
      units: Object.freeze(units),
      independentlyAddressable: true,
    });
  },

  /**
   * Produce renderer-neutral vector placement records.
   * advance/lineHeight are logical units: SVG, Canvas, WebGPU or another
   * graphics system may map them into its own coordinate space.
   */
  interoperability() {
    return Object.freeze({
      webAssembly: Object.freeze({
        supported: typeof WebAssembly === 'object',
        encoding: 'utf-8',
        memory: 'Uint8Array',
      }),
      webGPU: Object.freeze({
        supported: typeof navigator !== 'undefined' && 'gpu' in navigator,
        codePoints: 'Uint32Array',
        positions: 'Float32Array',
      }),
    });
  },

  toWebAssembly(value, options = {}) {
    const record = this.process(value, options);
    const bytes = new TextEncoder().encode(record.text);
    return Object.freeze({
      type: 'wasm-text-buffer',
      encoding: 'utf-8',
      byteLength: bytes.byteLength,
      bytes,
      record,
    });
  },

  toWebGPU(value, options = {}) {
    const vector = this.vectorize(value, options);
    const count = vector.glyphs.length;
    const codePoints = new Uint32Array(count);
    const positions = new Float32Array(count * 2);
    for (let i = 0; i < count; i += 1) {
      const glyph = vector.glyphs[i];
      codePoints[i] = glyph.codePoint;
      positions[i * 2] = glyph.position.x;
      positions[i * 2 + 1] = glyph.position.y;
    }
    return Object.freeze({
      type: 'webgpu-text-buffer',
      count,
      codePoints,
      positions,
      vector,
    });
  },

  vectorize(value, options = {}) {
    const record = this.process(value, options);
    const originX = finite(options.x, 0);
    const originY = finite(options.y, 0);
    const advance = Math.max(0, finite(options.advance, 1));
    const lineHeight = Math.max(0, finite(options.lineHeight, 1));
    const glyphs = [];
    let x = originX;
    let y = originY;
    let index = 0;

    for (const character of record.characters) {
      if (character === '\n') {
        x = originX;
        y += lineHeight;
        index += 1;
        continue;
      }
      glyphs.push(Object.freeze({
        type: 'text-glyph',
        index,
        character,
        codePoint: character.codePointAt(0),
        position: freezePoint(x, y),
        advance,
      }));
      x += advance;
      index += 1;
    }

    return Object.freeze({
      type: 'vector-text',
      source: record,
      origin: freezePoint(originX, originY),
      units: options.units ?? 'logical',
      glyphs: Object.freeze(glyphs),
    });
  },
});

globalThis.HaamuFamilies['web.text'] = Object.freeze({
  family: HaamuWebText.family,
  role: HaamuWebText.role,
  type: HaamuWebText.type,
  version: HaamuWebText.version,
});

globalThis.HaamuWebText = HaamuWebText;
