'use strict';

/**
 * Haamu Browser Input — normalized browser ingress boundary.
 *
 * Captures browser-originating input as renderer-neutral records. It does not
 * grant shell, device, server, local-machine or global execution authority.
 */
globalThis.HaamuFamilies ??= Object.create(null);

let inputSequence = 0;
const freezeRecord = (kind, payload, source='browser') => Object.freeze({
  type:'browser-input',
  kind:String(kind),
  source:String(source),
  sequence:++inputSequence,
  timestamp:new Date().toISOString(),
  payload,
});

const HaamuBrowserInput = Object.freeze({
  family:'browser', role:'browser.input', type:'browser-input-normalizer', version:'0.1.0',

  text(value, metadata={}) {
    return freezeRecord('text', Object.freeze({ value:String(value ?? ''), ...metadata }));
  },

  command(value, shell='client', metadata={}) {
    return freezeRecord('command', Object.freeze({
      value:String(value ?? ''), shell:String(shell), ...metadata,
    }));
  },

  pointer(event) {
    return freezeRecord('pointer', Object.freeze({
      eventType:String(event?.type ?? 'pointer'),
      x:Number(event?.clientX ?? 0), y:Number(event?.clientY ?? 0),
      button:Number(event?.button ?? 0),
    }));
  },

  keyboard(event) {
    return freezeRecord('keyboard', Object.freeze({
      eventType:String(event?.type ?? 'keyboard'),
      key:String(event?.key ?? ''), code:String(event?.code ?? ''),
      repeat:Boolean(event?.repeat),
      alt:Boolean(event?.altKey), ctrl:Boolean(event?.ctrlKey),
      meta:Boolean(event?.metaKey), shift:Boolean(event?.shiftKey),
    }));
  },

  media(kind, value, metadata={}) {
    if (!['audio','video'].includes(kind)) throw new RangeError('Media input must be audio or video.');
    return freezeRecord(kind, Object.freeze({ value, ...metadata }));
  },
});

globalThis.HaamuFamilies['browser.input']=Object.freeze({
  family:HaamuBrowserInput.family, role:HaamuBrowserInput.role,
  type:HaamuBrowserInput.type, version:HaamuBrowserInput.version,
});
globalThis.HaamuBrowserInput=HaamuBrowserInput;
