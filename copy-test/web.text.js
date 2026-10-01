'use strict';


/* module-private execution scope */
(() => {
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
  version: '1.27.1',

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

  graphemes(value) {
    const text=this.normalize(value);
    if(typeof Intl!=='undefined'&&Intl.Segmenter){
      const segmenter=new Intl.Segmenter(undefined,{granularity:'grapheme'});
      return Object.freeze(Array.from(segmenter.segment(text),part=>Object.freeze({
        type:'grapheme',value:part.segment,start:part.index,end:part.index+part.segment.length,
      })));
    }
    let offset=0;
    return Object.freeze(Array.from(text,character=>{
      const start=offset;offset+=character.length;
      return Object.freeze({type:'grapheme',value:character,start,end:offset});
    }));
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

  edit(value = '', input = {}) {
    const text=this.normalize(value);
    const start=Math.max(0,Math.min(text.length,Math.trunc(finite(input.selectionStart, text.length))));
    const end=Math.max(start,Math.min(text.length,Math.trunc(finite(input.selectionEnd,start))));
    const inputType=input.inputType ?? null;
    if(inputType==='insertText' && input.data===' ') return start===end ? this.space(text,{position:start}) : this.mutate(text,{operation:'replace',start,end,value:' '});
    if(inputType==='deleteContentBackward') return this.backspace(text,{position:end,start,end,unit:'grapheme'});
    if(inputType==='insertLineBreak' || inputType==='insertParagraph') {
      if(start!==end) {
        const replaced=this.mutate(text,{operation:'replace',start,end,value:'\n'});
        return Object.freeze({...replaced,type:'web-text-new-line',sequence:'\n',position:start,cursor:start+1});
      }
      return this.newLine(text,{position:start});
    }
    if(typeof input.data==='string') return this.mutate(text,{operation:start===end?'insert':'replace',start,end,value:input.data});
    return Object.freeze({
      type:'web-text-edit', operation:inputType ?? 'none', before:text, after:text,
      selection:Object.freeze({start,end}), changed:false,
    });
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
    const prior=this.graphemes(text).filter(grapheme=>grapheme.end<=position).at(-1);
    const removed=prior?.value??'';
    const cut=prior?.start??position;
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
    const horizontal=options.horizontal??'start';
    const vertical=options.vertical??'start';
    const direction=options.direction??'auto';
    const writingMode=options.writingMode??'horizontal-tb';
    const anchor=options.anchor??'content';
    const flow=options.flow??'forward';
    const allowedHorizontal=new Set(['start','center','end','justify']);
    const allowedVertical=new Set(['start','center','end']);
    const allowedDirection=new Set(['auto','ltr','rtl']);
    const allowedWritingMode=new Set(['horizontal-tb','vertical-rl','vertical-lr']);
    if(!allowedHorizontal.has(horizontal))throw new RangeError('Unsupported horizontal text alignment.');
    if(!allowedVertical.has(vertical))throw new RangeError('Unsupported vertical text alignment.');
    if(!allowedDirection.has(direction))throw new RangeError('Unsupported text direction.');
    if(!allowedWritingMode.has(writingMode))throw new RangeError('Unsupported writing mode.');
    return Object.freeze({
      type:'web-text-alignment',
      horizontal,vertical,direction,writingMode,anchor,flow,
      logical:Object.freeze({
        inline:horizontal,
        block:vertical,
        startIsDirectionRelative:horizontal==='start'||horizontal==='end',
      }),
      application:'renderer-neutral',
    });
  },

  align(value, options = {}) {
    const text=this.normalize(value);
    const alignment=this.alignment(options);
    return Object.freeze({
      type:'web-text-aligned',
      text,
      symbols:this.symbolize(text),
      lines:Object.freeze(this.lines(text)),
      alignment,
      preservesText:true,
      changesGeometry:false,
    });
  },

  populateMesh(value = '', topology, options = {}) {
    if(!topology?.grid||!topology?.mesh||!topology?.anchor)throw new TypeError('WebText topology required.');
    const text=this.normalize(value);
    const units=this.graphemes(text);
    const rows=topology.grid.rows,columns=topology.grid.columns;
    const capacity=rows*columns;
    const count=Math.min(units.length,capacity);
    const nodes=[];
    for(let index=0;index<count;index+=1){
      const logicalRow=Math.trunc(index/Math.max(1,columns));
      const logicalColumn=index%Math.max(1,columns);
      const row=topology.anchor.blockDirection==='up'?rows-1-logicalRow:logicalRow;
      const column=topology.anchor.inlineDirection==='left'?columns-1-logicalColumn:logicalColumn;
      nodes.push(Object.freeze({
        type:'web-text-mesh-node',
        index,row,column,
        address:row+':'+column,
        text:units[index].value,
        grapheme:units[index],
        occupied:true,
      }));
    }
    return Object.freeze({
      type:'web-text-populated-mesh',
      source:text,
      topologyType:topology.type,
      nodes:Object.freeze(nodes),
      capacity,
      populated:nodes.length,
      overflow:units.length>capacity,
      displaced:Object.freeze(units.slice(capacity).map(unit=>unit.value)),
      preservesSource:true,
      mayResizePlate:false,
      rendererConnected:false,
      changesGeometry:false,
    });
  },

  populateDisplay(value = '', options = {}) {
    const topology=this.displayTopology(options);
    return Object.freeze({topology,mesh:this.populateMesh(value,topology,options)});
  },

  populatePrompt(value = '', options = {}) {
    const topology=this.promptTopology(options);
    return Object.freeze({
      topology,
      mesh:this.populateMesh(value,topology,options),
      editingAuthority:'native-textarea-ime',
    });
  },

  displayTopology(options = {}) {
    const reservation=this.reserveField(options);
    const field=reservation.field;
    const corner=String(options.corner??'top-left');
    const corners=new Set(['top-left','top-right','bottom-left','bottom-right']);
    if(!corners.has(corner))throw new RangeError('Unknown Plate corner.');
    const cellWidth=Math.max(1,finite(options.cell?.width,1));
    const cellHeight=Math.max(1,finite(options.cell?.height,1));
    const columnGap=Math.max(0,finite(options.cell?.columnGap??options.spacing?.symbol,0));
    const rowGap=Math.max(0,finite(options.cell?.rowGap??options.spacing?.line,0));
    const pitchX=cellWidth+columnGap,pitchY=cellHeight+rowGap;
    const columns=field.width>0?Math.max(0,Math.floor((field.width+columnGap)/pitchX)):0;
    const rows=field.height>0?Math.max(0,Math.floor((field.height+rowGap)/pitchY)):0;
    const right=field.x+field.width,bottom=field.y+field.height;
    const anchor=Object.freeze({
      corner,
      x:corner.endsWith('right')?right:field.x,
      y:corner.startsWith('bottom')?bottom:field.y,
      inlineDirection:corner.endsWith('right')?'left':'right',
      blockDirection:corner.startsWith('bottom')?'up':'down',
    });
    const matrix=Object.freeze({
      type:'web-text-display-matrix',rows,columns,
      address:'row-column',bounds:field,anchor,
    });
    const grid=Object.freeze({
      type:'web-text-display-grid',rows,columns,
      cell:Object.freeze({width:cellWidth,height:cellHeight,columnGap,rowGap,pitchX,pitchY}),
      anchor,bounds:field,
    });
    const mesh=Object.freeze({
      type:'web-text-display-mesh',
      capacity:rows*columns,
      nodes:Object.freeze([]),
      anchor,bounds:field,
      population:'deferred',
    });
    return Object.freeze({
      type:'web-text-display-topology',
      plateAuthority:'read-only',
      dependency:'plate -> display-area -> matrix -> grid -> mesh',
      corner,
      field,
      anchor,
      matrix,grid,mesh,
      mayResizePlate:false,
      mayMovePlate:false,
      rendererConnected:false,
      changesGeometry:false,
    });
  },

  promptTopology(options = {}) {
    const reservation=this.reserveField(options);
    const boundary=reservation.promptBoundary;
    const content=reservation.content;
    const area=Object.freeze({
      type:'web-text-prompt-area',
      x:content.x,
      y:boundary.startsAt,
      width:content.width,
      height:Math.max(0,boundary.endsAt-boundary.startsAt),
    });
    const corner=String(options.promptCorner??options.corner??'bottom-left');
    const corners=new Set(['top-left','top-right','bottom-left','bottom-right']);
    if(!corners.has(corner))throw new RangeError('Unknown Prompt corner.');
    const cellWidth=Math.max(1,finite(options.promptCell?.width??options.cell?.width,1));
    const cellHeight=Math.max(1,finite(options.promptCell?.height??options.cell?.height,1));
    const columnGap=Math.max(0,finite(options.promptCell?.columnGap??options.spacing?.symbol,0));
    const rowGap=Math.max(0,finite(options.promptCell?.rowGap??options.spacing?.line,0));
    const pitchX=cellWidth+columnGap,pitchY=cellHeight+rowGap;
    const columns=area.width>0?Math.max(0,Math.floor((area.width+columnGap)/pitchX)):0;
    const availableRows=area.height>0?Math.max(0,Math.floor((area.height+rowGap)/pitchY)):0;
    const maxRows=Math.max(1,Math.trunc(finite(options.promptMaxRows,3)));
    const rows=Math.min(availableRows,maxRows);
    const right=area.x+area.width,bottom=area.y+area.height;
    const anchor=Object.freeze({
      corner,
      x:corner.endsWith('right')?right:area.x,
      y:corner.startsWith('bottom')?bottom:area.y,
      inlineDirection:corner.endsWith('right')?'left':'right',
      blockDirection:corner.startsWith('bottom')?'up':'down',
    });
    return Object.freeze({
      type:'web-text-prompt-topology',
      area,anchor,
      matrix:Object.freeze({type:'web-text-prompt-matrix',rows,columns,address:'row-column',bounds:area,anchor}),
      grid:Object.freeze({type:'web-text-prompt-grid',rows,columns,cell:Object.freeze({width:cellWidth,height:cellHeight,columnGap,rowGap,pitchX,pitchY}),bounds:area,anchor}),
      mesh:Object.freeze({type:'web-text-prompt-mesh',capacity:rows*columns,nodes:Object.freeze([]),bounds:area,anchor,population:'deferred'}),
      editingAuthority:'native-textarea-ime',
      textAuthority:'web-text',
      plateAuthority:'read-only',
      outputAreaOverlap:false,
      mayResizePlate:false,
      mayMovePlate:false,
      rendererConnected:false,
      changesGeometry:false,
    });
  },

  reserveField(options = {}) {
    const area=this.area(options.area ?? {});
    const padding=Object.freeze({
      top:Math.max(0,finite(options.padding?.top,0)),
      right:Math.max(0,finite(options.padding?.right,0)),
      bottom:Math.max(0,finite(options.padding?.bottom,0)),
      left:Math.max(0,finite(options.padding?.left,0)),
    });
    const content=Object.freeze({
      x:area.x+padding.left,
      y:area.y+padding.top,
      width:Math.max(0,area.width-padding.left-padding.right),
      height:Math.max(0,area.height-padding.top-padding.bottom),
    });
    const promptReserve=Math.max(0,Math.min(content.height,finite(options.promptReserve,0)));
    const gap=Math.max(0,Math.min(Math.max(0,content.height-promptReserve),finite(options.promptGap,0)));
    const field=Object.freeze({
      type:'web-text-output-field',
      x:content.x,
      y:content.y,
      width:content.width,
      height:Math.max(0,content.height-promptReserve-gap),
      role:options.role??'output',
      streams:Object.freeze([...(options.streams??['text','shell','terminal','search','command','status','error'])]),
    });
    const promptBoundary=Object.freeze({
      type:'web-text-prompt-boundary',
      reserved:promptReserve,
      gap,
      startsAt:field.y+field.height+gap,
      endsAt:content.y+content.height,
      authority:'exclusion-only',
    });
    return Object.freeze({
      type:'web-text-field-reservation',
      area,
      padding,
      content,
      field,
      promptBoundary,
      overlap:false,
      changesGeometry:false,
    });
  },

  streamRecord(output, options = {}) {
    if(!output||typeof output!=='object')throw new TypeError('Textual output record required.');
    const type=String(output.type??'text');
    let stream='text',semantic='text',text='',source=type;
    if(type==='terminal-output'){
      stream='terminal';
      semantic=output.stream==='stderr'?'error':output.stream==='system'?'status':'result';
      text=String(output.payload??'');
      source=String(output.shell??'terminal');
    }else if(type==='shell-output'){
      stream='shell';
      semantic=output.stream==='stderr'?'error':output.stream==='system'?'status':'result';
      text=String(output.payload??'');
      source=String(output.shell??'shell');
    }else if(type==='search-output'){
      stream='search'; semantic='result'; source='search';
      text=(output.results??[]).map(result=>typeof result==='string'?result:JSON.stringify(result)).join('\n');
    }else if(type==='prompt-interpretation'){
      stream='command'; semantic='input'; source='prompt'; text=String(output.source??output.body??'');
    }else if(type==='web-text-output'){
      stream=String(options.stream??'text'); semantic=String(options.semantic??'text');
      source=String(options.source??'web-text');
      text=String(output.aligned?.text??output.render?.source?.text??'');
    }else{
      stream=String(options.stream??output.stream??'text');
      semantic=String(options.semantic??output.semantic??(stream==='error'?'error':stream==='status'?'status':'text'));
      source=String(options.source??output.source??type);
      text=String(output.text??output.value??output.payload??'');
    }
    return Object.freeze({
      type:'web-text-stream-record',
      sequence:Math.max(0,Math.trunc(finite(options.sequence??output.sequence,0))),
      stream,source,semantic,text,
      state:String(output.state??options.state??'completed'),
      channelId:String(output.channelId??options.channelId??'unbound'),
      sessionId:String(output.sessionId??options.sessionId??'haamu'),
      originType:type,
      preservesSourceIdentity:true,
    });
  },

  streamRecords(outputs = [], options = {}) {
    return Object.freeze(Array.from(outputs, (output,index)=>this.streamRecord(output,{
      ...options,
      sequence:output?.sequence??index,
    })));
  },

  context(scope, options = {}) {
    const normalized=String(scope??'').trim().toLowerCase();
    const scopes=new Set(['server','local','global','client']);
    if(!scopes.has(normalized))throw new RangeError('Unknown textual context.');
    const contextId=String(options.contextId??normalized);
    const channelId=String(options.channelId??normalized);
    const sessionId=String(options.sessionId??('haamu:'+normalized));
    const promptId=String(options.promptId??(normalized+':prompt'));
    const plateId=String(options.plateId??(normalized+':plate'));
    const reservation=this.reserveField({
      ...options,
      role:normalized,
      streams:options.streams??['text','shell','terminal','search','command','status','error'],
    });
    return Object.freeze({
      type:'web-text-context',
      scope:normalized,
      contextId,channelId,sessionId,promptId,plateId,
      console:Object.freeze({type:'web-text-console-binding',contextId,channelId,sessionId}),
      prompt:Object.freeze({type:'web-text-prompt-binding',promptId,channelId,direction:'output'}),
      plate:Object.freeze({type:'web-text-plate-binding',plateId,channelId,direction:'input'}),
      field:reservation.field,
      promptBoundary:reservation.promptBoundary,
      topology:'prompt-output -> channel -> plate-input',
      placementAuthority:'area-allocation',
      rendererConnected:false,
      changesGeometry:false,
    });
  },

  contexts(options = {}) {
    const definitions=options.definitions??{};
    return Object.freeze(['server','local','global','client'].map(scope=>
      this.context(scope,{...options,...(definitions[scope]??{})})
    ));
  },

  transaction(scope, input = '', options = {}) {
    const context=this.context(scope,options);
    const sequence=Math.max(1,Math.trunc(finite(options.sequence,1)));
    const id=String(options.id??(context.contextId+':tx:'+sequence));
    const source=this.normalize(input);
    const allowed=Object.freeze({
      submitted:Object.freeze(['accepted','rejected']),
      accepted:Object.freeze(['processing','completed','rejected']),
      processing:Object.freeze(['completed','rejected']),
      completed:Object.freeze([]),
      rejected:Object.freeze([]),
    });
    const snapshots=[];
    const snapshot=(state,detail={})=>Object.freeze({
      type:'web-text-transaction-state',
      id,scope:context.scope,state,
      sequence:snapshots.length+1,
      semantic:detail.semantic??state,
      text:this.normalize(detail.text??''),
      reason:detail.reason??null,
    });
    snapshots.push(snapshot('submitted',{semantic:'input',text:source}));
    const transition=(state,detail={})=>{
      const current=snapshots[snapshots.length-1];
      if(!allowed[current.state]?.includes(state))throw new RangeError('Invalid textual transaction transition.');
      const next=snapshot(state,detail); snapshots.push(next); return next;
    };
    return Object.freeze({
      type:'web-text-transaction',
      id,scope:context.scope,context,source,
      initial:snapshots[0],
      state:()=>snapshots[snapshots.length-1],
      history:()=>Object.freeze([...snapshots]),
      transition,
      executable:false,
      rendererConnected:false,
      changesGeometry:false,
    });
  },

  interpretTransaction(scope, input = '', options = {}) {
    const transaction=this.transaction(scope,input,options);
    const source=transaction.source;
    const trimmed=source.trim();
    const prefix=trimmed.match(/^([?!>$])\s*/)?.[1]??null;
    const mode=prefix==='?'?'search':prefix==='!'||prefix==='$'?'shell':prefix==='>'?'prompt':'command';
    const body=prefix?trimmed.slice(1).trimStart():source;
    transaction.transition('accepted',{semantic:mode,text:body});
    return Object.freeze({
      type:'prompt-interpretation',
      mode,source,body,prefix,
      structured:Object.freeze({
        instruction:mode==='prompt'?body:null,
        query:mode==='search'?body:null,
        command:(mode==='command'||mode==='shell')?body:null,
        context:null,
      }),
      transaction,
      channelId:transaction.context.channelId,
      sessionId:transaction.context.sessionId,
      executable:false,
      rendererConnected:false,
      changesGeometry:false,
    });
  },

  session(outputs = [], options = {}) {
    const expectedSession=options.sessionId==null?null:String(options.sessionId);
    const expectedChannel=options.channelId==null?null:String(options.channelId);
    const records=this.streamRecords(outputs,options);
    const accepted=[],rejected=[];
    for(const record of records){
      const sessionMatch=!expectedSession||record.sessionId===expectedSession;
      const channelMatch=!expectedChannel||record.channelId===expectedChannel;
      (sessionMatch&&channelMatch?accepted:rejected).push(record);
    }
    const groups=new Map();
    for(const record of accepted){
      const key=record.originType==='search-output'
        ? 'search:'+record.sequence
        : record.originType==='prompt-interpretation'
          ? 'prompt:'+record.sequence
          : 'io:'+record.sessionId+':'+record.channelId;
      if(!groups.has(key))groups.set(key,[]);
      groups.get(key).push(record);
    }
    const sessions=Array.from(groups,([id,members])=>Object.freeze({
      type:'web-text-session-group',
      id,
      sessionId:members[0]?.sessionId??'haamu',
      channelId:members[0]?.channelId??'unbound',
      records:Object.freeze([...members].sort((a,b)=>a.sequence-b.sequence)),
      streams:Object.freeze(Array.from(new Set(members.map(record=>record.stream)))),
      semantics:Object.freeze(Array.from(new Set(members.map(record=>record.semantic)))),
    }));
    return Object.freeze({
      type:'web-text-session',
      sessionId:expectedSession??'mixed',
      channelId:expectedChannel??'mixed',
      groups:Object.freeze(sessions),
      accepted:Object.freeze(accepted),
      rejected:Object.freeze(rejected),
      ordered:Object.freeze([...accepted].sort((a,b)=>a.sequence-b.sequence)),
      preservesProvenance:true,
      changesGeometry:false,
    });
  },

  allocateStreams(records = [], options = {}) {
    const reservation=this.reserveField(options);
    const allowed=new Set(reservation.field.streams);
    const normalized=records.map((record,index)=>{
      const stream=String(record?.stream??record?.kind??record?.type??'text');
      const text=this.normalize(record?.text??record?.value??record?.payload??'');
      return Object.freeze({
        type:'web-text-stream-record',
        sequence:Math.max(0,Math.trunc(finite(record?.sequence,index))),
        insertion:index,
        stream,
        source:record?.source??stream,
        semantic:record?.semantic??stream,
        text,
        accepted:allowed.has(stream),
      });
    }).sort((a,b)=>a.sequence-b.sequence||a.insertion-b.insertion);
    const accepted=normalized.filter(record=>record.accepted);
    const rejected=normalized.filter(record=>!record.accepted);
    const lines=[];
    for(const record of accepted){
      const members=this.lines(record.text);
      members.forEach((text,index)=>lines.push(Object.freeze({
        type:'web-text-stream-line',
        stream:record.stream,
        source:record.source,
        semantic:record.semantic,
        sequence:record.sequence,
        sourceLine:index,
        text,
      })));
    }
    const lineAdvance=Math.max(0,finite(options.lineAdvance,1))+Math.max(0,finite(options.spacing?.line,0));
    const capacity=lineAdvance>0&&reservation.field.height>0
      ? Math.max(1,Math.floor((reservation.field.height+Math.max(0,finite(options.spacing?.line,0)))/lineAdvance))
      : Math.max(1,lines.length||1);
    const first=Math.max(0,lines.length-capacity);
    return Object.freeze({
      type:'web-text-stream-allocation',
      field:reservation.field,
      promptBoundary:reservation.promptBoundary,
      records:Object.freeze(normalized),
      accepted:Object.freeze(accepted),
      rejected:Object.freeze(rejected),
      lines:Object.freeze(lines),
      visible:Object.freeze(lines.slice(first)),
      displaced:Object.freeze(lines.slice(0,first)),
      capacity,
      firstVisibleLine:first,
      overflow:lines.length>capacity,
      order:'sequence-then-insertion',
      preservesSourceIdentity:true,
      changesGeometry:false,
    });
  },

  allocateArea(value = '', options = {}) {
    const text=this.normalize(value);
    const area=this.area(options.area ?? {});
    const alignment=this.alignment(options.alignment ?? {});
    const reservation=this.reserveField(options);
    const lines=this.lines(text);
    const padding=Object.freeze({
      top:Math.max(0,finite(options.padding?.top,0)),
      right:Math.max(0,finite(options.padding?.right,0)),
      bottom:Math.max(0,finite(options.padding?.bottom,0)),
      left:Math.max(0,finite(options.padding?.left,0)),
    });
    const spacing=Object.freeze({
      line:Math.max(0,finite(options.spacing?.line,0)),
      symbol:Math.max(0,finite(options.spacing?.symbol,0)),
    });
    const contentArea=Object.freeze({
      type:'web-text-content-area',
      x:reservation.field.x,
      y:reservation.field.y,
      width:reservation.field.width,
      height:reservation.field.height,
    });
    const lineAdvance=Math.max(0,finite(options.lineAdvance,1))+spacing.line;
    const columnAdvance=Math.max(0,finite(options.columnAdvance,1))+spacing.symbol;
    const derivedCapacity=lineAdvance>0&&contentArea.height>0
      ? Math.max(1,Math.floor((contentArea.height+spacing.line)/lineAdvance))
      : (lines.length||1);
    const capacity=Math.max(1,Math.trunc(finite(options.capacity,derivedCapacity)));
    const first=Math.max(0,lines.length-capacity);
    const visible=lines.slice(first);
    const origin=Object.freeze({
      x:finite(options.origin?.x,contentArea.x),
      y:finite(options.origin?.y,contentArea.y),
      anchor:options.origin?.anchor??alignment.anchor,
    });
    const placements=visible.map((line,index)=>Object.freeze({
      type:'web-text-line-placement',
      sourceLine:first+index,
      visibleLine:index,
      text:line,
      x:origin.x,
      y:origin.y+(index*lineAdvance),
      inlineAdvance:Array.from(line).length*columnAdvance,
      blockAdvance:lineAdvance,
      alignment,
    }));
    return Object.freeze({
      type:'web-text-area-allocation',
      text,
      role:options.role??'output',
      stream:options.stream??'text',
      area,
      contentArea,
      fieldReservation:reservation,
      padding,
      spacing,
      placementTopology:Object.freeze({
        matrix:'available-via-display-topology',
        grid:'available-via-display-topology',
        mesh:'available-via-display-topology',
        authority:'plate-derived-area-allocation',
      }),
      alignment,
      origin,
      lineAdvance,
      columnAdvance,
      capacity,
      totalLines:lines.length,
      firstVisibleLine:first,
      overflow:lines.length>capacity,
      overflowDirection:lines.length>capacity?'before':'none',
      placements:Object.freeze(placements),
      preservesText:true,
      changesGeometry:false,
    });
  },

  allocateLines(value = '', options = {}) {
    const text=this.normalize(value);
    const hardLines=this.lines(text);
    let offset=0;
    const fallbackLines=hardLines.map((line,index)=>{
      const start=offset,end=start+line.length;
      offset=end+(index<hardLines.length-1?1:0);
      return {start,end,value:line,softBreak:false,hardBreak:index<hardLines.length-1};
    });
    const source=Array.isArray(options.lines) ? options.lines : fallbackLines;
    const capacity=Math.max(1,Math.trunc(finite(options.capacity,3)));
    const normalized=source.map((line,index)=>Object.freeze({
      type:'web-text-line',
      number:index,
      start:Math.max(0,Math.trunc(finite(line.start,0))),
      end:Math.max(0,Math.trunc(finite(line.end,line.value?.length ?? 0))),
      value:line.value == null ? text.slice(line.start ?? 0,line.end ?? 0) : String(line.value),
      softBreak:!!line.softBreak,
      hardBreak:!!line.hardBreak,
    }));
    const first=Math.max(0,normalized.length-capacity);
    return Object.freeze({
      type:'web-text-line-allocation',
      capacity,
      total:normalized.length,
      first,
      last:Math.max(first,normalized.length-1),
      overflowing:normalized.length>capacity,
      displaced:Object.freeze(normalized.slice(0,first)),
      visible:Object.freeze(normalized.slice(first)),
      direction:normalized.length>capacity?'up':'none',
    });
  },

  pullUp(value = '', options = {}) {
    const allocation=this.allocateLines(value,options);
    return Object.freeze({
      type:'web-text-pull-up',
      direction:'up',
      capacity:allocation.capacity,
      displaced:allocation.displaced,
      visible:allocation.visible,
      first:allocation.first,
      last:allocation.last,
      overflowing:allocation.overflowing,
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
      aligned: this.align(value, options.alignment ?? {}),
      allocation: this.allocateArea(value, {
        ...(options.allocation ?? {}),
        alignment: options.alignment ?? options.allocation?.alignment ?? {},
        role: options.role ?? options.allocation?.role ?? 'output',
        stream: options.stream ?? options.allocation?.stream ?? 'text',
      }),
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

  output(value, options = {}) {
    const record = this.process(value, options);
    return Object.freeze({
      type: 'web-text-output',
      text: record.text,
      source: record,
      semantic: options.semantic ?? 'result',
      dynamic: options.dynamic !== false,
      live: options.live ?? 'polite',
      atomic: options.atomic === true,
      relevant: options.relevant ?? 'additions text',
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
?'shell':prefix==='>'?'prompt':'command';
    const body=prefix?trimmed.slice(1).trimStart():source;
    const intent=Object.freeze({
      type:'web-text-intent',
      transactionId:transaction.id,
      scope:transaction.scope,
      prefix,mode,source,body,
      target:mode,
      structured:Object.freeze({
        instruction:mode==='prompt'?body:null,
        query:mode==='search'?body:null,
        command:(mode==='command'||mode==='shell')?body:null,
      }),
      executable:false,
    });
    transaction.transition('accepted',{semantic:'intent',text:body});
    return Object.freeze({
      type:'web-text-interpreted-transaction',
      transaction,
      intent,
      route:Object.freeze({
        from:'prompt',
        to:mode,
        scope:transaction.scope,
        channelId:transaction.context.channelId,
        authorized:false,
      }),
      rendererConnected:false,
      changesGeometry:false,
    });
  },

  pipeline(scope, outputs = [], options = {}) {
    const context=this.context(scope,options);
    const prepared=Array.from(outputs,output=>{
      if(!output||typeof output!=='object')return output;
      return Object.freeze({
        ...output,
        channelId:output.channelId??context.channelId,
        sessionId:output.sessionId??context.sessionId,
      });
    });
    const session=this.session(prepared,{
      ...options,
      channelId:context.channelId,
      sessionId:context.sessionId,
    });
    const allocation=this.allocateStreams(session.ordered,{
      ...options,
      area:context.field,
      role:context.scope,
      streams:context.field.streams,
      promptReserve:0,
      promptGap:0,
    });
    return Object.freeze({
      type:'web-text-context-pipeline',
      scope:context.scope,
      context,
      input:Object.freeze(prepared),
      session,
      allocation,
      executable:false,
      rendererConnected:false,
      changesGeometry:false,
    });
  },

  session(outputs = [], options = {}) {
    const expectedSession=options.sessionId==null?null:String(options.sessionId);
    const expectedChannel=options.channelId==null?null:String(options.channelId);
    const records=this.streamRecords(outputs,options);
    const accepted=[],rejected=[];
    for(const record of records){
      const sessionMatch=!expectedSession||record.sessionId===expectedSession;
      const channelMatch=!expectedChannel||record.channelId===expectedChannel;
      (sessionMatch&&channelMatch?accepted:rejected).push(record);
    }
    const groups=new Map();
    for(const record of accepted){
      const key=record.originType==='search-output'
        ? 'search:'+record.sequence
        : record.originType==='prompt-interpretation'
          ? 'prompt:'+record.sequence
          : 'io:'+record.sessionId+':'+record.channelId;
      if(!groups.has(key))groups.set(key,[]);
      groups.get(key).push(record);
    }
    const sessions=Array.from(groups,([id,members])=>Object.freeze({
      type:'web-text-session-group',
      id,
      sessionId:members[0]?.sessionId??'haamu',
      channelId:members[0]?.channelId??'unbound',
      records:Object.freeze([...members].sort((a,b)=>a.sequence-b.sequence)),
      streams:Object.freeze(Array.from(new Set(members.map(record=>record.stream)))),
      semantics:Object.freeze(Array.from(new Set(members.map(record=>record.semantic)))),
    }));
    return Object.freeze({
      type:'web-text-session',
      sessionId:expectedSession??'mixed',
      channelId:expectedChannel??'mixed',
      groups:Object.freeze(sessions),
      accepted:Object.freeze(accepted),
      rejected:Object.freeze(rejected),
      ordered:Object.freeze([...accepted].sort((a,b)=>a.sequence-b.sequence)),
      preservesProvenance:true,
      changesGeometry:false,
    });
  },

  allocateStreams(records = [], options = {}) {
    const reservation=this.reserveField(options);
    const allowed=new Set(reservation.field.streams);
    const normalized=records.map((record,index)=>{
      const stream=String(record?.stream??record?.kind??record?.type??'text');
      const text=this.normalize(record?.text??record?.value??record?.payload??'');
      return Object.freeze({
        type:'web-text-stream-record',
        sequence:Math.max(0,Math.trunc(finite(record?.sequence,index))),
        insertion:index,
        stream,
        source:record?.source??stream,
        semantic:record?.semantic??stream,
        text,
        accepted:allowed.has(stream),
      });
    }).sort((a,b)=>a.sequence-b.sequence||a.insertion-b.insertion);
    const accepted=normalized.filter(record=>record.accepted);
    const rejected=normalized.filter(record=>!record.accepted);
    const lines=[];
    for(const record of accepted){
      const members=this.lines(record.text);
      members.forEach((text,index)=>lines.push(Object.freeze({
        type:'web-text-stream-line',
        stream:record.stream,
        source:record.source,
        semantic:record.semantic,
        sequence:record.sequence,
        sourceLine:index,
        text,
      })));
    }
    const lineAdvance=Math.max(0,finite(options.lineAdvance,1))+Math.max(0,finite(options.spacing?.line,0));
    const capacity=lineAdvance>0&&reservation.field.height>0
      ? Math.max(1,Math.floor((reservation.field.height+Math.max(0,finite(options.spacing?.line,0)))/lineAdvance))
      : Math.max(1,lines.length||1);
    const first=Math.max(0,lines.length-capacity);
    return Object.freeze({
      type:'web-text-stream-allocation',
      field:reservation.field,
      promptBoundary:reservation.promptBoundary,
      records:Object.freeze(normalized),
      accepted:Object.freeze(accepted),
      rejected:Object.freeze(rejected),
      lines:Object.freeze(lines),
      visible:Object.freeze(lines.slice(first)),
      displaced:Object.freeze(lines.slice(0,first)),
      capacity,
      firstVisibleLine:first,
      overflow:lines.length>capacity,
      order:'sequence-then-insertion',
      preservesSourceIdentity:true,
      changesGeometry:false,
    });
  },

  allocateArea(value = '', options = {}) {
    const text=this.normalize(value);
    const area=this.area(options.area ?? {});
    const alignment=this.alignment(options.alignment ?? {});
    const reservation=this.reserveField(options);
    const lines=this.lines(text);
    const padding=Object.freeze({
      top:Math.max(0,finite(options.padding?.top,0)),
      right:Math.max(0,finite(options.padding?.right,0)),
      bottom:Math.max(0,finite(options.padding?.bottom,0)),
      left:Math.max(0,finite(options.padding?.left,0)),
    });
    const spacing=Object.freeze({
      line:Math.max(0,finite(options.spacing?.line,0)),
      symbol:Math.max(0,finite(options.spacing?.symbol,0)),
    });
    const contentArea=Object.freeze({
      type:'web-text-content-area',
      x:reservation.field.x,
      y:reservation.field.y,
      width:reservation.field.width,
      height:reservation.field.height,
    });
    const lineAdvance=Math.max(0,finite(options.lineAdvance,1))+spacing.line;
    const columnAdvance=Math.max(0,finite(options.columnAdvance,1))+spacing.symbol;
    const derivedCapacity=lineAdvance>0&&contentArea.height>0
      ? Math.max(1,Math.floor((contentArea.height+spacing.line)/lineAdvance))
      : (lines.length||1);
    const capacity=Math.max(1,Math.trunc(finite(options.capacity,derivedCapacity)));
    const first=Math.max(0,lines.length-capacity);
    const visible=lines.slice(first);
    const origin=Object.freeze({
      x:finite(options.origin?.x,contentArea.x),
      y:finite(options.origin?.y,contentArea.y),
      anchor:options.origin?.anchor??alignment.anchor,
    });
    const placements=visible.map((line,index)=>Object.freeze({
      type:'web-text-line-placement',
      sourceLine:first+index,
      visibleLine:index,
      text:line,
      x:origin.x,
      y:origin.y+(index*lineAdvance),
      inlineAdvance:Array.from(line).length*columnAdvance,
      blockAdvance:lineAdvance,
      alignment,
    }));
    return Object.freeze({
      type:'web-text-area-allocation',
      text,
      role:options.role??'output',
      stream:options.stream??'text',
      area,
      contentArea,
      fieldReservation:reservation,
      padding,
      spacing,
      placementTopology:Object.freeze({
        matrix:'detached',
        grid:'detached',
        mesh:'detached',
        authority:'area-allocation',
      }),
      alignment,
      origin,
      lineAdvance,
      columnAdvance,
      capacity,
      totalLines:lines.length,
      firstVisibleLine:first,
      overflow:lines.length>capacity,
      overflowDirection:lines.length>capacity?'before':'none',
      placements:Object.freeze(placements),
      preservesText:true,
      changesGeometry:false,
    });
  },

  allocateLines(value = '', options = {}) {
    const text=this.normalize(value);
    const hardLines=this.lines(text);
    let offset=0;
    const fallbackLines=hardLines.map((line,index)=>{
      const start=offset,end=start+line.length;
      offset=end+(index<hardLines.length-1?1:0);
      return {start,end,value:line,softBreak:false,hardBreak:index<hardLines.length-1};
    });
    const source=Array.isArray(options.lines) ? options.lines : fallbackLines;
    const capacity=Math.max(1,Math.trunc(finite(options.capacity,3)));
    const normalized=source.map((line,index)=>Object.freeze({
      type:'web-text-line',
      number:index,
      start:Math.max(0,Math.trunc(finite(line.start,0))),
      end:Math.max(0,Math.trunc(finite(line.end,line.value?.length ?? 0))),
      value:line.value == null ? text.slice(line.start ?? 0,line.end ?? 0) : String(line.value),
      softBreak:!!line.softBreak,
      hardBreak:!!line.hardBreak,
    }));
    const first=Math.max(0,normalized.length-capacity);
    return Object.freeze({
      type:'web-text-line-allocation',
      capacity,
      total:normalized.length,
      first,
      last:Math.max(first,normalized.length-1),
      overflowing:normalized.length>capacity,
      displaced:Object.freeze(normalized.slice(0,first)),
      visible:Object.freeze(normalized.slice(first)),
      direction:normalized.length>capacity?'up':'none',
    });
  },

  pullUp(value = '', options = {}) {
    const allocation=this.allocateLines(value,options);
    return Object.freeze({
      type:'web-text-pull-up',
      direction:'up',
      capacity:allocation.capacity,
      displaced:allocation.displaced,
      visible:allocation.visible,
      first:allocation.first,
      last:allocation.last,
      overflowing:allocation.overflowing,
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
      aligned: this.align(value, options.alignment ?? {}),
      allocation: this.allocateArea(value, {
        ...(options.allocation ?? {}),
        alignment: options.alignment ?? options.allocation?.alignment ?? {},
        role: options.role ?? options.allocation?.role ?? 'output',
        stream: options.stream ?? options.allocation?.stream ?? 'text',
      }),
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

  output(value, options = {}) {
    const record = this.process(value, options);
    return Object.freeze({
      type: 'web-text-output',
      text: record.text,
      source: record,
      semantic: options.semantic ?? 'result',
      dynamic: options.dynamic !== false,
      live: options.live ?? 'polite',
      atomic: options.atomic === true,
      relevant: options.relevant ?? 'additions text',
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
})();
