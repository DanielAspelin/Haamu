# CHANGELOG

This changelog records material Haamu development, recovery, qualification, and architecture transitions. Git history remains the authoritative provenance record.

## 2026-10-01 — Plate visual recovery and Console reconciliation

### Constructive recovery — `e0a6edb`
- Restored `browser.js` to the accepted Plate/Prompt visual lineage represented by blob `a170a97`.
- Retained the already-matching accepted `index.html` visual definition.
- Recovered Plate/button appearance and movement after the later physical Web Plate split caused a production regression.
- User observation: recovered.
- Qualification: **Verified / Constructive Recovery Seal**.

### Nonvisual Console topology — `49c1edb`
- Reintroduced four logical Consoles without creating additional visual Web Plates.
- Added eight mobile/desktop projection descriptors as metadata only.
- Preserved the accepted common Web Plate as sole visual geometry authority.
- Explicitly prohibited the descriptors from owning Plate geometry, stacking, movement, or DOM layout.
- User observation: works.
- Qualification: **Verified / Constructive Seal**.

### Nonvisual projection-console state — `4b6378d`
- Added per-Console mobile and desktop projection-console state.
- Projection channels begin dormant and nonvisual.
- State explicitly owns no geometry, layout, stacking, or interaction.
- No canvas, CSS, DOM insertion, or visual projection was introduced.
- Qualification: **Under Conditional Experiment** pending runtime observation.

## Quarantined lineage

### Physical Web Plate split — `0352cfd`
- Introduced four logical Consoles mapped to eight independently created mobile/desktop Web Plates.
- The conceptual four-Console/eight-projection model remains valid.
- Its implementation crossed the accepted visual-authority boundary and was subsequently identified as the regression boundary.
- The implementation is retained in Git history for provenance but must not be propagated as visual authority without requalification.

### CLIENT particle/substrate experiments
- Full-viewport and Plate-attached particle projection experiments after the physical split are not production-qualified.
- `f5944c3` and dependent visual experiments are quarantined from the recovered production lineage.
- Isolated `/test/` v8.3 remains the accepted particle Prompt behavior reference, but acceptance of that isolated behavior does not authorize its previous production integration mechanism.

## Governing reconciliation rule

Logical Console and projection architecture may be developed beneath the accepted visual runtime. It must not replace, resize, reposition, restack, or otherwise mutate established Plate/button visual geometry. New visual projection authority must be introduced incrementally and independently qualified.
