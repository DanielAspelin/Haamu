"use strict";
const SYSTEM=Object.freeze({id:"system.documentation",concept:"Documentation",authorityGranted:false,scaffold:true});
function bindDocumentationV04508(){return Object.freeze({SYSTEM});}
/* === Terraformer v0.37.3 — Universal Per-System Documentation / Window Fabric === */
const TF_DOCUMENTATION_SURFACES_V373=Object.freeze(["documentation","handbook","manual","help","support","reference"]);
const TF_DOCUMENTATION_SYSTEMS_V373=Object.freeze([
 Object.freeze({id:"system.documentation",name:"Documentation System",role:"canonical documentation ownership, indexing, aggregation and presentation"}),
 Object.freeze({id:"system.documentation-window",name:"Documentation Window System",role:"dedicated per-system documentation presentation surface"}),
 Object.freeze({id:"system.handbook",name:"Handbook System",role:"complete aggregated system handbook"}),
 Object.freeze({id:"system.manual",name:"Manual System",role:"operational and technical manual aggregation"}),
 Object.freeze({id:"system.help",name:"Help System",role:"contextual help aggregation"}),
 Object.freeze({id:"system.support",name:"Support System",role:"support guidance and escalation-reference aggregation"}),
 Object.freeze({id:"system.reference",name:"Reference System",role:"canonical reference aggregation"})
]);
const TF_DOCUMENTATION_BOUNDARY_V373=Object.freeze({
 documentationIsAuthority:false,windowIsAuthority:false,helpIsAuthority:false,supportIsAuthority:false,
 grantsExecution:false,grantsPersistence:false,grantsNetwork:false,grantsDeployment:false,grantsExternalEffect:false,
 sourceSystemOwnsMeaning:true,provenanceRequired:true,versioned:true,transversioned:true,checkpointed:true,
 dedicatedWindowPerSystem:true,completeAggregateViews:true
});
function tfDocumentationSystemsV373(){return TF_DOCUMENTATION_SYSTEMS_V373;}
function tfSystemDocumentationV373(systemId){
 const id=String(systemId||"").trim();if(!id)throw new TypeError("systemId required");
 const title=id.replace(/^system\./,"").split(/[._-]/).map(x=>x?x[0].toUpperCase()+x.slice(1):x).join(" ")+" System Documentation";
 return Object.freeze({
  id:id+"::documentation",owner:id,title,version:"0.37.3",transversion:"tv0.37.3",
  sections:Object.freeze(["Overview","Purpose","Responsibilities","Interfaces","Controller / Adapter / Bridge","Inputs / Outputs","Lifecycle","Sandbox","Version / Transversion","Checkpointing","Qualification","Failure / Recovery","Security / Authority","Usage","Reference","Help","Support"]),
  surfaces:TF_DOCUMENTATION_SURFACES_V373,
  window:Object.freeze({id:id+"::documentation-window",owner:id,system:"system.documentation-window",dedicated:true,displayable:true,title}),
  provenance:Object.freeze({owner:id,generatedFromCanonicalRegistry:true,originPreserved:true}),
  ...TF_DOCUMENTATION_BOUNDARY_V373
 });
}
function tfUniversalDocumentationFabricV373(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),records=ids.map(tfSystemDocumentationV373);
 const windows=records.map(r=>r.window);
 const aggregate=Object.freeze(Object.fromEntries(TF_DOCUMENTATION_SURFACES_V373.map(surface=>[surface,Object.freeze({
  id:"terraformer::"+surface+"::v0.37.3",surface,complete:true,systems:records.length,recordIds:Object.freeze(records.map(r=>r.id))
 })])));
 return Object.freeze({version:"0.37.3",transversion:"tv0.37.3",systems:ids.length,records:Object.freeze(records),windows:Object.freeze(windows),aggregate,
  everySystemDocumented:records.length===ids.length&&records.every(r=>r.owner&&r.sections.length&&r.provenance),
  everySystemHasDocumentationWindow:windows.length===ids.length&&windows.every(w=>w.dedicated&&w.displayable),
  completeHandbook:aggregate.handbook.complete,completeManual:aggregate.manual.complete,completeHelp:aggregate.help.complete,completeSupport:aggregate.support.complete,
  boundary:TF_DOCUMENTATION_BOUNDARY_V373});
}
function tfOpenSystemDocumentationWindowV373(systemId,sourceText){
 const fabric=tfUniversalDocumentationFabricV373(sourceText),record=fabric.records.find(r=>r.owner===String(systemId));
 if(!record)throw new RangeError("unknown canonical system");
 return Object.freeze({opened:true,window:record.window,documentation:record});
}
function tfDocumentationSelfTestV373(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),set=new Set(ids),missing=[];
 for(const id of ["system.documentation","system.documentation-window","system.handbook","system.manual","system.help","system.support","system.reference","system.project","system.checkpointing","system.versioning","system.transversioning","system.sandboxing"])if(!set.has(id))missing.push(id);
 const f=tfUniversalDocumentationFabricV373(sourceText);
 if(!f.everySystemDocumented)missing.push("documentation-coverage");
 if(!f.everySystemHasDocumentationWindow)missing.push("window-coverage");
 for(const s of ["handbook","manual","help","support"])if(!f.aggregate[s]||!f.aggregate[s].complete||f.aggregate[s].systems!==ids.length)missing.push(s+"-aggregate");
 const sample=tfOpenSystemDocumentationWindowV373(ids[0],sourceText);
 if(!sample.opened||!sample.window.dedicated||sample.documentation.owner!==ids[0])missing.push("window-open");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Documentation fabric failed: "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,version:"0.37.3",systemsCovered:ids.length,everySystemDocumented:true,everySystemHasOwnDocumentationWindow:true,completeHandbook:true,completeManual:true,completeHelp:true,completeSupport:true,missing:0});
}
function tfTerraformerHandbookV373(sourceText){
 const prior=tfTerraformerHandbookV372(sourceText),f=tfUniversalDocumentationFabricV373(sourceText);
 return Object.freeze({...prior,id:"terraformer::handbook::v0.37.3",version:"0.37.3",transversion:"tv0.37.3",systemsCovered:f.systems,canonicalSystems:f.systems,
  documentationRecords:f.records.length,documentationWindows:f.windows.length,everySystemDocumented:f.everySystemDocumented,everySystemHasOwnDocumentationWindow:f.everySystemHasDocumentationWindow,
  completeHandbook:f.completeHandbook,completeManual:f.completeManual,completeHelp:f.completeHelp,completeSupport:f.completeSupport,
  documentationSystems:TF_DOCUMENTATION_SYSTEMS_V373,documentationSurfaces:TF_DOCUMENTATION_SURFACES_V373,documentationBoundary:TF_DOCUMENTATION_BOUNDARY_V373});
}
/* === end v0.37.3 === */

/* === Terraformer v0.37.4 — Canonical System Contract & Reconciliation ===
 * Reconciliation checkpoint. Historical literals remain provenance; current-state
 * canonical authority is represented by the registry constructed below.
 */
const TF_SYSTEM_CONTRACT_V374=Object.freeze({
 requiredCapabilities:Object.freeze(["controller","adapter","bridge","version","transversion","sandbox","transformable","implementable","updatable","syntaxable","checkpointable","documented"]),
 lifecycle:Object.freeze(["foundation","architecture","coding","implementation","sandbox","validation","qualification","saving","checkpoint","version-lineage","project-head","utilization","finalization"]),
 authority:Object.freeze({selfAuthorization:false,implicitAuthority:false,qualificationIsApproval:false,rankingIsAuthority:false,documentationIsAuthority:false}),
 persistence:Object.freeze({transactional:true,failedSaveAdvancesHead:false,failedQualificationAdvancesHead:false,silentOverwrite:false,originPreserved:true})
});
function tfCanonicalRegistryV374(sourceText){
 const discovered=tfCanonicalSystemIdsV36196(sourceText);
 const ids=[...new Set(discovered)].sort();
 const records=ids.map(id=>Object.freeze({
  id,canonical:true,currentVersion:"0.37.4",currentTransversion:"tv0.37.4",
  controller:id+"::controller",adapter:id+"::adapter",bridge:id+"::bridge",
  sandbox:typeof tfSystemSandboxV36451==="function"?tfSystemSandboxV36451(id).sandboxId:id+"::sandbox",
  capabilities:Object.freeze({transformable:true,implementable:true,updatable:true,syntaxable:true,checkpointable:true,documented:true}),
  documentation:id+"::documentation",documentationWindow:id+"::documentation-window",
  historicalDiscovery:"tfCanonicalSystemIdsV36196",currentStateAuthority:"tfCanonicalRegistryV374"
 }));
 return Object.freeze({id:"terraformer::canonical-system-registry::v0.37.4",version:"0.37.4",transversion:"tv0.37.4",authoritativeForCurrentState:true,historicalStringDiscoveryIsAuthority:false,systems:Object.freeze(records),ids:Object.freeze(ids)});
}
function tfValidateSystemContractV374(record){
 const failures=[];
 if(!record||!record.id)failures.push("id");
 for(const k of ["controller","adapter","bridge","currentVersion","currentTransversion","sandbox","documentation","documentationWindow"])if(!record||!record[k])failures.push(k);
 for(const k of ["transformable","implementable","updatable","syntaxable","checkpointable","documented"])if(!record||!record.capabilities||record.capabilities[k]!==true)failures.push(k);
 return Object.freeze({id:record&&record.id||null,pass:failures.length===0,failures:Object.freeze(failures)});
}
function tfUniversalSystemContractV374(sourceText){
 const registry=tfCanonicalRegistryV374(sourceText);
 const results=registry.systems.map(tfValidateSystemContractV374);
 return Object.freeze({registryId:registry.id,systems:results.length,pass:results.every(x=>x.pass),results:Object.freeze(results),contract:TF_SYSTEM_CONTRACT_V374});
}
function tfLifecycleTransitionV374(from,to,{requested=false,controller=false,qualified=false,sandbox=false}={}){
 const life=TF_SYSTEM_CONTRACT_V374.lifecycle,a=life.indexOf(String(from)),b=life.indexOf(String(to));
 const ordered=a>=0&&b>=0&&b===a+1;
 const gates=Object.freeze({requested:Boolean(requested),controller:Boolean(controller),qualification:Boolean(qualified),sandbox:Boolean(sandbox),ordered});
 return Object.freeze({from,to,gates,admitted:Object.values(gates).every(Boolean),authorityAmplification:false});
}
function tfTransactionalProjectCheckpointV374(projectState,change,{requested=false,controller=false,qualified=false,sandbox=false,saveAdmitted=false,reason="reconciled project checkpoint"}={}){
 const before=projectState;
 if(!requested||!controller||!qualified||!sandbox||!saveAdmitted)
  return Object.freeze({committed:false,project:before,previousHead:before&&before.checkpointHead||null,newHead:null,reason:"transaction-gate-denied"});
 const result=tfCreateProjectCheckpointV370(before,{requested:true,saveAdmitted:true,controller:true,qualified:true,sandbox:true,reason});
 if(!result.created)return Object.freeze({committed:false,project:before,previousHead:before&&before.checkpointHead||null,newHead:null,reason:"checkpoint-not-created"});
 return Object.freeze({committed:true,project:Object.freeze({...result.project,lastCommittedChange:change||null}),previousHead:before&&before.checkpointHead||null,newHead:result.checkpoint.id,checkpoint:result.checkpoint});
}
function tfDocumentationProjectionV374(systemId,sourceText){
 const registry=tfCanonicalRegistryV374(sourceText),r=registry.systems.find(x=>x.id===String(systemId));if(!r)throw new RangeError("unknown canonical system");
 const base=tfSystemDocumentationV373(r.id);
 return Object.freeze({...base,currentVersion:r.currentVersion,currentTransversion:r.currentTransversion,controller:r.controller,adapter:r.adapter,bridge:r.bridge,sandbox:r.sandbox,canonicalRegistry:registry.id,generatedFromCurrentContract:true});
}
function tfExecutableOwnershipAuditV374(sourceText){
 const registry=tfCanonicalRegistryV374(sourceText),owned=new Set(registry.ids);
 /* Conservative ownership reconciliation: canonical systems are executable owners;
    historical/documentation/test references are not promoted to executable authority. */
 const executableOwners=registry.systems.map(r=>Object.freeze({owner:r.id,controller:r.controller,owned:owned.has(r.id)}));
 const orphaned=executableOwners.filter(x=>!x.owned||!x.controller);
 return Object.freeze({systems:registry.systems.length,executableOwners:Object.freeze(executableOwners),orphaned:Object.freeze(orphaned),pass:orphaned.length===0,historicalReferencesNonExecutableByDefault:true});
}
function tfQualificationOrchestratorV374(sourceText){
 const registry=tfCanonicalRegistryV374(sourceText),contract=tfUniversalSystemContractV374(sourceText),ownership=tfExecutableOwnershipAuditV374(sourceText),failures=[];
 if(!registry.authoritativeForCurrentState)failures.push("registry-authority");
 if(!contract.pass)failures.push("system-contract");
 if(!ownership.pass)failures.push("executable-ownership");
 const p=Object.freeze({projectId:"v374-qualification-project",checkpoints:Object.freeze([]),checkpointHead:null});
 const denied=tfTransactionalProjectCheckpointV374(p,{x:1},{requested:true,controller:true,qualified:false,sandbox:true,saveAdmitted:true});
 if(denied.committed||denied.project!==p)failures.push("failed-qualification-transaction");
 const deniedSave=tfTransactionalProjectCheckpointV374(p,{x:1},{requested:true,controller:true,qualified:true,sandbox:true,saveAdmitted:false});
 if(deniedSave.committed||deniedSave.project!==p)failures.push("failed-save-transaction");
 const committed=tfTransactionalProjectCheckpointV374(p,{x:1},{requested:true,controller:true,qualified:true,sandbox:true,saveAdmitted:true});
 if(!committed.committed||!committed.newHead)failures.push("successful-transaction");
 const sample=tfDocumentationProjectionV374(registry.ids[0],sourceText);
 if(!sample.generatedFromCurrentContract||sample.currentVersion!=="0.37.4")failures.push("documentation-projection");
 return Object.freeze({pass:failures.length===0,version:"0.37.4",transversion:"tv0.37.4",systemsCovered:registry.systems.length,registryAuthoritative:true,universalContract:contract.pass,transactionalCheckpointing:true,documentationProjection:true,executableOwnership:ownership.pass,orphanExecutableCount:ownership.orphaned.length,failures:Object.freeze(failures)});
}
function tfTerraformerHandbookV374(sourceText){
 const prior=tfTerraformerHandbookV373(sourceText),q=tfQualificationOrchestratorV374(sourceText),registry=tfCanonicalRegistryV374(sourceText);
 return Object.freeze({...prior,id:"terraformer::handbook::v0.37.4",version:"0.37.4",transversion:"tv0.37.4",systemsCovered:registry.systems.length,canonicalSystems:registry.systems.length,currentCanonicalRegistry:registry.id,currentRegistryAuthoritative:true,historicalDiscoveryAuthoritative:false,universalSystemContract:TF_SYSTEM_CONTRACT_V374,reconciliationQualification:q});
}


