'use strict';

/** Haamu browser entry: projects the browser surface after DOM readiness. */
globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.entry'] = Object.freeze({
  family: 'browser', role: 'browser.entry', version: '0.2.0'
});

function startHaamuBrowser() {
  const status = globalThis.projectHaamuBrowser?.();
  globalThis.HaamuRuntime = Object.freeze({
    state: status?.state ?? 'FAILED',
    startedAt: new Date().toISOString()
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startHaamuBrowser, { once: true });
} else {
  startHaamuBrowser();
}
