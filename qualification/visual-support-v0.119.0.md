# Haamu visual support v0.119.0

Base: 47bab54a5003ffe8f610df6013899b5b0e3a5ba6. Successor review branch: visual-support-v0.119.0.
Qualification: Under Conditional Experiment. Scope: presentation only.

Changes: remove classic-script lexical collision; connect Plate-generated composition to DOM content; provide per-unit animation ownership and cancellation; segment visual glyph-mode content into grapheme clusters; provide label/value slots with stable numeric spacing; preserve outer plate CSS; remove inherited aria-hidden from open plates and make closed plates inert; respect reduced motion; allow page zoom.

The adapter defaults to empty content. It does not manufacture progress or introduce catalogue/business behavior. Existing matrix links become HTTP(S) anchors; internal matrix navigation requires a caller-supplied content update. Browser font shaping remains responsible for glyphs. Code-point and buffer APIs remain unchanged. Concurrency lanes and GPU buffers remain preparatory, not a parallel renderer.

## Presentation API

```javascript
const result = HaamuVisual.render('top-left', 'Hello world', { columns: 3 });
HaamuVisual.button('top-left', 'S', '42.0%'); // Supply a real result.
const id = result.desktop.mesh.nodes[0].id; // Use result.mobile on mobile.
HaamuVisual.animate('top-left', id, [{ opacity: 0 }, { opacity: 1 }], { duration: 240 });
```

render updates both platform projections without replacing the outer shell or prompt. Animation returns the browser Animation handle (or null when motion is reduced/unavailable). Re-render cancels prior content effects; dispose cancels tracked effects and removes preference listeners. Grapheme mode animates entire grapheme cells; mesh token IDs within the same grapheme intentionally address that same element.

## Evidence and reproduction

- PASS: JavaScript syntax and git diff whitespace checks.
- PASS: node tests/composition.cjs — shared classic-script scope, grapheme preservation and plate composition.
- PASS: node tests/dom-support.cjs with jsdom — boot, text injection resistance, URL scheme filtering, label/value updates, switching and disposal. DOM simulation does not measure layout.
- NOT RUN: node tests/visual-support.cjs with Playwright Chromium — three viewports, geometry invariance, browser animations, reduced motion and browser errors. Chromium installation returned invalid/truncated download archives in this environment.

For a separate validation environment, install jsdom and playwright, install Chromium using the matching Playwright CLI, then run the three scripts from the repository. Runtime has no new dependencies. Browser visual and performance qualification remain pending; do not treat DOM tests as pixel verification.

Recovery: retain the base commit; this branch is additive review history. No merge or live deployment is part of this checkpoint.

References: https://www.w3.org/TR/web-animations-1/ ; https://www.w3.org/TR/css-contain-3/ ; https://www.w3.org/TR/css-fonts-4/ ; https://tc39.es/ecma402/#segmenter-objects ; https://html.spec.whatwg.org/multipage/form-elements.html ; https://www.w3.org/TR/mediaqueries-5/ .
