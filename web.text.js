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
  type: 'text-processor-allocator-parser-renderer',
  version: '0.6.0',

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
      direction: options.direction ?? 'auto',
      language: options.language ?? 'und',
      writingMode: options.writingMode ?? 'horizontal-tb',
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
