'use strict';

/**
 * GNU documentation transform registry.
 *
 * Conversion implementations are added only after their source-format
 * contracts and license/provenance handling are qualified.
 */

const GNUTransforms = Object.freeze({
  version: '0.1.0',
  canonicalSourcePreference: Object.freeze([
    'texinfo',
    'package-source-documentation',
    'official-html',
    'official-pdf'
  ]),
  markdown: Object.freeze({
    role: 'derived-transparent-projection',
    deterministicRequired: true,
    preserveSource: true
  })
});

module.exports = GNUTransforms;
