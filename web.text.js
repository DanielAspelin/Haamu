'use strict';

/**
 * Haamu Web Text — web-family text processor.
 *
 * Text is retained as semantic Unicode data while exposing deterministic
 * vector-ready geometry. Rendering remains owned by graphics/browser layers.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const freezePoint = (x, y) => Object.freeze({ x, y });
const finite = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;

const HaamuWebText = Object.freeze({
  family: 'web',
  role: 'web.text',
  type: 'text-processor-allocator',
  version: '0.3.0',

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
    return Object.freeze({
      type: 'text',
      text,
      lines: Object.freeze(this.lines(text)),
      words: Object.freeze(this.words(text)),
      characters: Object.freeze(characters),
      codePoints: Object.freeze(characters.map(character => character.codePointAt(0))),
      direction: options.direction ?? 'auto',
      language: options.language ?? 'und',
      writingMode: options.writingMode ?? 'horizontal-tb',
    });
  },

  /**
   * Produce renderer-neutral vector placement records.
   * advance/lineHeight are logical units: SVG, Canvas, WebGPU or another
   * graphics system may map them into its own coordinate space.
   */
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
