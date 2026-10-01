'use strict';

globalThis.HaamuFamilies ??= Object.create(null);

const HaamuWebView = Object.freeze({
  family: 'web',
  role: 'web.view',
  type: 'view-viewport-projection',
  version: '0.1.0',

  create(options = {}) {
    const number = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;
    return Object.freeze({
      type: 'web-view',
      id: options.id ?? 'view',
      x: number(options.x, 0),
      y: number(options.y, 0),
      width: Math.max(0, number(options.width, 0)),
      height: Math.max(0, number(options.height, 0)),
      scale: Math.max(0, number(options.scale, 1)),
      alignment: options.alignment ?? 'start',
      overflow: options.overflow ?? 'hidden',
      target: options.target ?? null,
    });
  },

  project(view, content, options = {}) {
    if (!view || view.type !== 'web-view') throw new TypeError('WebView projection requires web-view.');
    return Object.freeze({
      type: 'web-view-projection',
      view,
      content,
      mode: options.mode ?? 'projection',
    });
  },
});

globalThis.HaamuFamilies['web.view'] = Object.freeze({
  family: HaamuWebView.family,
  role: HaamuWebView.role,
  type: HaamuWebView.type,
  version: HaamuWebView.version,
});

globalThis.HaamuWebView = HaamuWebView;