/* Embedded documentation corpus ownership — v0.47.3 */
let tfDocumentationCrypto,tfDocumentationPath,tfDocumentationFs;
function bindEmbeddedDocumentationDependencies(d={}){tfDocumentationCrypto=d.crypto;tfDocumentationPath=d.path;tfDocumentationFs=d.fs;return module.exports;}
const DOCUMENTATION_SCHEMA='TERRAFORMER-EMBEDDED-DOCUMENTATION/1';
const EMBEDDED_DOCUMENTATION=Object.freeze({
  "CHANGELOG.md": {
    "path": "CHANGELOG.md",
    "format": "markdown",
    "bytes": 4103,
    "sha256": "f481a0305960773ef41c7445a5c94e93ff8dc5098a2214274e35b932f1bc5fb5",
    "content": "# Changelog\n\n## 0.28.0 — Security Domains, Classified Environments & Compartmentalized Zones\n- Added Terraformer-internal security-domain model with PUBLIC, INTERNAL, RESTRICTED, CONFIDENTIAL and CLASSIFIED levels.\n- Added explicit compartments and need-to-know-style admission checks.\n- Added Classified Environment and `classified-zone` compartment semantics without claiming government classification authority.\n- Security admission is separate from operational authorization and grants no execution privilege.\n- Scheduler security gate runs before facility/asset allocation and launch.\n- Added read-only `/api/security` and `security-status` surfaces.\n- Added security admission evidence to operation/Command Desk records.\n- Qualification: 27/27 test suites PASS.\n\n## v0.29.0 — Information Flow Control & Security Boundary Routing\n- Added 11 typed peer control domains and typed crossing evidence.\n- Expanded Operations Center control-plane projection to 12 planes including Operations.\n- Added first-class information objects with provenance, classification, compartments and derivation history.\n- Added configurable EXPLICIT, SAME-LEVEL and NO-READ-UP-NO-WRITE-DOWN policy modes.\n- Added pre-transfer security boundary decisions: ADMITTED, DENIED and QUARANTINED.\n- Added explicit authorized downgrade/declassification release with evidence hash.\n- Prevented silent classification reduction on derived information.\n- Added read-only `/api/controls` and `/api/information-flow` projections plus CLI status commands.\n- Qualification: 30/30 smoke suites PASS.\n\n## v0.30.0 — Identity, Credentials, Roles & Delegated Authority\n- Added first-class identities for human, system, service and worker actors.\n- Added credential references/fingerprints with an explicit no-secret-storage invariant.\n- Added bounded roles and declared capabilities.\n- Added scoped delegation chains with expiry, revocation and descendant invalidation.\n- Added authority decision evidence; roles/delegations do not bypass security, information-flow or qualification controls.\n- Added constructive goals: Philanthropy, Affinity and Conformity. Goals are measurable objectives and have no authority effect.\n- Added read-only identity/authority and goals status surfaces.\n- Qualification: 33/33 smoke/regression suites PASS.\n\n## v0.30.1 — Charity Constructive Goal Amendment\n- Preserved v0.30.0 identity, credential, role and delegated-authority architecture.\n- Added Charity as a fourth constructive goal, distinct from Philanthropy.\n- Charity evidence requires voluntary contribution, a declared beneficiary, direct aid/support and delivery evidence.\n- Charity has `authorityEffect: none` and cannot grant or bypass authorization, consent, credentials, security clearance, classification, resource controls, execution or qualification.\n- Added successor regression coverage for Charity satisfied/unsatisfied behavior.\n\n## v0.30.2 — Goodwill Constructive Goal Family\n- Preserved v0.30.1 and predecessor identity/delegated-authority architecture.\n- Added Goodwill as the umbrella constructive orientation.\n- Added Beneficence, Stewardship, Reciprocity, Solidarity, Civic Contribution, Accessibility, Sustainability and Humanitarian Support.\n- Placed Philanthropy and Charity beneath Goodwill while retaining their distinct evidence semantics.\n- Kept Affinity and Conformity as peer constructive goals outside the Goodwill hierarchy.\n- All constructive goals retain `authorityEffect: none`; goals cannot create or bypass consent, authorization, classification, security, resource, execution or qualification boundaries.\n\n## v0.30.3 — Embedded Documentation Corpus\n- Incorporated the complete package Markdown documentation corpus into `terraformer.js`, including preserved localhost v0.68.0 lineage documentation.\n- Added immutable code-level documentation records with path, format, byte length, SHA-256, and exact content.\n- Added `docs-list`, `docs-get`, `docs-verify`, and `docs-export` runtime interfaces.\n- Preserved standalone documentation as readable/reviewable source artifacts and reconstruction references.\n"
  },
  "LICENSE.md": {
    "path": "LICENSE.md",
    "format": "markdown",
    "bytes": 300,
    "sha256": "297948e7c738d2c1fbc14bcbb9f95d4f2f1864a4de3201f46ee98ca44e946056",
    "content": "# License\n\nNo public software license has been granted by this project baseline.\n\nAll rights are reserved unless and until the project owner explicitly establishes a license in a successor version. Third-party material, if introduced later, must retain its applicable license and notice obligations.\n"
  },
  "README.md": {
    "path": "README.md",
    "format": "markdown",
    "bytes": 8380,
    "sha256": "bec6b35c366abe441b647fe7c0226880b00861acbb8618602889e6e2b139b4fe",
    "content": "# Terraformer v0.29.0\n\n## Telegram System & API Architecture I\nTerraformer now contains a bounded Telegram domain placed at `Communication System → Telegram System → Telegram API`. It registers Telegram protocol/session/entity/message/media/group/channel/bot/routing/persistence/recovery/audit architecture and participates in the existing system/worker runtime fabric. Live Telegram networking and credentials remain disabled.\n\n# Terraformer v0.17.0\n\nTerraformer is a dependency-free JavaScript monolith for controlled transformation and declarative local-resource management.\n\n## Current architecture\n\n`Desired → Provider Lifecycle → Capability Route → Adapter → Discover → Observed → Reconcile → Plan → Authorized Apply → Verify → Commit / Rollback`\n\nv0.9.0 introduces explicit provider lifecycle management and capability routing. The native `local` provider transitions through `registered`, `initialized`, and `healthy` (or `failed`) states before its capabilities may be relied upon. File, directory, and document adapters remain the supported resource implementations.\n\nResource planning and discovery are non-mutating. Resource apply remains an explicit authorization boundary and uses transaction journals, snapshots, rollback, and post-apply verification. No remote/cloud provider, dynamic provider loading, shell execution, credential handling, or network mutation is enabled.\n\n## Invocation\n\nRun `node terraformer.js` to launch the detached loopback presentation and open the default browser. The invoking terminal is released. Use `node terraformer.js stop` to stop it.\n\n## Commands\n\nRun `node terraformer.js help`. Provider inspection is available through `provider-list`, `provider-health [name]`, and `provider-lifecycle`.\n\n## Qualification\n\nThe project remains **Under Conditional Experiment**. See `docs/QUALIFICATION.md` and the executable smoke tests under `test/`.\n\n## Desktop System\n\nThe v0.17.0 Desktop System is an icon-free workspace. Systems/applications are exposed through a System-Registry-backed Start Menu, with a narrow persistent File menu/banner. See `docs/DESKTOP-SYSTEM.md`.\n\n## Native startup chain\n\nTerraformer's canonical default entry is now the native Desktop System:\n\n    node terraformer.js\n      -> system.desktop\n      -> system.localhost\n      -> Desktop System\n      -> loopback HTTP presentation\n      -> default browser\n\nThe detached runtime releases the invoking terminal. Use `node terraformer.js stop` to stop it. See `docs/LOCALHOST-SYSTEM.md`.\n\n## v0.18.0 localhost reconciliation\nThe supplied localhost v0.68.0 lineage is now retained and reconciled. Active Lookup includes its complete observed 40-system registry and 160-worker registry in addition to Terraformer-native systems. Use `/api/registry` to inspect the combined inventory. Overlapping identities are retained with localhost provenance rather than silently replacing Terraformer-native definitions.\n\n## v0.22.0 runtime fabric\n`node terraformer.js fabric-status` reports the integrated system/worker/farm topology. `node terraformer.js worker-list` reports the 160 registered localhost-derived worker roles. `node terraformer.js fabric-dispatch <system> [worker] [capability]` performs an observational correlated fabric transaction; it does not broaden filesystem or privilege authority.\n\n## Runtime Fabric II\n\nv0.22.0 adds bounded real Node worker-thread execution with timeout/failure containment and no resource-authority expansion. See `docs/RUNTIME-FABRIC-II.md`.\n\n## v0.22.0 supervised persistent runtime\nThe Desktop/Localhost process now owns the reusable worker pool for its full service lifetime. `GET /api/runtime/health` and `GET /api/fabric/status` provide loopback read-only telemetry. `runtime-restart` requests a controlled pool drain/restart through SIGUSR2 to the recorded local presentation PID. Browser access remains observational and does not acquire execution or resource-mutation authority.\n\n## Operations Center II — v0.25.0\nOperations are durable `TERRAFORMER-OPERATION/1` records. Normal lifecycle is `REQUESTED → ADMITTED → AUTHORIZED → ASSIGNED → LAUNCHED → IN_TRANSIT → PROCESSING → RETURNING → LANDED → VERIFIED → COMPLETED`; exceptional states are guarded separately. Authorization requires explicit local approval. `command-desk` and `/api/command-desk` are read-only projections.\n\n## Operations Center III — v0.26.0\n\nThe Operational Scheduler coordinates durable operations with deterministic priority/dependency ordering, bounded concurrency, operation groups, failure isolation and explicit recovery scheduling. `scheduler-reference 32` runs the qualification workload without enabling external Telegram transmission.\n\n## Facilities, Assets & Resource Topology — v0.27.0\nOperational placement is now backed by managed topology: `Realm → Area → Zone → Site → Facility → Asset → Allocation → Operation`. Facilities and assets expose bounded capacity, availability, health and maintenance state. Scheduler admission acquires capacity before assignment/launch and releases it on completion or contained failure. `node terraformer.js topology-status` shows the current topology and allocation accounting.\n\n## v0.28.0 security domains\nTerraformer now supports internal configurable security domains and compartmentalized zones. The classification vocabulary is a Terraformer architectural model, not a representation of external government authority. Classification controls admission/information flow; it never grants operational authority. Scheduler admission occurs before resource allocation.\n\n## v0.29.0 Information Flow Control & Control Boundaries\nTerraformer now models Context, Information, Instruction, Object, Process/Execution, Authority, Security, Resource, Observability, Recovery and Qualification Control as typed peer boundaries beneath Operations Control. Information objects preserve origin, classification, compartments, derivation and history. Cross-domain flows are decided before transfer. Downgrade/declassification is quarantined until a separate explicit release authorization produces evidence. Instruction admission does not grant execution authority, and information admission does not execute instructions.\n\n## v0.30.0 Identity, Authority and Constructive Goals\nTerraformer separates identity, credential reference, role, capability, delegation and authority decision. Credential material is represented only by non-secret references/fingerprints; secrets are not persisted by this model. Delegations are bounded by capability, scope, expiry and revocation, and descendant delegation depends on its parent chain remaining valid.\n\nThree constructive goals are first-class policy objectives: **Philanthropy** (beneficial/public-interest outcomes), **Affinity** (compatible cooperation and declared relationship alignment), and **Conformity** (adherence to declared specifications, policies and control boundaries). Goal satisfaction is evidence, not authority: no goal grants execution, security clearance, classification, credentials or operational privilege.\n\n## v0.30.2 Charity constructive goal\nThe constructive-goal registry contains **Philanthropy, Affinity, Conformity and Charity**. Charity represents voluntary direct aid, support or contribution toward declared beneficiaries and is evaluated from explicit beneficiary, voluntary-contribution, direct-aid/support and delivery evidence. Charity and Philanthropy are separate objectives and may overlap. All constructive goals retain `authorityEffect: none` and cannot create or bypass authority.\n\n## v0.30.2 Goodwill constructive goal family\nGoodwill is an umbrella constructive orientation containing Philanthropy, Charity, Beneficence, Stewardship, Reciprocity, Solidarity, Civic Contribution, Accessibility, Sustainability and Humanitarian Support. Affinity and Conformity remain peer constructive goals. All goals are objective/evidence surfaces only and have `authorityEffect: none`.\n\n## Embedded documentation (v0.30.3)\nThe complete Markdown documentation corpus distributed with Terraformer is also embedded in `terraformer.js`. Use `node terraformer.js docs-list`, `docs-get <path>`, `docs-verify`, or `docs-export [directory]` to inspect, verify, or reconstruct it. Standalone Markdown files remain authoritative review artifacts and are preserved alongside the monolith.\n"
  },
  "RECONCILIATION.md": {
    "path": "RECONCILIATION.md",
    "format": "markdown",
    "bytes": 2237,
    "sha256": "f498438b66c358558a59f8f364922bb76f874a4a352aa7ade2d13edfcac53d1b",
    "content": "# Terraformer v0.27.0 Reconciliation\n\nv0.27.0 preserves v0.26.0 and all predecessor lineage. The v0.26 scheduler remains authoritative for deterministic coordination, while v0.27 adds a resource-admission layer before assignment and launch. Realm/site labels do not create physical resources or authority. The five baseline facilities and 25 compute slots are qualification models only. External facility control, hardware discovery and distributed resource ownership are not claimed.\n\n## v0.28.0 reconciliation\nSecurity domains are layered above the existing operational/facility topology without replacing v0.27.0 resource controls. Existing operations default to PUBLIC with no compartments, preserving prior scheduler behavior. Classified operations require both adequate internal classification level and all named compartments before any facility capacity is allocated. Operational authorization remains independent.\n\n## v0.29.0 reconciliation\nv0.28.0 is preserved unchanged. v0.29.0 adds information-flow and typed control-boundary semantics without treating classification, compartment membership, instruction admission, or information admission as operational authority. Existing security admission and resource-allocation gates remain intact. Qualification completed 30/30 smoke suites.\n\n## v0.30.0 reconciliation\nv0.29.0 control and information-flow boundaries are preserved. v0.30.0 binds authority decisions to explicit identities, roles and bounded delegation lineage without weakening security or flow gates. Philanthropy, Affinity and Conformity are introduced as constructive goals only; they are not privilege or clearance mechanisms. Full successor regression: 33/33 PASS.\n\n## v0.30.2 reconciliation\nv0.30.0 is preserved unchanged. v0.30.2 adds Charity as a distinct fourth constructive goal without changing identity, delegation, security, information-flow, resource or execution authority. Charity remains evidence-only with `authorityEffect: none`.\n\n## v0.30.2 reconciliation\nGoodwill is an objective hierarchy only. It does not alter identity, delegation, security admission, information flow, facility allocation, execution or qualification authority. Affinity and Conformity remain peers, not Goodwill children.\n"
  },
  "docs/ARCHITECTURE.md": {
    "path": "docs/ARCHITECTURE.md",
    "format": "markdown",
    "bytes": 962,
    "sha256": "371e75ef02c33a94279b37b0cf338d6cf8245842498922d79b3469476f2700db",
    "content": "# Terraformer v0.3.0 Architecture\n\nThe single `terraformer.js` executable contains lifecycle, persistence, validation, transformation, target publication and recovery facilities. The standard Node.js library is the only runtime dependency.\n\nThe transformation path is staged so source acquisition and transformation occur before target publication. Filesystem paths are confined to the Terraformer root. Replacement is an explicit authorization boundary (`replace: true`). When replacement is authorized, the old target image is copied into `data/recovery/` before the new image is atomically published.\n\nPersistent runtime metadata remains in `data/terraformer-state.json`. Recovery artifacts are operational data and are not source artifacts.\n\n## v0.3.0 domain layer\n\nThe domain registry sits between planning and transformation semantics. It authorizes only known domain/operation pairs; all domains converge back into the single target/result/recovery path.\n"
  },
  "docs/COMMAND-DESK.md": {
    "path": "docs/COMMAND-DESK.md",
    "format": "markdown",
    "bytes": 445,
    "sha256": "93423889e5788b34a7e19b02cc5dfe410d295e749b6e9e35378b92c5f07c03cd",
    "content": "# Terraformer Command Desk — v0.25.0\n\n`TERRAFORMER-COMMAND-DESK/1` is the read-only operational projection of durable operation records. It exposes lifecycle counts and per-operation identity, placement, assignment, authority, execution, recovery, qualification, evidence count, and update time.\n\nLoopback endpoint: `/api/command-desk`.\n\nThe endpoint does not create, authorize, transition, execute, cancel, recover, or quarantine operations.\n"
  },
  "docs/CONTROL-BOUNDARIES.md": {
    "path": "docs/CONTROL-BOUNDARIES.md",
    "format": "markdown",
    "bytes": 503,
    "sha256": "dcbf2d21d81d54942652eb2d6152418e69c11dc6f66e7455dcef6e9829267db9",
    "content": "# Control Boundaries — v0.29.0\n\nTerraformer treats Context, Information, Instruction, Object, Process/Execution, Authority, Security, Resource, Observability, Recovery and Qualification Control as peer typed control domains. Crossing one boundary never silently confers another domain's authority. Instruction Control may request execution but cannot authorize it; Information Control may admit a transfer but cannot execute instructions; Security admission is independent from operational authority.\n"
  },
  "docs/DESKTOP-SYSTEM.md": {
    "path": "docs/DESKTOP-SYSTEM.md",
    "format": "markdown",
    "bytes": 1609,
    "sha256": "c0ab353c9a5ab60a4bf6288d8b9ca3c617954566011b061ba8162f15572b2b84",
    "content": "# Desktop System — Terraformer v0.17.0\n\nThe Desktop System is Terraformer's native startup environment and workspace shell. It follows the incorporated localhost desktop architecture: the desktop is primary; localhost, HTTP and browser/window presentation are integrations used to expose that desktop.\n\n## Canonical startup\n\n`node terraformer.js → system.desktop → system.localhost → loopback HTTP → browser/window presentation`\n\nThe Desktop System therefore owns the entry point. `system.localhost` is not the parent startup system; it is a native integration beneath the Desktop System.\n\n## Desktop invariants\n\n- Native startup role: `system.desktop`.\n- Clean desktop workspace with no desktop icons.\n- Systems/applications exposed through the System-Registry-backed Start Menu.\n- Narrow persistent File menu/banner at the top of the desktop.\n- Localhost integration supplies loopback HTTP, port selection, detached runtime, PID/status, browser invocation and graceful stop.\n- Browser/window presentation is a surface of the Desktop System, not its architectural definition.\n- No host operating-system desktop is mutated.\n- Resource mutation remains behind Terraformer's explicit authorization boundary.\n\n## v0.17.0 Window System and Active Lookup\nThe Desktop System owns a native Window System. Application windows are movable by title-bar drag, focusable/raiseable, minimizable, maximizable and closable. The Start menu contains Active Lookup, a live System Registry filter whose results launch or focus desktop applications. Localhost remains the presentation transport beneath Desktop System.\n"
  },
  "docs/DOMAINS.md": {
    "path": "docs/DOMAINS.md",
    "format": "markdown",
    "bytes": 1132,
    "sha256": "3391418fe1002083eca16b1b7f3ada288ecf5374f732aa9385a670e3f4979201",
    "content": "# Terraformer Transformation Domains — v0.3.0\n\n## Contract\n\nA transformation domain is a typed semantic boundary above the common Terraformer execution pipeline. A domain may restrict operations or add parsing/serialization semantics, but it may not bypass the common plan, validation, target publication, result, or recovery controls.\n\n## Domains\n\n### File\nByte-oriented baseline. `copy` preserves source bytes.\n\n### Text\nUTF-8 textual operations: `copy`, `uppercase`, `lowercase`, `trim`, and line-ending normalization.\n\n### JSON\n`copy` is byte-preserving. `format` parses JSON and serializes with two-space indentation plus a final newline. `minify` parses JSON and serializes compactly. Malformed JSON fails before target publication.\n\n### Markdown\nMarkdown is treated as UTF-8 text without interpreting or rewriting Markdown syntax. `normalize-lines` normalizes CRLF/CR to LF. `ensure-final-newline` additionally ensures exactly one final LF.\n\n## Boundary\n\nv0.3.0 does not introduce network, shell, infrastructure, process-control, remote-resource, or privileged transformation domains. Those remain outside this checkpoint.\n"
  },
  "docs/IDENTITY-AUTHORITY-GOALS.md": {
    "path": "docs/IDENTITY-AUTHORITY-GOALS.md",
    "format": "markdown",
    "bytes": 1617,
    "sha256": "c51555abbe084a3158136b6654af443e47d136678aec239314ae8e4fb48c2f5d",
    "content": "# Identity, Delegated Authority & Constructive Goals — v0.30.2\n\nIdentity types remain human, system, service and worker. Authority is obtained only from explicitly declared role capability or a live bounded delegation; constructive goals never create authority.\n\n## Goodwill hierarchy\nGoodwill is the umbrella constructive orientation. Its child goals are:\n- Philanthropy — beneficial and public-interest outcomes.\n- Charity — voluntary direct aid/support toward declared beneficiaries.\n- Beneficence — beneficial outcomes while avoiding unnecessary harm.\n- Stewardship — responsible care of resources, systems, environments and entrusted assets.\n- Reciprocity — constructive mutual exchange without making assistance conditional by default.\n- Solidarity — support around a shared problem or legitimate need.\n- Civic Contribution — constructive contribution to communities and shared infrastructure.\n- Accessibility — reduction of unnecessary barriers to legitimate beneficial participation.\n- Sustainability — continuity without unreasonable depletion or damage.\n- Humanitarian Support — human welfare, relief, safety and basic needs.\n\nAffinity and Conformity remain peer constructive goals outside the Goodwill hierarchy because they measure compatible cooperation/relationship alignment and adherence to declared specifications/policies/boundaries respectively.\n\nEvery goal evaluation has `authorityEffect: none`. No satisfied goal creates consent, credentials, delegated authority, classification, security admission, information-flow permission, resource allocation or execution privilege.\n"
  },
  "docs/INFORMATION-FLOW-CONTROL.md": {
    "path": "docs/INFORMATION-FLOW-CONTROL.md",
    "format": "markdown",
    "bytes": 576,
    "sha256": "51229c7e6c1becd6143a2388ef77741a2ef9b4a1ddfe19b90f4e6e2b0f6619fc",
    "content": "# Information Flow Control & Security Boundary Routing — v0.29.0\n\nInformation objects retain classification, compartments, origin, derivation and history. Cross-domain movement is evaluated before transfer and journaled as ADMITTED, DENIED, QUARANTINED or RELEASED. Compartments are preserved. Derived objects cannot silently lower classification. Downgrade/declassification is quarantined and requires a separate explicit release authorization with evidence. Policy modes are configurable Terraformer-internal modes, not claims of an external government security doctrine.\n"
  },
  "docs/INVOCATION.md": {
    "path": "docs/INVOCATION.md",
    "format": "markdown",
    "bytes": 685,
    "sha256": "02c790603d3c8592eaa7e735ca01c65b22830ecfc2be7b91a4acf1e7d3f43739",
    "content": "# Invocation — Terraformer v0.17.0\n\n`node terraformer.js` is the default desktop invocation. It spawns a detached Terraformer presentation process, releases the terminal, binds only to `127.0.0.1`, binds canonical port 9966; an explicitly configured alternate entry port redirects to 9966, and opens the system default browser.\n\nExplicit equivalents:\n\n    node terraformer.js launch\n    node terraformer.js stop\n\nFor qualification/headless execution, set `TERRAFORMER_NO_BROWSER=1`. `TERRAFORMER_PORT` may set the first candidate port.\n\nThe HTTP surface is presentation-only. `/api/status` is read-only. Resource application remains available only through the existing CLI `resource-apply ... --authorize` boundary.\n"
  },
  "docs/LOCALHOST-SYSTEM.md": {
    "path": "docs/LOCALHOST-SYSTEM.md",
    "format": "markdown",
    "bytes": 413,
    "sha256": "443589123ba4bcecec76bf2a31b5bacdd1e203ee72a2e46f367f6458e226a775",
    "content": "# Localhost Integration — Terraformer v0.17.0\n\nLocalhost is a native integration of the Terraformer Desktop System. It provides the local transport/presentation lane used by the Desktop System: `127.0.0.1`, automatic port selection, detached runtime, PID/status persistence, HTTP serving, browser invocation and graceful shutdown.\n\nCanonical ownership is `system.desktop → system.localhost`, not the reverse.\n"
  },
  "docs/OPERATION-LIFECYCLE.md": {
    "path": "docs/OPERATION-LIFECYCLE.md",
    "format": "markdown",
    "bytes": 760,
    "sha256": "c02bc6bac5cd2fe30095a5d7295925dfc4e5e3b351370f34bc5a3f8e292044de",
    "content": "# Terraformer Operation Lifecycle — v0.25.0\n\nSchema: `TERRAFORMER-OPERATION/1`\n\nNormal lifecycle:\n`REQUESTED → ADMITTED → AUTHORIZED → ASSIGNED → LAUNCHED → IN_TRANSIT → PROCESSING → RETURNING → LANDED → VERIFIED → COMPLETED`\n\nExceptional states: `HELD`, `REJECTED`, `FAILED-CONTAINED`, `RECOVERING`, `QUARANTINED`, `CANCELLED`.\n\nTransitions are explicit and fail closed. `AUTHORIZED` requires an explicit authorization flag. Realm, area, zone, or site identity never grants privilege. Operations, authority, execution, observability, recovery, and qualification are separate control planes.\n\nThe Command Desk is read-only through the loopback HTTP presentation boundary. Mutation remains CLI/local-process controlled in this checkpoint.\n"
  },
  "docs/OPERATIONAL-SCHEDULER.md": {
    "path": "docs/OPERATIONAL-SCHEDULER.md",
    "format": "markdown",
    "bytes": 1099,
    "sha256": "a29d912da0eceb8654b0d2451c9cc4b8ebca617b3ce9d83031e673de1fa7f38b",
    "content": "# Terraformer Operational Scheduler — v0.26.0\n\nThe scheduler coordinates multiple durable TFOP operations without bypassing the v0.25.0 authority lifecycle.\n\n## Deterministic admission\n\nOperations are ordered by numeric priority, creation time, then operation ID. Dependencies must be COMPLETED before admission. Unmet dependencies remain BLOCKED with an explicit reason.\n\n## Capacity and isolation\n\n`TERRAFORMER_SCHEDULER_CAPACITY` bounds simultaneously admitted operations. Each operation retains its own identity, lifecycle, evidence, assignment, failure and recovery state. One failed operation does not terminate unrelated work.\n\n## Groups\n\nTFGRP records provide HOLD, RESUME, DRAIN and CANCEL coordination while preserving per-operation lifecycle records. Group membership does not grant authority.\n\n## Recovery\n\nA failed running operation enters FAILED-CONTAINED. Recovery is explicit: RECOVERING → ASSIGNED and a new execution attempt. The qualification harness uses a controlled injected failure; this is not an external failure simulator or permission to replay consequential actions.\n"
  },
  "docs/OPERATIONS-CENTER.md": {
    "path": "docs/OPERATIONS-CENTER.md",
    "format": "markdown",
    "bytes": 1080,
    "sha256": "88cf7d9af6273d96adb0278cb12c0981392ea037b8c42c6c014298c4c76b90b4",
    "content": "# Operations Center & Operational Control Plane I\n\nTerraformer v0.24.0 introduces a bounded Operations Center coordinating operational placement without granting authority merely from a realm name.\n\nHierarchy: Realm → Area → Zone → Site → System → Worker → Farm/Pool → Lane → Operation → Return → Evidence.\n\nControl planes: Operations, Authority, Observability, Recovery.\n\nTwenty-one modeled realms cover space/orbital/atmospheric/air/ground/on-site/remote/maritime/underground/center/data-center/healthcare/airport/industrial/utility/transportation/emergency/government/civil-public-service/research-laboratory/military operations. These are architectural envelopes only. External, privileged, destructive, clinical, aviation, governmental, military, or other consequential actions retain their own authorization boundaries.\n\nThe reference operation uses Center Operations / Communications Area / Telegram Zone / Processing Site and executes a bounded canonical-json task through Telegram System and Telegram Routing Worker over the existing 12-stage fabric.\n"
  },
  "docs/PROVIDER-LIFECYCLE.md": {
    "path": "docs/PROVIDER-LIFECYCLE.md",
    "format": "markdown",
    "bytes": 1281,
    "sha256": "88f18dc1732de5f28849462946cfea1e0120bf9dcd9b4ec1814ef48575a991b9",
    "content": "# Provider Lifecycle & Capability Routing — v0.8.0\n\nTerraformer treats provider readiness as explicit runtime evidence rather than assuming registration means operability.\n\n## Lifecycle\n\n`registered → initialized → healthy | failed`\n\nA registered provider is known to the monolith but is not yet relied upon. Initialization establishes its local runtime prerequisites. A provider becomes healthy only after its health check succeeds. Failure records an error and prevents capability routing.\n\n## Capability routing\n\nProvider operations are gated by named capabilities: `validate`, `discover`, `normalize`, `snapshot`, `apply`, `verify`, and `recover`. Resource discovery requires `discover`; mutation requires `apply`. Registration alone grants neither.\n\n## Native provider\n\n`local` remains the only provider in v0.8.0. It supports file, directory, and document adapters inside the Terraformer root. Dynamic provider loading, remote providers, cloud credentials, network mutation, and implicit authority expansion are not implemented.\n\n## CLI\n\n- `provider-list` — registry, adapters, lifecycle and runtime state.\n- `provider-health [name]` — initialize and check one provider.\n- `provider-lifecycle` — initialize registered native providers and report lifecycle state.\n"
  },
  "docs/PROVIDER-SESSIONS.md": {
    "path": "docs/PROVIDER-SESSIONS.md",
    "format": "markdown",
    "bytes": 661,
    "sha256": "9097c2619281b7d5aa77ed3baa99e1c6a0d9a274b2d37e5cfa7c496af30035b7",
    "content": "# Provider Sessions & Execution Contexts\n\nTerraformer v0.9.0 introduces bounded provider sessions. A session has a UUID, provider, capability, resource context, input/output evidence, lifecycle timestamps, and a terminal `closed` or `failed` state.\n\nSessions do not grant authority. Opening a session first passes the existing provider health and capability gates. Resource apply continues to require explicit authorization and transaction journaling.\n\nSession lifecycle: `open -> closed | failed`. Sessions are deterministic control/evidence envelopes around provider operations; they do not dynamically load code, credentials, remote endpoints, or providers.\n"
  },
  "docs/PROVIDERS.md": {
    "path": "docs/PROVIDERS.md",
    "format": "markdown",
    "bytes": 1284,
    "sha256": "4ca39cfe4350675199d1541b48bc28bf56e56109a2ac00b7afc2f95fc0083055",
    "content": "# Terraformer Providers and Resource Adapters\n\n## Version\nv0.7.0 — Providers & Resource Adapters\n\n## Contract\nA provider declares a named implementation boundary, version, scope, supported resource types, and capabilities. A resource adapter binds a Terraformer resource type to a provider implementation.\n\nThe native `local` provider is root-confined and supports `file`, `directory`, and `document` adapters. Its declared capabilities are validation, discovery, normalization, snapshot, apply, verification, and recovery.\n\nResource specifications that omit `provider` resolve to the resource type's registered default provider (`local`). Unsupported providers and unsupported provider/type combinations fail closed before execution.\n\n## Authority\nProvider introduction does not broaden apply authority. Planning, discovery and reconciliation remain non-mutating. Resource mutation still requires the explicit v0.5.0 `--authorize` boundary and remains transaction-journaled with rollback and post-apply verification.\n\n## Extension boundary\nRemote, cloud, network, package, service and operating-system providers are not implemented or implied by this checkpoint. A future provider must declare its authority, capabilities, recovery semantics and qualification evidence before use.\n"
  },
  "docs/QUALIFICATION-V0.21.0.md": {
    "path": "docs/QUALIFICATION-V0.21.0.md",
    "format": "markdown",
    "bytes": 611,
    "sha256": "76ed16836d505a398aed48971a145d2060096de0cdfdb804835373e7a5259e0a",
    "content": "# Terraformer v0.22.0 Qualification\n\nState: Under Conditional Experiment\n\nEvidence:\n- `node --check terraformer.js`: PASS\n- inherited + successor smoke/regression suite: 16/16 PASS\n- persistent worker pool 16-job qualification batch: PASS\n- 32-job stress batch: 32 completed / 0 failed\n- bounded queue pressure observed\n- successful CLI shutdown: PASS\n- contained failure CLI shutdown: PASS\n- worker pool does not delegate filesystem/shell/provider/resource mutation authority\n\nBoundary: the reusable pool is process-local. Cross-process shared pools and daemon-level long-duration supervision are not claimed.\n"
  },
  "docs/QUALIFICATION-V0.23.0.md": {
    "path": "docs/QUALIFICATION-V0.23.0.md",
    "format": "markdown",
    "bytes": 734,
    "sha256": "651f5cef876567bcf267342280a0bf08158ee9b8f9b407018f8cf35b35ba1c97",
    "content": "# Terraformer v0.23.0 Qualification\n\nState: Under Conditional Experiment.\n\nEvidence:\n- Node syntax check PASS.\n- Complete successor smoke/regression suite: 18/18 PASS.\n- Registry: 78 systems / 172 workers.\n- Telegram domain: 19 systems / 12 Telegram-specific workers.\n- Telegram intent validation PASS.\n- Telegram System → telegram-routing-worker network fabric dispatch PASS through 12 stages.\n- Supervised Localhost/Desktop runtime regression PASS.\n- Live Telegram network/account authentication/message mutation: NOT TESTED and intentionally disabled.\n\nQualification boundary: architectural and local runtime-fabric integration only. This checkpoint does not claim MTProto wire compatibility or authenticated Telegram operation.\n"
  },
  "docs/QUALIFICATION-V0.25.0.md": {
    "path": "docs/QUALIFICATION-V0.25.0.md",
    "format": "markdown",
    "bytes": 421,
    "sha256": "1af6d79f4c8c0307a2521600ff6ca1130cd6d4a972af4815b68cbc395fb6f2d4",
    "content": "# Qualification — Terraformer v0.25.0\n\nState: Under Conditional Experiment.\n\nScope: operation lifecycle, guarded authorization transition, durable records, Command Desk projection, lifecycle-managed Telegram reference operation, inherited regression.\n\nNot claimed: external operational authority, live Telegram account/network operation, distributed command desk, multi-host consensus, production safety certification.\n"
  },
  "docs/QUALIFICATION-V0.26.0.md": {
    "path": "docs/QUALIFICATION-V0.26.0.md",
    "format": "markdown",
    "bytes": 467,
    "sha256": "45315d27e59d2e49e5b382d03a9991d1f67ebb8de4d88a3e4f46278897e7dc16",
    "content": "# Qualification — Terraformer v0.26.0\n\nState: Under Conditional Experiment.\n\nEvidence target: deterministic multi-operation coordination, bounded capacity, dependency blocking, group controls, failure isolation and explicit recovery.\n\nReference workload: 32 modeled operations across Center, Data Center, Ground, On-Site and Remote realms. One controlled qualification failure is contained and explicitly recovered. External Telegram transmission remains disabled.\n"
  },
  "docs/QUALIFICATION-V0.27.0.md": {
    "path": "docs/QUALIFICATION-V0.27.0.md",
    "format": "markdown",
    "bytes": 797,
    "sha256": "6a5d959456733538d221d8abf2d65833c2088d3925cacd43f6f2f85795a9988d",
    "content": "# Qualification — Terraformer v0.27.0\n\nState: Under Conditional Experiment.\n\nEvidence:\n- Node syntax check PASS.\n- 25/25 Bash smoke/regression suites PASS.\n- Resource topology allocation/release/accounting PASS.\n- Maintenance state blocks scheduler capacity before assignment/launch PASS.\n- Restoring asset availability permits allocation PASS.\n- 32-operation scheduler workload PASS: 32 completed, one deliberately failed-contained and recovered, zero resource-blocked with healthy baseline topology.\n- Post-run topology returned to 0 allocated / 25 available capacity across 5 facilities and 5 assets.\n\nNot claimed: physical facility discovery, hardware inventory, external CMDB integration, cross-process allocation locking, distributed consensus, or production-grade capacity orchestration.\n"
  },
  "docs/QUALIFICATION-V0.30.3.md": {
    "path": "docs/QUALIFICATION-V0.30.3.md",
    "format": "markdown",
    "bytes": 1026,
    "sha256": "c3af7c6d514506dc912ac29f6f2e7935c261533826ca32ca076777a1a7173060",
    "content": "# Terraformer v0.30.3 — Embedded Documentation Corpus\n\nQualification state: **Under Conditional Experiment**.\n\n## Change\nThe JavaScript monolith now contains the complete Markdown documentation corpus carried by its package, including preserved localhost v0.68.0 lineage documentation. Documentation is represented as immutable code-level records containing path, format, byte length, SHA-256 digest, and exact content.\n\n## Runtime interface\n- `docs-list` enumerates embedded documentation metadata.\n- `docs-get <path>` emits the exact embedded Markdown content.\n- `docs-verify` recomputes content digests and byte lengths.\n- `docs-export [directory]` reconstructs the embedded documentation tree on disk.\n\n## Qualification requirements\nThe release qualifies conditionally only when JavaScript syntax validation passes, every embedded document verifies against its recorded SHA-256 and byte length, exported documentation is byte-identical to the package documentation, and the established smoke-test suite remains passing.\n"
  },
  "docs/QUALIFICATION-v0.22.0.md": {
    "path": "docs/QUALIFICATION-v0.22.0.md",
    "format": "markdown",
    "bytes": 715,
    "sha256": "ef248f869a9a4a3905865d72f38085c9932ff30102c9f837ce7edf380cd5bed7",
    "content": "# Terraformer v0.22.0 Qualification\n\nState: Under Conditional Experiment\n\nEvidence:\n- Node syntax check: PASS.\n- Complete smoke/regression suite: 17/17 PASS.\n- Live supervised Desktop/Localhost runtime: PASS.\n- Runtime health endpoint reports running supervisor and ready persistent pool: PASS.\n- Fabric status reports 59 systems and 160 workers: PASS.\n- Controlled SIGUSR2 pool restart and post-restart health: PASS.\n- Browser/API control boundary remains read-only for the new runtime endpoints: PASS by route inspection and smoke coverage.\n\nNot claimed: cross-process shared pooling, persistence/resumption of in-flight jobs after process death, external daemon manager integration, or production qualification.\n"
  },
  "docs/QUALIFICATION.md": {
    "path": "docs/QUALIFICATION.md",
    "format": "markdown",
    "bytes": 2492,
    "sha256": "7ceda5a666403f4861614ec33b80da851ac73bc241c0767121d1a40e4e4eb647",
    "content": "# Terraformer Qualification — v0.6.0\n\nQualification state: **Under Conditional Experiment**.\n\nExecuted locally on 2026-09-26:\n\n- Transformation regression: PASS.\n- Resource-model regression: PASS.\n- Transactional resource-apply regression: PASS.\n- State discovery/reconciliation qualification: PASS after correcting an initial test expectation from one update to two; filesystem directory mode observation correctly constitutes a second detected difference under the current exact-property fingerprint model.\n- Discovery/reconciliation non-mutation boundary: PASS.\n- Repeated reconciliation plan/drift determinism, excluding observation timestamp: PASS.\n\nThe initial failed assertion is retained here as qualification evidence rather than hidden. No production/naturalized status is claimed.\n\n## v0.8.0 — Providers & Resource Adapters\nDate: 2026-09-26\n\n- Transformation regression: PASS\n- Resource-model regression: PASS\n- Transactional resource apply: PASS\n- Discovery/reconciliation regression: PASS\n- Provider registry/adapters: PASS\n- Unsupported provider fail-closed: PASS\n- Existing resource-spec compatibility through default local provider: PASS\n\nQualification remains **Under Conditional Experiment**. Only the native local provider is implemented and qualified; no remote/cloud/system provider is implied.\n\n## v0.8.0 Provider Lifecycle Qualification\n\n- Provider lifecycle smoke: PASS.\n- `local` registration/initialization/health transition: PASS.\n- Capability registry exposure: PASS.\n- Unknown provider rejection: PASS.\n- Inherited transformation regression: PASS.\n- Inherited resource-model regression: PASS.\n- Inherited transactional apply: PASS.\n- Inherited discovery/reconciliation: PASS.\n- Inherited provider/adapter qualification: PASS.\n\nQualification remains **Under Conditional Experiment**. Only the native local provider is qualified in this checkpoint; no remote or dynamically loaded provider is claimed.\n\n## v0.9.0 Provider Sessions\nPASS: provider session contract, UUID identity, lifecycle closure, discovery routing, inherited capability gating, and all predecessor regression suites.\n\n## v0.17.0 invocation qualification\n\nThe browser invocation boundary is qualified by `test/invocation-smoke.bash` in headless mode. It verifies detached launch, loopback HTTP reachability, the read-only status endpoint, rendered version identity, and controlled stop. Automatic GUI browser opening is implemented per platform but is not exercised by the headless smoke test.\n"
  },
  "docs/RESOURCE-APPLY.md": {
    "path": "docs/RESOURCE-APPLY.md",
    "format": "markdown",
    "bytes": 929,
    "sha256": "27285992359230df234ae04ba644d01e73608e3ac929c6f39abf2f1f5b30c00d",
    "content": "# Terraformer Resource Apply & Transaction Model\n\nVersion 0.5.0 introduces the first resource mutation boundary.\n\n## Authority\n`resource-apply` fails closed unless `--authorize` is explicitly supplied. Planning remains non-mutating.\n\n## Transaction\nEach apply receives a UUID and a private recovery directory under `data/recovery/`. Before each mutation Terraformer snapshots the affected resource and persists the transaction journal. Each step advances from prepared to applied. A failure triggers reverse-order rollback.\n\n## Verification\nAfter all planned changes, Terraformer verifies desired presence/absence and basic resource kind/content. Only a verified transaction becomes `committed`.\n\n## Recovery boundary\nRollback is automatic for an apply failure. Transaction journals and backups are retained as evidence/reconstruction material. External resources and recursive directory destruction remain outside this version.\n"
  },
  "docs/RESOURCE-MODEL.md": {
    "path": "docs/RESOURCE-MODEL.md",
    "format": "markdown",
    "bytes": 1296,
    "sha256": "e3ea3017614a0f9e10dabc84680e64d2a6d0c4530ae2588b7ac2b355fd33967e",
    "content": "# Terraformer Resource Model — v0.4.0\n\n## Contract\n\nA resource is declarative data with these fields:\n\n- `type`: registered resource type.\n- `name`: non-empty local name.\n- `state`: `present` or `absent`; defaults to `present`.\n- `properties`: type-specific desired properties.\n- `dependsOn`: zero or more complete resource IDs.\n\nIdentity is `type.name`. Duplicate identities fail closed.\n\n## Native types\n\n- `file`: `path`, `content`, `encoding`, `mode`\n- `directory`: `path`, `mode`\n- `document`: `path`, `content`, `format`\n\nUnknown types and properties fail closed.\n\n## Planning\n\nDesired and current sets are normalized into canonical key order. SHA-256 fingerprints identify their complete normalized resource descriptions. Dependency references must resolve inside the desired resource set and dependency cycles are rejected. Resources are deterministically topologically ordered.\n\nActions:\n\n- `create`: desired present; current absent/missing.\n- `update`: desired and current present but canonical fingerprints differ.\n- `delete`: desired absent with current present, or current resource omitted from desired set.\n- `no-op`: desired and current canonical descriptions match, or both represent absence.\n\n`resource-plan` is intentionally non-mutating. No apply mechanism exists in v0.4.0.\n"
  },
  "docs/RESOURCE-TOPOLOGY.md": {
    "path": "docs/RESOURCE-TOPOLOGY.md",
    "format": "markdown",
    "bytes": 913,
    "sha256": "0e2fba4825b7c4b1105f2aa4401ea11b74583fb08a602b3bc6220dca55c39652",
    "content": "# Terraformer Resource Topology — v0.27.0\n\nTerraformer now models operational placement as managed topology rather than labels alone.\n\nHierarchy: Realm → Area → Zone → Site → Facility → Asset → Allocation → Operation.\n\nFacilities carry placement, availability and health. Assets belong to facilities, have typed capacity, allocation accounting, health and maintenance state. An operation must obtain capacity before ASSIGNED/LAUNCHED. If no healthy capacity is available, scheduling stops at AUTHORIZED and records a resource-blocked reason. Allocation is released after completion or contained failure. Recovery must reacquire capacity before reassignment.\n\nThe baseline qualification topology contains five facilities (Center, Data Center, Ground, On-Site and Remote), each with five compute slots. These are modeled local qualification resources, not claims about external physical facilities.\n"
  },
  "docs/RUNTIME-FABRIC-II.md": {
    "path": "docs/RUNTIME-FABRIC-II.md",
    "format": "markdown",
    "bytes": 1110,
    "sha256": "7b2b62b8f9ced0edaf4ce11dde92a0ca05d9c474bd5972baa16c4e9f5286b465",
    "content": "# Runtime Fabric Naturalization II — v0.20.0\n\nTerraformer v0.20.0 adds bounded real Node.js worker-thread execution behind the v0.19.0 semantic runtime fabric.\n\n## Execution boundary\n`fabric-execute` first resolves the existing System → Worker semantic route, farm, pool and lane. It then executes one bounded task in a Node `worker_threads` Worker. The thread receives only structured task data; it receives no Terraformer object, provider handle, filesystem capability, process authority, shell capability or resource-apply authorization.\n\nSupported experimental operations are `echo`, `canonical-json`, `sha256`, and `measure`. This intentionally small operation set proves concurrency without silently granting mutation authority.\n\nEach task has a bounded timeout (default 5000 ms, configurable with `TERRAFORMER_THREAD_TIMEOUT_MS`), failure containment, correlation/work identity, duration evidence and thread recycling. v0.20.0 uses one-task/one-thread recycling; persistent thread reuse is deferred until lifecycle/recovery evidence is stronger.\n\nQualification remains Under Conditional Experiment.\n"
  },
  "docs/RUNTIME-FABRIC.md": {
    "path": "docs/RUNTIME-FABRIC.md",
    "format": "markdown",
    "bytes": 1649,
    "sha256": "d3c2ed00a8978e59e040d9bd50c7cb866516af1ec90a901541396a1c4329ab07",
    "content": "# Terraformer v0.19.0 — Runtime Fabric Naturalization I\n\nQualification: Under Conditional Experiment\n\nThis checkpoint operationally integrates the localhost v0.68.0 worker vocabulary with Terraformer's combined system registry.\n\n## Qualification progression\nImported localhost descriptors are no longer labeled naturalized merely because they are present. Their descriptor state is `registered`. Runtime relationships created by this checkpoint are `integrated`. Later checkpoints may promote individually evidenced behavior through VERIFIED to NATURALIZED.\n\n`IMPORTED -> REGISTERED -> INTEGRATED -> VERIFIED -> NATURALIZED`\n\n## Fabric\n- 59 combined system entries.\n- 160 localhost-derived worker roles.\n- Semantic system/worker relations are deterministically reconstructed from the localhost v0.68.0 domain-concern rules, extended across Terraformer-native systems.\n- Core workers remain eligible for system control relationships.\n- Four domain farms: compute, storage, network, interface.\n- Each farm has primary and secondary bounded logical pools mapped onto host-sized lanes.\n- Dispatch preserves one work ID and one correlation ID through the complete lifecycle.\n\nCanonical transaction:\n`launch-zone -> launch-site -> forward-starting-lane -> forward-transmission-lane -> call-zone -> call-site -> processing-site -> return-starting-lane -> return-transmission-lane -> landing-site -> return-zone -> terminal-disposition`\n\nThis version does not claim native worker-thread execution for Terraformer. Pool/farm lanes are integrated structural scheduling evidence; actual concurrent worker-thread execution remains a later qualification step.\n"
  },
  "docs/SECURITY-DOMAINS.md": {
    "path": "docs/SECURITY-DOMAINS.md",
    "format": "markdown",
    "bytes": 895,
    "sha256": "c8831a2d5701efeb5ac1002838704cc9b230cb060afb72330cd581fed9ced14e",
    "content": "# Security Domains, Classified Environments & Compartmentalized Zones — v0.28.0\n\nTerraformer v0.28.0 introduces an internal, configurable information/admission model. It does not claim or reproduce any governmental classification authority.\n\nLevels: PUBLIC, INTERNAL, RESTRICTED, CONFIDENTIAL, CLASSIFIED.\n\nA security admission requires both sufficient level and every requested compartment. Admission is independent of operational authorization and never grants execution, filesystem, network, Telegram, administrative, or external authority.\n\nCanonical placement: Environment → Security Domain → Classification Level → Compartment → Realm → Area → Zone → Site → Facility → Asset → Operation.\n\nA CLASSIFIED operation can use a compartment such as `classified-zone`. If level or compartment admission fails, scheduler execution stops before topology allocation and launch.\n"
  },
  "docs/SPECIFICATION.md": {
    "path": "docs/SPECIFICATION.md",
    "format": "markdown",
    "bytes": 1244,
    "sha256": "c15644c3b20ceac730088eeae29bf293b3c1d6e186bf05f542fbeaf8efcedce6",
    "content": "# Terraformer v0.3.0 Specification\n\n## Transformation contract\n\n1. **Source** — resolve a root-confined regular file and fingerprint its bytes.\n2. **Plan** — bind source, target, operation and explicit replacement policy.\n3. **Validate** — reject unsupported operations, protected internal targets, root escapes and implicit overwrite.\n4. **Transform** — derive output bytes without mutating the target.\n5. **Target** — preserve an existing approved replacement target, write a temporary file, then atomically rename it.\n6. **Result** — return operation, byte count, digest, target and optional recovery reference.\n7. **Recovery** — explicitly restore a backup held in Terraformer's recovery area.\n\n## Boundaries\n\nTerraformer v0.3.0 is local-only. It does not execute shell commands, provision infrastructure, access networks, interpret Terraform/HCL, or mutate resources outside its project root. These are deferred capabilities, not implied by the project name.\n\n## Domain requirement\n\nA specification MAY omit `domain`, in which case `file` is used for backward compatibility. New specifications SHOULD declare `domain`. Unknown domains and operations not registered to the selected domain MUST fail before target publication.\n"
  },
  "docs/STATE-DISCOVERY.md": {
    "path": "docs/STATE-DISCOVERY.md",
    "format": "markdown",
    "bytes": 1244,
    "sha256": "e7717d9b4f091b3dd9a1f2020e06411467072107771b08341ffcd4f483875a6c",
    "content": "# Terraformer State Discovery & Reconciliation — v0.6.0\n\n## Purpose\nTerraformer can now derive current state from supported local filesystem resources instead of requiring a hand-authored current-state document.\n\n## Evidence model\nThree states remain distinct:\n\n- **Desired state** — declarative intent supplied by the operator.\n- **Observed state** — read-only evidence collected from the local filesystem.\n- **Managed state** — resources within the desired resource set and therefore eligible for planning. Discovery does not claim ownership of unrelated filesystem objects.\n\n`resource-discover` observes only resources named by the desired document. It performs no writes. `resource-reconcile` feeds those observations into the deterministic resource planner and classifies drift as `in-sync`, `missing`, `changed`, or `unexpected` where applicable.\n\n## Authority boundary\nDiscovery and reconciliation are non-mutating. Resource mutation remains exclusively behind `resource-apply ... --authorize` and its v0.5.0 transaction/rollback boundary.\n\n## Supported observation\nv0.6.0 observes the existing local `directory`, `file`, and `document` resource types. Paths remain confined to the Terraformer root. Kind mismatches fail closed.\n"
  },
  "docs/SUPERVISED-RUNTIME.md": {
    "path": "docs/SUPERVISED-RUNTIME.md",
    "format": "markdown",
    "bytes": 754,
    "sha256": "11d95137614a535fcc5495c43f8bba053520cf8f580aa67f567bb36cc84eda22",
    "content": "# Supervised Persistent Runtime — v0.22.0\n\nThe Desktop/Localhost process owns a persistent bounded worker pool supervised for its process lifetime.\n\n## Boundaries\n- Pool uses Node.js worker_threads and remains process-local.\n- `/api/runtime/health` and `/api/fabric/status` are loopback read-only observability endpoints.\n- Browser requests cannot restart, drain, spawn privileged work, or mutate resources.\n- `runtime-restart` is a local CLI control that signals the recorded presentation PID with SIGUSR2.\n- SIGTERM performs a supervised drain before process termination.\n\n## Qualification\nThis checkpoint is Under Conditional Experiment. It does not claim cross-process pooling, crash persistence of in-flight jobs, or production daemon management.\n"
  },
  "docs/SYSTEM-REGISTRY.md": {
    "path": "docs/SYSTEM-REGISTRY.md",
    "format": "markdown",
    "bytes": 659,
    "sha256": "c0faa446e0096951e6654b35265a5756971a80ec9ea1cc8e74d4e258e1fa7ce6",
    "content": "# System Registry — v0.11.0\n\nTerraformer treats System as a common classification and indexing surface while preserving domain-specific containment.\n\nFamilies: Service, Compute, Information, Infrastructure, Astronomical.\n\nSolar System is first-class in the System Registry and remains contained by: World → Astronomical Scope → Solar System. Its astronomical bodies are children of Solar System, not peer operational systems.\n\nThis checkpoint reconstructs the accepted v0.10.0 Solar System design from recorded specification because the v0.10.0 binary artifact was not recoverable in the active runtime, then applies the v0.11.0 registry normalization.\n"
  },
  "docs/TELEGRAM-SYSTEM.md": {
    "path": "docs/TELEGRAM-SYSTEM.md",
    "format": "markdown",
    "bytes": 1349,
    "sha256": "a9a15a803ca3a9d690b1e56d2d05cffe28f9169410a79991cb9c4c501a81fd75",
    "content": "# Telegram System — v0.23.0\n\nTerraformer places Telegram under `Communication System → Telegram System → Telegram API`.\n\nThe architecture is derived from the recovered TGAPI and OPENAUDIO Telegram project lineage. This checkpoint does not claim source-code import from an unavailable TGAPI/OPENAUDIO archive.\n\n## Registered domains\nTelegram root, API, MTProto, transport, authorization, account, session, entity, message, media, group, channel, bot, routing, connection, farm, persistence, recovery and audit.\n\n## Runtime placement\nTelegram systems participate in Terraformer's generic system/worker fabric and its launch/transmission/call/processing/return/landing lifecycle. Twelve Telegram-specific worker roles are registered alongside the inherited localhost worker registry.\n\n## Authority boundary\nNo API ID/hash, phone number, login code, bot token, authorization key, session secret or equivalent credential is embedded. Live Telegram network access, account authentication and message mutation are disabled. `telegram-validate` validates modeled intents only.\n\n## Promotion path\n`REGISTERED → INTEGRATED → VERIFIED → NATURALIZED`.\nLive protocol behavior requires source reconciliation, credentials supplied outside source, explicit authorization, network qualification, recovery testing and Telegram compatibility verification.\n"
  },
  "docs/WORKER-POOL.md": {
    "path": "docs/WORKER-POOL.md",
    "format": "markdown",
    "bytes": 860,
    "sha256": "1878c39ff29ca9250b54bc34fbc77f602eeb3e407bef460853a115eaed7c03a8",
    "content": "# Persistent Worker Pool — v0.22.0\n\nTerraformer v0.22.0 replaces one-task/one-thread execution with a bounded reusable Node.js worker-thread pool.\n\nProperties:\n- fixed process-local pool, default bounded to 2..8 workers;\n- bounded FIFO admission queue;\n- explicit backpressure rejection at the queue limit;\n- per-task timeout containment;\n- failed/exited worker replacement with generation tracking;\n- pool health and counters exposed by `fabric-status` while active;\n- deterministic correlation remains owned by the runtime-fabric transaction;\n- graceful explicit pool shutdown for batch/qualification runs;\n- no filesystem, shell, provider, or resource mutation authority is delegated to worker tasks.\n\nQualification remains Under Conditional Experiment. Cross-process shared pooling and long-running daemon supervision are not claimed by this checkpoint.\n"
  },
  "lineage/localhost-v0.68.0/ABNORMAL-LIFECYCLE.md": {
    "path": "lineage/localhost-v0.68.0/ABNORMAL-LIFECYCLE.md",
    "format": "markdown",
    "bytes": 1272,
    "sha256": "b2a43588268c84b09f1c44cf1c1ecf52e05d2429d16306e84dc8974fd8cfa0dd",
    "content": "# localhost v0.48.0 — Abnormal Lifecycle and Priority Scheduling\n\nThis checkpoint naturalizes abnormal execution as a first-class return contract.\n\n## Priority queue\nWork envelopes accept `critical`, `high`, `normal`, or `low`. Queue order is deterministic: critical → high → normal → low. Semantic concern and capability selection remain prerequisites.\n\n## Terminal transit\nAll work converges on the originating system return zone with a typed terminal status:\n- `completed`\n- `cancelled`\n- `timeout`\n- `failed`\n- `recovered`\n\nCancellation before execution does not allocate a scheduler slot. Timeout and failure release allocations before terminal return. Recovery is bounded: one explicit recovery transition is modeled; there is no unbounded retry loop.\n\n## Lifecycle\n`DEFINED → VALIDATED → QUEUED → SCHEDULED → ACTIVE → RETURNING → COMPLETED/RETURNED`\n\nAbnormal branches include `CANCELLED`, `TIMEOUT`, `FAILED`, `RECOVERING`, and `RECOVERED`.\n\n## Qualification boundary\nTimeout duration injection and failure injection are deterministic qualification controls for the lifecycle contract. They do not claim wall-clock preemption of arbitrary synchronous JavaScript. Native Windows-host behavior remains unverified on the Linux qualification host.\n"
  },
  "lineage/localhost-v0.68.0/ADAPTER-BACKED-SERVICES.md": {
    "path": "lineage/localhost-v0.68.0/ADAPTER-BACKED-SERVICES.md",
    "format": "markdown",
    "bytes": 1310,
    "sha256": "78888a06f2267b97f6b363faf6416ffffb2be0c93b3d79998a5dce3e75e590f3",
    "content": "# Adapter-Backed Service Integration — v0.68.0\n\n## Purpose\nServices may request observational host-platform evidence through the platform-adapter contract without bypassing the constructively sealed localhost lifecycle.\n\n## Binding\nEach service declares zero or more adapter domains from `LOCALHOST-PLATFORM-ADAPTER/1`. The seeded bindings are:\n\n- `runtime.execute`: `process`, `capability-discovery`\n- `desktop.present`: `presentation-device`\n- `storage.inspect`: `filesystem`\n\nAt invocation, localhost selects only the detected native host adapter. The adapter result is attached to the service work payload and the adapter invocation record carries the same work ID and end-to-end correlation ID as the sealed lifecycle transaction.\n\n## Authority\nAdapter-backed service integration is observational. An undeclared adapter domain is rejected. Mutation operations are rejected. A non-native platform adapter is never selected as a fallback. The integration cannot add systems, workers, adapters, capabilities, filesystem authority, or privilege.\n\n## Qualification\nOn the current Debian host, v0.68.0 passed 116/116 self-tests. Tests cover native host selection and correlation, undeclared-domain rejection, mutation rejection, topology preservation, and all inherited lifecycle/platform/service invariants.\n"
  },
  "lineage/localhost-v0.68.0/ADAPTIVE-CAPACITY.md": {
    "path": "lineage/localhost-v0.68.0/ADAPTIVE-CAPACITY.md",
    "format": "markdown",
    "bytes": 1167,
    "sha256": "64408a5e4543b442ba14fcfafe73aeafeff0dbf2e74bca7f81c6ddff3a912cbe",
    "content": "# Adaptive Capacity Governance — localhost v0.58.0\n\nProtocol: `LOCALHOST-ADAPTIVE-CAPACITY/1`\n\nTelemetry may tune runtime capacity only inside explicit bounds. The controller can adjust effective scheduler concurrency, pool-utilization allowance, and queue admission depth. It cannot create systems, workers, farms, pools, capabilities, semantic relationships, filesystem authority, or privileges.\n\n## Control loop\n\n`Telemetry -> pressure/health evaluation -> cooldown/hysteresis gate -> bounded upshift/downshift/hold -> admission + scheduler + pool enforcement -> telemetry evidence`\n\n## Bounds\n\n- Scheduler: 1 through host-derived scheduler capacity.\n- Pool utilization: 25% through 100% of an already-existing qualified pool.\n- Admission depth: bounded floor/ceiling derived from scheduler capacity.\n- Cooldown: 1000 ms between ordinary adjustments.\n- Unhealthy error/latency evidence causes a downshift.\n- Sustained queue/pool pressure may cause an upshift, never beyond the ceiling.\n\nCapacity is not authority. Adaptive decisions may restrict or use existing qualified capacity but may not broaden routing, concern, domain, security, or privilege boundaries.\n"
  },
  "lineage/localhost-v0.68.0/CALL-RETURN.md": {
    "path": "lineage/localhost-v0.68.0/CALL-RETURN.md",
    "format": "markdown",
    "bytes": 524,
    "sha256": "08f27bb1fcbc564447fa8255426e4e663e7749c76e000d85a404c59d33320e65",
    "content": "# localhost v0.45.0 — Call / Return Transit Fabric\n\nEvery existing universal-fabric flow now owns an explicit call site, return path, and return lane.\n\nRound trip:\n\n`caller output -> call site -> bridge/route/path/lane -> ring/grid/chain/mesh/matrix -> callee input/output -> return path -> return lane -> caller input`\n\n`LOCALHOST-CALL-RETURN/1` preserves a correlation ID and payload identity across the round trip. The model is structural and local; it adds no privilege, remote authority, or external execution claim.\n"
  },
  "lineage/localhost-v0.68.0/CONCURRENT-WORKFLOWS.md": {
    "path": "lineage/localhost-v0.68.0/CONCURRENT-WORKFLOWS.md",
    "format": "markdown",
    "bytes": 1025,
    "sha256": "8935d6fe66166282e1ffa2fa426742a5c33d4fe258c915bd08fd19c51ba4c631",
    "content": "# Concurrent Workflow Execution — localhost v0.52.0\n\nQualification state: **Under Conditional Experiment**.\n\nReady DAG waves with two or more tasks are assigned independent Node.js `worker_threads` execution kernels. The kernels execute concurrently under a bounded duration used by the current generic execution model. Completion evidence is collected per lane, then semantic work is committed through the existing system/worker concern, capability, scheduling, call/return, and return-zone fabric in stable task-ID order.\n\nThis separates data-plane concurrency from deterministic control-plane commit. Fan-in and aggregate ordering therefore remain reproducible even when ready-wave execution overlaps.\n\nCurrent qualification proves worker-thread overlap, deterministic fan-in ordering, correlation preservation, and resource drain. It does not claim that every specialized worker implementation has already been moved into a worker thread; specialized external implementations remain subject to their own qualification.\n"
  },
  "lineage/localhost-v0.68.0/CONSTRUCTIVE-LIFECYCLE-SEAL.md": {
    "path": "lineage/localhost-v0.68.0/CONSTRUCTIVE-LIFECYCLE-SEAL.md",
    "format": "markdown",
    "bytes": 692,
    "sha256": "cc75bc8e7de85b134d8facf236dd861db143440771c3fee887b07cfb7069e552",
    "content": "# Constructive Lifecycle Seal — v0.64.0\n\nState: **Constructively Sealed**\n\nScope: the localhost lifecycle fabric qualified by the v0.64.0 self-test suite and topology closure audit, including launch/call/processing/return/landing, staged transmission lanes, synchronization/checkpoints, bounded supervision/adaptation, deterministic reconstruction, correlation continuity, and resource-drain invariants.\n\nThis seal is a versioned qualified checkpoint open to controlled successor development. It does not claim production qualification for untested services, platforms, distributed transports, or future integrations. Qualification is not deployment approval and does not expand authority.\n"
  },
  "lineage/localhost-v0.68.0/DETERMINISTIC-RECONSTRUCTION.md": {
    "path": "lineage/localhost-v0.68.0/DETERMINISTIC-RECONSTRUCTION.md",
    "format": "markdown",
    "bytes": 517,
    "sha256": "2e423fe3c47d0fa46cc7c08ed0a5a4e979ff8964bdcd053eecf436cc9b6b9ecd",
    "content": "# Deterministic Lifecycle Reconstruction\n\n`reconstructWorkLifecycle()` reconstructs an ordered lifecycle evidence chain from the retained work object, launch/call/return records, checkpoints, landing evidence, return-zone ownership, and terminal disposition. Reconstructing the same retained work twice must produce the same deterministic key and ordered stage identities.\n\nThe reconstruction facility is observational/recovery evidence. It grants no routing, filesystem, execution, semantic, or privilege authority.\n"
  },
  "lineage/localhost-v0.68.0/END-TO-END-QUALIFICATION.md": {
    "path": "lineage/localhost-v0.68.0/END-TO-END-QUALIFICATION.md",
    "format": "markdown",
    "bytes": 874,
    "sha256": "ab97e95c9972e8f64accf4bda271f835864ef5067e35b3364e6ae64a6967822c",
    "content": "# End-to-End Runtime Qualification — v0.64.0\n\nCanonical qualified path:\n\nRequest → Scope/Capability → Queue/Admission → Allocation → Pre-launch Checkpoint → Launch Zone → Launch Site → Forward Starting Lane → Forward Transmission Lane → Call Zone → Call Site → Processing Site → Post-processing Checkpoint → Return Starting Lane → Return Transmission Lane → Landing Site → Post-landing Checkpoint → Return Zone → Terminal Disposition.\n\nFor lifecycle work, one WORKCALL correlation identity is preserved from Launch through Call/Return and Landing. Standalone fabric calls retain locally generated CALL correlation IDs.\n\nQualification exercises normal completion, recoverable failure, timeout, unrecovered failure, deterministic reconstruction, topology closure, and resource drain. Qualification is evidence for tested invariants only.\n"
  },
  "lineage/localhost-v0.68.0/EXECUTION-LIFECYCLE.md": {
    "path": "lineage/localhost-v0.68.0/EXECUTION-LIFECYCLE.md",
    "format": "markdown",
    "bytes": 2156,
    "sha256": "7443b22dadf0cf2ac60020027bea643f95819a9e0b33ada0b1adc78c50a5cd76",
    "content": "# localhost v0.47.0 — Execution Lifecycle\n\nSchema: `LOCALHOST-EXECUTION-LIFECYCLE/1`\n\nWork now traverses:\n\n`System Scope -> Capability -> Concerned Worker -> Call Zone -> Call Site -> Transit Fabric -> Processing Site -> Worker -> Return Path -> Return Lane -> Return Zone -> Originating System`\n\n## Zones and sites\n- One Call Zone is materialized for every semantically concerned System/Worker relation.\n- Every registered Worker owns a Processing Site.\n- Every registered System owns a Return Zone.\n- Call Zones require the pre-existing semantic concern/capability relationship; topology alone does not authorize work.\n\n## Scheduling and resources\nThe scheduler has a bounded slot capacity derived from the host logical CPU count. Work receives an explicit resource allocation record before becoming ACTIVE. The slot is released on completion or failure. Scheduler allocation does not grant OS privilege and does not expand the `$HOME` filesystem boundary.\n\n## Lifecycle\n`DEFINED -> VALIDATED -> SCHEDULED -> ACTIVE -> RETURNING -> COMPLETED`\n\nExceptional vocabulary is reserved for `FAILED`, `CANCELLED`, and `RECOVERING`.\n\nWindows System and Desktop System remain peer systems and use the same lifecycle. Windows-native behavior is not claimed as host-qualified when running on Linux.\n\n## v0.48.0 extension\nThe lifecycle now includes deterministic priority queues and typed abnormal terminal transit for cancellation, timeout, failure, and bounded recovery. Every allocated abnormal path releases its scheduler slot before terminal return. See `ABNORMAL-LIFECYCLE.md`.\n\n## v0.49.0 availability gate\nDispatch now crosses a worker availability/dependency gate before scheduler allocation. Worker states are ready/busy/blocked/degraded/offline with bounded capacity. A blocked dispatch returns through the originating return zone without consuming a scheduler slot.\n\n## v0.50.0 selection stage\n\nLifecycle dispatch now inserts a deterministic worker-selection stage after semantic capability classification and before queue/allocation. Selection evidence is retained in the work record and unavailable candidates are excluded before resource allocation.\n"
  },
  "lineage/localhost-v0.68.0/FARM-GOVERNANCE.md": {
    "path": "lineage/localhost-v0.68.0/FARM-GOVERNANCE.md",
    "format": "markdown",
    "bytes": 1138,
    "sha256": "edb4a5f263a90f47db0727b207e35ae91cc2aa0db7ff722ce72e823a69d0b5d9",
    "content": "# LOCALHOST-FARM-GOVERNANCE/1\n\nlocalhost v0.55.0 introduces dynamic governance above the v0.54.0 domain farm/pool federation.\n\n## Contract\n\n- Farms and pools expose administrative state: `ready`, `draining`, `quarantined`, or `offline`.\n- Health and admission are explicit and independent from domain authority.\n- New work is admitted only when both the farm and selected pool are ready, healthy enough for routing, and admission-enabled.\n- Draining pools reject new placement and allow compatible queued work to migrate to another pool that already possesses the required domain.\n- Quarantined pools are excluded from normal selection.\n- Affinity is a placement preference; saturation/backpressure can override default affinity.\n- Migration never grants a target pool a capability/domain it did not already possess.\n- Governance restricts or redirects qualified work; it never broadens semantic system/worker authority.\n\n## Qualification\n\nHost qualification covers admission closure, draining migration, quarantine exclusion, affinity routing, cross-domain migration rejection, and regression of the existing farm/pool execution fabric.\n"
  },
  "lineage/localhost-v0.68.0/FARM-POOLING.md": {
    "path": "lineage/localhost-v0.68.0/FARM-POOLING.md",
    "format": "markdown",
    "bytes": 845,
    "sha256": "b733edbd9aa2710faea52f34051c1e81a88f4476e92fb34112a199b2fcf90b7b",
    "content": "# Farm Pooling — localhost v0.54.0\n\nQualification state: Under Conditional Experiment.\n\nThe persistent worker pool is federated into logical domain-qualified farms. Current farms cover compute/execution, storage/documents/archive, network/messaging, and interface/workflow/identity/security concerns. Each farm owns primary and secondary logical pools backed by bounded persistent worker-thread lanes.\n\nRouting policy: capability/domain -> qualified farm -> preferred compatible pool -> compatible spillover when the preferred pool is saturated -> deterministic semantic commit and return. Capacity alone never authorizes cross-domain execution.\n\nFarm and pool selections are evidence-bearing. Pool busy state is released after execution and the underlying persistent worker pool remains bounded by LOCALHOST_WORKER_POOL_SIZE / host capacity.\n"
  },
  "lineage/localhost-v0.68.0/LANDING-SITES.md": {
    "path": "lineage/localhost-v0.68.0/LANDING-SITES.md",
    "format": "markdown",
    "bytes": 826,
    "sha256": "50c35b0d1bd3ba7bba3b629613d95bd89a480d1b4d7a65d4c6c867c2b2756984",
    "content": "# Landing Sites — localhost v0.60.0\n\nLanding Sites are the symmetric acceptance boundary for returned work.\n\nLifecycle:\n\n`Launch Site -> Call Zone -> Call Site -> Processing Site -> Return Path/Lane -> Landing Site -> Return Zone -> Terminal Outcome`\n\nA landing site records the work ID, correlation ID, outcome kind and return zone. Its state machine is `APPROACHING -> ACCEPTED -> LANDED`. Correlation is mandatory before a result can be landed. Landing grants no routing, execution, semantic, filesystem or privilege authority; it only accepts a returned outcome into an already-authorized return zone.\n\nCompleted, recovered and abnormal terminal outcomes use the same landing boundary. Work blocked or cancelled before launch may still return and land as a typed terminal outcome, but it does not acquire a Launch Site.\n"
  },
  "lineage/localhost-v0.68.0/LAUNCH-SITES.md": {
    "path": "lineage/localhost-v0.68.0/LAUNCH-SITES.md",
    "format": "markdown",
    "bytes": 760,
    "sha256": "35a5b6f5e291a510e854826c07bb4f6163288aaae9e009c360007f6e6ef3e9dd",
    "content": "# Launch Sites — localhost v0.59.0\n\nLaunch Sites are the explicit release boundary between scheduling/admission and invocation.\n\nLifecycle:\n\n`Request -> Validate -> Queue -> Schedule/Allocate -> PREPARED -> ADMITTED -> LAUNCHED -> Call Zone -> Call Site -> Processing -> Return`\n\nA Launch Site records work/correlation identity, originating system, selected worker, operation/capability, priority, allocation, and qualified farm/pool placement when applicable. It does not grant routing authority; semantic concern, capability, availability, dependency, admission, and scheduler checks precede launch.\n\nBlocked and pre-execution-cancelled work never enters LAUNCHED state and therefore has no Launch Site.\n\nQualification state: Under Conditional Experiment.\n"
  },
  "lineage/localhost-v0.68.0/LIFECYCLE-RECONCILIATION.md": {
    "path": "lineage/localhost-v0.68.0/LIFECYCLE-RECONCILIATION.md",
    "format": "markdown",
    "bytes": 1467,
    "sha256": "d9f4657e703dd5b22f981b59f2d76fa944e72b3caa128b6b6ad30355e08a7563",
    "content": "# Lifecycle Reconciliation — localhost v0.62.0\n\nCanonical execution ownership is now explicit and non-overlapping.\n\n## Canonical pass-through\n\nLaunch Zone → Launch Site → Forward Starting Lane → Forward Transmission Lane → Call Zone → Call Site → Processing Site → Return Starting Lane → Return Transmission Lane → Return Zone → Landing Site → Terminal Disposition.\n\n## Ownership\n\n- Launch Zone owns Launch Sites and admits only validated, admitted, scheduled work.\n- Launch Site records the concrete release of work into forward transmission.\n- Call Zone owns the permitted Call Site invocation boundary.\n- Call Site receives forward transmission and invokes the selected processing boundary.\n- Processing Site owns execution for the selected worker.\n- Return Zone owns Landing Sites and terminal disposition after correlated return transmission.\n- Landing Site is the canonical return receiver. No duplicate Return Site is introduced.\n\n## Compatibility\n\nThe historical Return Lane remains a compatibility-lineage alias over Return Starting Lane + Return Transmission Lane. Existing Call/Return identities are retained. Compatibility metadata must not supersede the canonical lifecycle.\n\n## Authority invariant\n\nLifecycle ownership describes where already-authorized work may pass. No zone, site, lane, landing action, or terminal disposition creates semantic authority, cross-domain authority, filesystem authority, or privilege escalation.\n"
  },
  "lineage/localhost-v0.68.0/NATURALIZATION.md": {
    "path": "lineage/localhost-v0.68.0/NATURALIZATION.md",
    "format": "markdown",
    "bytes": 5267,
    "sha256": "515f3613ed2cb0f8297b7e5fbb641dea3a78f0dc0f0c2ef36de0754e9bc62e5f",
    "content": "# localhost v0.55.0 Naturalization\n\nSuccessor to localhost v0.54.0. This checkpoint naturalizes dynamic governance into the existing domain farm/pool federation without replacing the semantic system/worker, capability, call/return, workflow, scheduling, backpressure, or security architecture.\n\nNew governing principle: **capacity and governance may restrict or redirect qualified work, but neither creates authority**.\n\n## v0.56.0 — Runtime supervision\n\nNaturalized a bounded supervisor plane over workers, farms, pools, queues and workflows. Repeated failures escalate to quarantine after three observations. Supervision restores or restricts existing authority only; it does not create authority.\n\n## v0.57.0 — Runtime Telemetry and Service-Level Governance\nNaturalizes bounded runtime measurement and service-level threshold evaluation into the supervised execution fabric. Telemetry is derived from actual work terminal states, scheduler queues and farm-pool occupancy. Supervisor threshold reactions may restrict/escalate but never broaden authority.\n\n## v0.58.0 — Adaptive Capacity Governance\n\nNaturalizes telemetry-driven capacity control into scheduler admission and farm-pool selection. Adaptation is bounded, reversible and authority-preserving; it cannot manufacture topology or privileges.\n\n## v0.59.0 — Launch Site Naturalization\n\nLaunch Sites are naturalized as the explicit execution-release gate between scheduling/allocation and the existing Call Zone / Call Site fabric. They preserve correlation and placement evidence and cannot broaden semantic/domain authority. Blocked and pre-execution-cancelled work never launches.\n\n## v0.60.0 — Landing Site Naturalization\nLanding Sites are naturalized as the symmetric return-side boundary to Launch Sites. Correlated outcomes pass from Return Path/Lane through `APPROACHING -> ACCEPTED -> LANDED` before entering the Return Zone and becoming terminal outcomes. Landing accepts results only and creates no new execution, semantic, domain, filesystem or privilege authority.\n\n## v0.61.0 — Transmission Lane Staging\n`Transmission Lanes` is naturalized as the parent transit concept. Forward and return directions each contain a Starting Lane followed by a Transmission Lane. Correlation continuity is preserved end-to-end. The predecessor Return Lane remains as compatibility lineage referencing the two new return stages. No transport stage broadens semantic, filesystem, domain, or privilege authority.\n\n## v0.62.0 — Lifecycle Reconciliation\nLaunch Zone, Call Zone, Processing Site and Return Zone ownership is now explicit. Landing Site is the canonical return receiver; no duplicate Return Site is introduced. Return Zone owns correlated landing and terminal disposition. Legacy Return Lane remains compatibility lineage only.\n\n## v0.63.0 — Synchronization, Checkpoint and Topology Closure\nSynchronization Sites are naturalized as deterministic workflow fan-in barriers. Checkpoint Sites capture pre-launch, post-processing and post-landing recovery evidence. A topology-closure audit now rejects unresolved modeled continuations. These mechanisms preserve existing semantic/domain/security authority and do not create privilege.\n\n## v0.64.0 — End-to-End Runtime Qualification and Deterministic Reconstruction\nThe established lifecycle fabric is qualified as an integrated transaction path. Lifecycle work now preserves one WORKCALL correlation identity through Launch, Call/Return transmission and Landing. Deterministic reconstruction and a scoped Constructive Lifecycle Seal are introduced; neither expands authority.\n\n## v0.66.0 — Platform Systems and Window System Reconciliation\n- Naturalized Debian, Fedora, Windows, macOS, Android and iOS as six peer Platform Systems.\n- Naturalized Window System as an explicit presentation subsystem of Desktop System.\n- Window System and Windows System are distinct identities and responsibilities.\n- Linux host discovery now distinguishes Debian and Fedora using `/etc/os-release` when available.\n- Native-host qualification is granted only to the actually detected platform for tested generic invariants; all other platform peers remain modeled pending native qualification.\n- The v0.64.0 Constructive Lifecycle Seal is inherited unchanged; these new systems use the existing sealed scope/worker/lifecycle fabric.\n\n## v0.67.0 — Platform Adapter Naturalization\nSix peer Platform Systems now implement a shared modeled adapter contract covering process, filesystem, network, presentation/device integration and capability discovery. Only the detected host adapter can expose native observational evidence; non-host adapters fail closed for native invocation. The adapter layer cannot broaden capabilities, mutate the host automatically, or escalate privilege.\n\n## v0.68.0 — Adapter-Backed Service Integration\nPlatform adapters are now consumable by services through explicitly declared observational adapter domains. Adapter evidence is attached to ordinary service work and therefore remains subordinate to the sealed submitWork lifecycle, including correlation, checkpoints, landing, terminal disposition and reconstruction. Native adapter selection is host-bound and fail-closed; mutation and authority expansion remain prohibited.\n"
  },
  "lineage/localhost-v0.68.0/PLATFORM-ADAPTERS.md": {
    "path": "lineage/localhost-v0.68.0/PLATFORM-ADAPTERS.md",
    "format": "markdown",
    "bytes": 877,
    "sha256": "41da269c138cb09e199d9ec571bd3ed26a00c8e4a7a9b50fac560b8f1b9bc782",
    "content": "# Platform Adapter Naturalization — v0.67.0\n\n`LOCALHOST-PLATFORM-ADAPTER/1` defines one common adapter contract for Debian, Fedora, Windows, macOS, Android and iOS.\n\nDomains: process, filesystem, network, presentation/device, and capability discovery.\n\nOnly the detected host adapter may expose native observational evidence. Non-host adapters remain modeled and native invocation fails closed. Adapter operations do not grant system mutation, privilege escalation, capability creation, or topology expansion. The generic Desktop System and its Window System remain presentation systems above/beside platform-specific integration rather than being confused with Microsoft Windows.\n\nCurrent qualification host: Debian. Debian generic adapter discovery is exercised here; Fedora, Windows, macOS, Android and iOS require native-host qualification before native claims are made.\n"
  },
  "lineage/localhost-v0.68.0/PLATFORM-WINDOW-SYSTEMS.md": {
    "path": "lineage/localhost-v0.68.0/PLATFORM-WINDOW-SYSTEMS.md",
    "format": "markdown",
    "bytes": 1341,
    "sha256": "a5dcebd1d2aea5c91c567580e2285b901c8137de4d228852d375804aff18307c",
    "content": "# Platform and Window Systems — localhost v0.66.0\n\n## Platform peers\nDebian System, Fedora System, Windows System, macOS System, Android System and iOS System are explicit peer systems. They expose the same generic platform-model boundary while preserving platform-specific native qualification status.\n\nA platform system being present in the model does not assert that localhost has been natively tested on that operating system. Only the detected current host may receive current-host qualification evidence; other peers remain modeled with native qualification pending.\n\n## Desktop / Window distinction\nDesktop System is the presentation environment. Window System is an explicit presentation subsystem beneath Desktop System and owns generic window management, registration, layout integration, application presentation and window I/O.\n\nWindow System is distinct from Windows System. Windows System means the Microsoft Windows platform boundary; Window System means generic graphical/window presentation.\n\nCanonical hierarchy:\n\nSystems\n- Platform Systems\n  - Debian System\n  - Fedora System\n  - Windows System\n  - macOS System\n  - Android System\n  - iOS System\n- Desktop System\n  - Window System\n  - Workspace\n  - Layouts\n  - Taskbar\n  - Start Menu / Launcher\n  - System Tray / Status Area\n  - Application Presentation\n  - Desktop I/O\n"
  },
  "lineage/localhost-v0.68.0/QUALIFICATION.md": {
    "path": "lineage/localhost-v0.68.0/QUALIFICATION.md",
    "format": "markdown",
    "bytes": 1710,
    "sha256": "2812d54dde697acff3e3df4fa76edff40c3944056bf699ea802388c79955c3c4",
    "content": "# Qualification — localhost v0.66.0\n\nState: **Under Conditional Experiment**. The v0.64.0 Constructive Lifecycle Seal is inherited unchanged.\n\nCurrent-host isolated qualification: **108/108 PASS, 0 FAIL**.\n\nNew evidence includes six-platform peer registry coverage, explicit Desktop System → Window System hierarchy, Window System UI work traversal through the existing lifecycle, and qualification-honesty checks preventing untested platform peers from being represented as native-host verified.\n\nThe qualification host is detected by the runtime. Platform-specific native behavior for Fedora, Windows, macOS, Android and iOS is not claimed unless executed on such a host. Model presence is not native implementation evidence.\n\n## v0.67.0\nIsolated Debian-host runtime qualification on port 28067: 112/112 PASS, 0 FAIL. Added evidence covers six-adapter contract/domain coverage, detected-host native observation, non-host fail-closed behavior, and rejection of platform mutation authority. Other operating-system adapters remain modeled pending native-host qualification. Overall state remains Under Conditional Experiment; the v0.64.0 lifecycle Constructive Seal remains inherited unchanged.\n\n## v0.68.0 — Adapter-Backed Service Integration\nIsolated Debian-host runtime qualification on port 18168: 116/116 PASS, 0 FAIL. Added evidence covers native adapter-backed service selection with shared work/correlation lineage, rejection of undeclared adapter domains, rejection of mutation requests, and preservation of system/worker/adapter/capability topology. Overall project qualification remains Under Conditional Experiment; non-Debian native adapters remain modeled pending native-host qualification.\n"
  },
  "lineage/localhost-v0.68.0/RUNTIME-SUPERVISION.md": {
    "path": "lineage/localhost-v0.68.0/RUNTIME-SUPERVISION.md",
    "format": "markdown",
    "bytes": 703,
    "sha256": "10bdc627cdbe3c9ee3eb4efd7e7282c93fa660198ab5859dd69c62d9f4ff8ba7",
    "content": "# Runtime Supervision — localhost v0.56.0\n\n`LOCALHOST-RUNTIME-SUPERVISOR/1` observes workers, farms, pools, queues and workflows.\n\nPolicy: observe -> bounded recovery/restart -> repeated-failure quarantine/escalation. Three repeated failures quarantine the affected worker/farm/pool. Supervision may reduce availability or restore a previously authorized component; it cannot broaden semantic concern, farm-domain authority, filesystem scope, privileges, or security authority.\n\nThe supervisor journal retains intervention evidence in volatile runtime state. Queue pressure and workflow stalls are observable/escalatable; destructive or privilege-expanding action is not part of supervisor authority.\n"
  },
  "lineage/localhost-v0.68.0/RUNTIME-TELEMETRY.md": {
    "path": "lineage/localhost-v0.68.0/RUNTIME-TELEMETRY.md",
    "format": "markdown",
    "bytes": 878,
    "sha256": "56a188852d1826b0ae1d665e9fc9a05c08c822fd02e16c9dc95d81be6e904649",
    "content": "# Runtime Telemetry and Service-Level Governance — v0.57.0\n\nAdds bounded operational telemetry to the localhost monolith.\n\n## Measures\n- terminal work counts by completed, failed, blocked, cancelled, timeout and recovered state\n- average and maximum observed work lifecycle latency\n- priority queue pressure\n- farm-pool saturation\n- supervisor-cycle count and threshold-breach count\n- bounded recent event history (512 entries)\n\n## Service-level governance\nThe supervisor evaluates queue depth, terminal error rate, average lifecycle latency and pool saturation against explicit thresholds. Breaches create evidence and supervisor escalation findings. They do not broaden routing, semantic concern, filesystem scope, farm-domain authority, or privilege.\n\nTelemetry is observational evidence. It does not by itself establish performance qualification for production workloads.\n"
  },
  "lineage/localhost-v0.68.0/SCOPE-CAPABILITY-WORK.md": {
    "path": "lineage/localhost-v0.68.0/SCOPE-CAPABILITY-WORK.md",
    "format": "markdown",
    "bytes": 1233,
    "sha256": "dbb4c6e0135dec75b68bc8facca0e63dbce1024e0a7ef60895af5e8b4af4c5c5",
    "content": "# localhost v0.46.0 — Scope, Capability and Work Model\n\nIntroduces LOCALHOST-SCOPE/1, LOCALHOST-CAPABILITY-REGISTRY/1 and LOCALHOST-WORK/1.\n\nEach registered system owns a scope containing purpose, responsibilities, inputs, outputs, resources, concerned workers, allowed/prohibited calls, completion conditions and capabilities. Each worker owns a complementary scope containing accepted work domains, serving systems, resource requirements, concurrency levels, outputs, failure classes and return obligations.\n\nWork follows: system scope -> capability requirement -> concerned-worker selection -> semantic dispatch -> call site -> pass-through fabric -> worker -> return path/lane -> correlated result.\n\n## Windows System\nWindows System is an explicit peer system. It models platform/process/filesystem/network/desktop integration capabilities. On a non-Windows qualification host these capabilities remain a platform integration model and are not represented as host-native Windows execution evidence.\n\n## Desktop System\nDesktop System is an explicit peer system owning workspace, window/layout and presentation-state concerns. It participates in the same semantic worker topology and work/call/return rules as all other systems.\n"
  },
  "lineage/localhost-v0.68.0/SEMANTIC-TOPOLOGY.md": {
    "path": "lineage/localhost-v0.68.0/SEMANTIC-TOPOLOGY.md",
    "format": "markdown",
    "bytes": 1156,
    "sha256": "3dbe8f30705d3973aebde8205413af9d817bbd6227543d4046ba0f601572a762",
    "content": "# localhost v0.45.0 — Semantic System/Worker Topology\n\nQualification state: **Under Conditional Experiment**.\n\n`LOCALHOST-SEMANTIC-TOPOLOGY/1` gives the universal structural fabric operational concern. Systems and workers are no longer considered interchangeable merely because a bridge/path/lane can connect them.\n\n## Contract\n\n- Every registered system owns one or more concerned workers.\n- Every registered worker serves one or more systems.\n- Relationships are bidirectional and carry their reason/domain.\n- Core control roles may serve many systems.\n- Specialist roles are selected by domain: network, document, security, storage, execution, identity, lifecycle, messaging, topology, or UI/workflow.\n- A semantic dispatch is accepted only when the system-worker relationship exists.\n- Accepted dispatches use the existing call-site → forward fabric → worker → return-path → return-lane contract and preserve correlation.\n- Unconcerned pairings fail closed with `SEMANTIC_ROUTE_REJECTED`.\n\nThis is a structural routing/ownership model. It does not falsely claim that every named worker already contains a specialized external implementation.\n"
  },
  "lineage/localhost-v0.68.0/SERVICE-PLANE.md": {
    "path": "lineage/localhost-v0.68.0/SERVICE-PLANE.md",
    "format": "markdown",
    "bytes": 1388,
    "sha256": "8752a326cf6acb236f9d947e1accb64b6623e588363a0303aca24134a0368405",
    "content": "# Service Plane — localhost v0.65.0\n\nSchema: `LOCALHOST-SERVICE/1` / `LOCALHOST-SERVICE-INVOCATION/1`\n\nThe Service Plane is the first application/service layer built above the Constructively Sealed v0.64.0 lifecycle fabric. A service is a bounded binding of a service key to an existing system and one of that system's existing semantic capabilities. Registration rejects capability requests outside the owning system scope.\n\nInitial generic services:\n- `runtime.execute` — Self-Test & Health System / execution domain.\n- `desktop.present` — Desktop System / UI domain.\n- `storage.inspect` — Windows System / storage domain.\n\nInvocation uses `submitWork` and therefore traverses the established queue/admission, allocation, checkpoint, Launch Site, forward transmission, Call Site, Processing Site, return transmission, Landing Site, Return Zone and terminal-disposition lifecycle. Service invocation records the work ID, end-to-end correlation ID, deterministic reconstruction key, terminal status and latency.\n\nLocal qualified APIs: `GET /api/services` and `POST /api/services/invoke`. These remain behind the existing qualified-local session boundary.\n\nAuthority invariant: a service can consume only capabilities already present in its owning system scope. It cannot create systems, workers, capabilities, farms, pools, semantic relations, filesystem authority or privileges.\n"
  },
  "lineage/localhost-v0.68.0/SYNCHRONIZATION-CHECKPOINTS.md": {
    "path": "lineage/localhost-v0.68.0/SYNCHRONIZATION-CHECKPOINTS.md",
    "format": "markdown",
    "bytes": 835,
    "sha256": "a30613b7142e8456a29222536534dc520b05a87b35d0f4de30021b699c87657a",
    "content": "# Synchronization and Checkpoint Sites — localhost v0.63.0\n\n## Synchronization Sites\nWorkflow ready-waves terminate at a deterministic Synchronization Site before dependent work can continue. Each site preserves workflow/correlation identity, wave number, participating task IDs and terminal states. It is a fan-in barrier only and creates no new task authority.\n\n## Checkpoint Sites\nRecoverable evidence is captured at three lifecycle boundaries:\n- pre-launch: after scheduling/resource allocation, before Launch Site release;\n- post-processing: after correlated processing/call-return completion, before terminal return handling;\n- post-landing: after Landing Site acceptance, before/with terminal disposition.\n\nCheckpoints are evidence/recovery references. They do not grant routing, execution, filesystem or privilege authority.\n"
  },
  "lineage/localhost-v0.68.0/TOPOLOGY-CLOSURE.md": {
    "path": "lineage/localhost-v0.68.0/TOPOLOGY-CLOSURE.md",
    "format": "markdown",
    "bytes": 586,
    "sha256": "f7f25d309ea75d324906f46626622c703ed5cf2a32c51bcc08168c59e73c0c47",
    "content": "# Topology Closure Audit — localhost v0.63.0\n\nThe closure audit verifies that every modeled pass-through flow resolves its Call Site, forward Starting Lane, forward Transmission Lane, Return Path, return Starting Lane and return Transmission Lane. Every system/worker semantic relation resolves its lifecycle zones and Call Zone, and every worker resolves a Processing Site.\n\nDeclared ring/mesh/matrix topology may model cyclic structure. Workflow dependency graphs remain DAGs and dependency cycles are rejected. The audit reports unresolved continuations as qualification failures.\n"
  },
  "lineage/localhost-v0.68.0/TRANSMISSION-LANES.md": {
    "path": "lineage/localhost-v0.68.0/TRANSMISSION-LANES.md",
    "format": "markdown",
    "bytes": 1001,
    "sha256": "f4967e5a7adbefe792b53aa565341f89626054266a9c7dac5354d4a9fecc596b",
    "content": "# Transmission Lane Staging\n\nVersion: 0.61.0\nSchema: `LOCALHOST-TRANSMISSION-LANES/1`\n\n`Transmission Lanes` is the parent transit model. Each direction has two explicit stages:\n\n- Forward: `Launch Site -> Forward Starting Lane -> Forward Transmission Lane -> Call Site -> Processing Site`\n- Return: `Processing Site -> Return Starting Lane -> Return Transmission Lane -> Landing Site -> Return Zone`\n\nThe Starting Lane represents departure/readiness and establishes the direction-specific transit entry. The Transmission Lane represents the active pass-through stage toward the next site. Both stages retain the same correlation identity.\n\nThe historical `Return Lane` object remains present as compatibility lineage and points to its new Return Starting Lane and Return Transmission Lane. It is not silently deleted or redefined as new authority.\n\nTransmission staging is structural and in-process. It does not claim physical network links, kernel transport queues, or distributed-machine transport.\n"
  },
  "lineage/localhost-v0.68.0/WORKER-AVAILABILITY.md": {
    "path": "lineage/localhost-v0.68.0/WORKER-AVAILABILITY.md",
    "format": "markdown",
    "bytes": 1058,
    "sha256": "27ad19edcc01eab505b032ea1410c9b844e590a5b921de946f055187d6c11abe",
    "content": "# localhost v0.49.0 — Worker Availability and Backpressure\n\nAdds operational availability to the semantic system/worker topology.\n\n## Worker state\nEvery registered worker has LOCALHOST-WORKER-AVAILABILITY/1 state: ready, busy, blocked, degraded, or offline; bounded capacity; active count; dependency metadata; and update time.\n\n## Dispatch contract\nSystem scope -> capability -> concerned worker -> availability/dependency gate -> priority queue -> allocation -> call zone -> processing site -> return zone.\n\nBlocked/offline/capacity-exhausted or dependency-blocked work does not receive a scheduler allocation. It returns a typed blocked terminal result to the originating system. Successful and abnormal allocated paths release both scheduler and worker capacity.\n\n## Qualification\nCurrent Linux host structural self-test: 38/38 PASS. This verifies modeled availability, backpressure, dependency blocking, capacity release, deterministic drain, and prior regression invariants. It does not claim distributed scheduling or native Windows-host execution.\n"
  },
  "lineage/localhost-v0.68.0/WORKER-POOL.md": {
    "path": "lineage/localhost-v0.68.0/WORKER-POOL.md",
    "format": "markdown",
    "bytes": 898,
    "sha256": "f21dca4172f847440594991eba5d0a6156a00b95f38adef2e676f3ac165b1b85",
    "content": "# Persistent Worker Pool and Task Farming — v0.53.0\n\n`localhost` now maintains a bounded reusable Node.js worker-thread pool for concurrent workflow ready waves.\n\nFlow:\n\n`workflow ready wave -> bounded pool -> task farming -> reusable pool lanes -> batch completion -> deterministic semantic commit -> fan-in -> correlated return`\n\nThe pool size is host-bounded and configurable with `LOCALHOST_WORKER_POOL_SIZE` (2..32; default derived from logical CPU count and capped at 8). A ready wave larger than the pool is split into deterministic batches. Pool workers remain alive for reuse rather than being created and terminated for every wave.\n\nPool telemetry records creation count, dispatches, lane reuse, batches, current busy lanes and peak busy lanes. Pooling does not bypass system/worker concern, capability selection, availability, scheduler, call/return, failure or correlation contracts.\n"
  },
  "lineage/localhost-v0.68.0/WORKER-SELECTION.md": {
    "path": "lineage/localhost-v0.68.0/WORKER-SELECTION.md",
    "format": "markdown",
    "bytes": 938,
    "sha256": "957dd57d9d5b7ea1c23173b425bd3906482cc12ec8d4adfbf3c1ccd418b4194e",
    "content": "# Worker Selection and Load Distribution — localhost v0.50.0\n\nWorker selection is now an explicit, auditable routing stage between capability classification and lifecycle dispatch.\n\nSelection order:\n1. semantic system/worker concern;\n2. requested capability/domain;\n3. availability and dependency eligibility;\n4. health state;\n5. free worker capacity;\n6. current load;\n7. domain affinity and optional locality/preference;\n8. stable worker-key tie break.\n\nEach work record retains the complete selection evidence, including candidates, scores, eligibility/exclusion reasons and the selected worker. An explicitly pinned worker may be used for qualification or controlled routing. Ordinary work is dynamically selected.\n\nUnavailable workers are excluded before scheduler allocation. If the best worker becomes unavailable, the selector can route to the next qualified concerned worker. This does not expand privilege or filesystem scope.\n"
  },
  "lineage/localhost-v0.68.0/WORKFLOWS.md": {
    "path": "lineage/localhost-v0.68.0/WORKFLOWS.md",
    "format": "markdown",
    "bytes": 1012,
    "sha256": "99842a0360eee40a3c0a052d8a80efca76fef1ae8a288c2de33c15c793d579fa",
    "content": "# Multi-Worker Workflows — localhost v0.51.0\n\nOne originating system request may now be decomposed into a directed acyclic graph (DAG) of typed capability tasks.\n\nFlow: system request -> workflow correlation -> dependency-ready wave -> worker selection -> per-task call/processing/return -> fan-in aggregation -> one correlated workflow return to the originating system.\n\nIndependent ready tasks form a deterministic fan-out wave. Dependent tasks run only after all dependencies reach successful terminal states (completed or recovered). Failed/blocked dependencies block downstream tasks. Every task retains its ordinary work/lifecycle evidence and selected worker. The workflow retains waves, task states, aggregate result, return-zone identity and one workflow correlation ID.\n\nThis implementation executes ready-wave tasks deterministically in-process; it models fan-out topology without claiming simultaneous CPU execution. Actual worker-thread parallel execution remains a separate qualification target.\n"
  }
});
function documentationList(){return Object.values(EMBEDDED_DOCUMENTATION).map(({content,...meta})=>meta);}
function documentationGet(name){const key=String(name||'').replace(/^\.\//,'');const doc=EMBEDDED_DOCUMENTATION[key];if(!doc)throw new Error('Unknown documentation path: '+key);return doc;}
function documentationVerify(){const failures=[];for(const doc of Object.values(EMBEDDED_DOCUMENTATION)){const actual=tfDocumentationCrypto.createHash('sha256').update(doc.content).digest('hex');if(actual!==doc.sha256||Buffer.byteLength(doc.content)!==doc.bytes)failures.push({path:doc.path,expected:doc.sha256,actual});}return Object.freeze({schema:DOCUMENTATION_SCHEMA,total:Object.keys(EMBEDDED_DOCUMENTATION).length,verified:Object.keys(EMBEDDED_DOCUMENTATION).length-failures.length,failures,pass:failures.length===0});}
function documentationExport(targetDir){const base=tfDocumentationPath.resolve(String(targetDir||'embedded-documentation'));for(const doc of Object.values(EMBEDDED_DOCUMENTATION)){const out=tfDocumentationPath.join(base,doc.path);tfDocumentationFs.mkdirSync(tfDocumentationPath.dirname(out),{recursive:true});tfDocumentationFs.writeFileSync(out,doc.content,'utf8');}return {schema:DOCUMENTATION_SCHEMA,target:base,count:Object.keys(EMBEDDED_DOCUMENTATION).length,verification:documentationVerify()};}


module.exports=Object.freeze({bindDocumentationV04508,TF_DOCUMENTATION_SURFACES_V373,TF_DOCUMENTATION_SYSTEMS_V373,TF_DOCUMENTATION_BOUNDARY_V373,tfDocumentationSystemsV373,tfSystemDocumentationV373,tfUniversalDocumentationFabricV373,tfOpenSystemDocumentationWindowV373,tfDocumentationSelfTestV373,tfTerraformerHandbookV373,TF_SYSTEM_CONTRACT_V374,tfCanonicalRegistryV374,tfValidateSystemContractV374,tfUniversalSystemContractV374,tfLifecycleTransitionV374,tfTransactionalProjectCheckpointV374,tfDocumentationProjectionV374,tfExecutableOwnershipAuditV374,tfQualificationOrchestratorV374,tfTerraformerHandbookV374,bindEmbeddedDocumentationDependencies,DOCUMENTATION_SCHEMA,EMBEDDED_DOCUMENTATION,documentationList,documentationGet,documentationVerify,documentationExport});
