'use strict';

/**
 * Haamu Web Text — web-family text system boundary.
 *
 * Owns web text semantics and normalization independently from browser
 * rendering, layout, controls, and typography presentation.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const HaamuWebText = Object.freeze({
  family: 'web',
  role: 'web.text',
  version: '0.1.0',

  normalize(value) {
    if (value == null) return '';
    return String(value).normalize('NFC');
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
});

globalThis.HaamuFamilies['web.text'] = Object.freeze({
  family: HaamuWebText.family,
  role: HaamuWebText.role,
  version: HaamuWebText.version,
});

globalThis.HaamuWebText = HaamuWebText;
