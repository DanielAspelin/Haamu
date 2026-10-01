# Haamu reconciliation map

Status: Constructive reconciliation plan. This file records ownership candidates; it does not move runtime code or grant runtime authority.

## Governing topology

`Platform` is the outer implementation/delivery boundary.

Within Platform, the four operational contexts are:

- `Server`
- `Local`
- `Global`
- `Client`

`Browser` and `Web` are technical responsibility boundaries. They are not substitutes for the four operational contexts and do not acquire Plate, Prompt, Console, projection, transition, or authorization authority merely through placement.

## First evidence inventory

The current project root contains 177 direct files. The largest immediately evidenced families are:

- `browser.*` — Browser-facing implementation and browser composition candidates.
- `web.*` — Web implementation, processing, layout, media and interoperability candidates.
- `html.*` — DOM/HTML construction candidates already under experimental modularization.
- `command.*`, `shell.*`, `terminal.*`, `search.*` — command and interaction pipeline candidates.
- `text.*`, `audio.*`, `video.*` — processing-family candidates.
- bootstrap/root artifacts including `index.html`, `index.js`, `haamu.js`, `entry.pre.js`, `entry.post.js`, `default.js`.

## Reconciliation rule

No file is moved because of its filename alone. For every candidate:

1. inspect actual responsibility and exports;
2. identify consumers and prerequisites;
3. identify its operational context and technical boundary;
4. detect duplicated or ghost responsibility;
5. preserve provenance and the current qualified behavior;
6. move only when the new owner is evidenced;
7. update bootstrap/import references atomically;
8. rerun the complete copy-test qualification, including the zero-browser-error gate.

Cross-context dependencies remain explicit. Placement does not authorize a module to modify another context.

## Protected baseline

The current successful copy-test qualification is the recovery baseline. The sealed Prompt particle implementation, Plate geometry, transitions, four logical consoles, eight physical projection descriptors, semantic input authority, and context-confinement behavior are not to be rewritten as a side effect of reconciliation.

## Next pass

The first implementation pass is Browser/Web ownership analysis. It will classify each `browser.*` and `web.*` root file as retained implementation, duplicate responsibility, registry/declarative data, test, bootstrap/composition, or unresolved. Physical movement follows only after that classification passes dependency analysis.
