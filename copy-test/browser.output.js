'use strict';

/**
 * Haamu Browser Output — bounded browser egress/projection boundary.
 *
 * Accepts prepared output records and delegates final projection to an
 * explicitly supplied target. It does not own semantic processing.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const HaamuBrowserOutput = Object.freeze({
  family:'browser', role:'browser.output', type:'browser-output-projector', version:'0.1.0',

  record(kind, payload, metadata={}) {
    return Object.freeze({
      type:'browser-output', kind:String(kind), payload,
      timestamp:new Date().toISOString(), metadata:Object.freeze({...metadata}),
    });
  },

  project(output, target) {
    if (!output || output.type!=='browser-output') throw new TypeError('Browser output record required.');
    if (typeof target!=='function') throw new TypeError('Explicit browser output target required.');
    return target(output);
  },

  text(payload, metadata={}) { return this.record('text',payload,metadata); },
  audio(payload, metadata={}) { return this.record('audio',payload,metadata); },
  video(payload, metadata={}) { return this.record('video',payload,metadata); },
  terminal(payload, metadata={}) { return this.record('terminal',payload,metadata); },
});

globalThis.HaamuFamilies['browser.output']=Object.freeze({
  family:HaamuBrowserOutput.family, role:HaamuBrowserOutput.role,
  type:HaamuBrowserOutput.type, version:HaamuBrowserOutput.version,
});
globalThis.HaamuBrowserOutput=HaamuBrowserOutput;
