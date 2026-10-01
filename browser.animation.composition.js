'use strict';

/** Per-projection animation ownership. Reduced motion also cancels live effects. */
globalThis.HaamuBrowserAnimation = Object.freeze({
  create() {
    const effects = new Map();
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const cancel = () => { for (const effect of effects.values()) effect.cancel(); effects.clear(); };
    const changed = () => { if (preference.matches) cancel(); };
    preference.addEventListener('change', changed);
    return Object.freeze({
      animate(id, element, keyframes, options = {}) {
        effects.get(id)?.cancel();
        effects.delete(id);
        if (preference.matches || !element?.animate) return null;
        const effect = element.animate(keyframes, { duration: 240, ...options });
        effects.set(id, effect);
        const release = () => { if (effects.get(id) === effect) effects.delete(id); };
        effect.addEventListener('finish', release, { once: true });
        effect.addEventListener('cancel', release, { once: true });
        return effect;
      },
      cancel,
      dispose() { cancel(); preference.removeEventListener('change', changed); },
    });
  },
});
globalThis.HaamuFamilies['browser.animation.composition'] = Object.freeze({family:'browser',role:'browser.animation.composition',version:'0.2.0'});
