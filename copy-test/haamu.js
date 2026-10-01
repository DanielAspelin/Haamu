'use strict';

/**
 * Haamu
 * Initial JavaScript project entry point.
 */

const Haamu = Object.freeze({
  name: 'Haamu',
  domain: 'haamu.space',
  version: '0.1.0',
});

if (typeof globalThis !== 'undefined') {
  globalThis.Haamu = Haamu;
}
