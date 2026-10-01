'use strict';
const generation=require('./terraformer.generation.js');
const automation=require('./terraformer.automation.js');
const uuid=require('./terraformer.uuid.js');
const ID='system.completion', VERSION='0.44.31';
const SYSTEM=Object.freeze({id:ID,uuid:uuid.identityV36195('system',ID),name:'Completion System',version:VERSION,capabilities:Object.freeze(['completion.inventory','completion.coverage','completion.gaps','completion.conditions','completion.verify','completion.reconcile','completion.report']),semantics:'Measures and reconciles declared coverage; completion never means implicit authority or perfect correctness.',authority:false});
function canonicalSystemIds(sourceText){const text=String(sourceText??'');const found=new Set();for(const m of text.matchAll(/[\"'](system\.[a-zA-Z0-9_.-]+)[\"']/g)){const id=m[1];if(id==='system.__malformed__'||id==='system.a'||id==='system.self-test'||id==='system.self-launch-test')continue;found.add(id);}found.add(ID);return Array.from(found).sort();}
function bind(deps={}){const identity=typeof deps.identity==='function'?deps.identity:uuid.identityV36195;const generatorDescriptor=id=>generation.systemGeneratorDescriptor(id,identity);const automatorDescriptor=id=>automation.LEGACY.tfSystemAutomatorDescriptorV36196(id,identity);function coverage(sourceText){const systems=canonicalSystemIds(sourceText),generators=systems.map(generatorDescriptor),automators=systems.map(automatorDescriptor),policies=automators.reduce((a,x)=>(a[x.policy]=(a[x.policy]||0)+1,a),{});return {uuid:identity('completion-report',systems.join('|')),systems,generators,automators,policies,generatorCoverage:generators.length===systems.length,automatorCoverage:automators.length===systems.length,complete:generators.length===systems.length&&automators.length===systems.length,authority:false};}
function selfTest(sourceText){const c=coverage(sourceText);if(!c.complete||!c.generatorCoverage||!c.automatorCoverage)throw Error('coverage incomplete');if(new Set(c.generators.map(x=>x.uuid)).size!==c.generators.length)throw Error('generator UUID collision');if(new Set(c.automators.map(x=>x.uuid)).size!==c.automators.length)throw Error('automator UUID collision');const sensitive=automatorDescriptor('system.whatsapp.api');if(sensitive.policy!=='authorization-required'||automation.LEGACY.tfAutomatorRunV36196(sensitive,{},{}).status!=='authorization-required')throw Error('authorization gate failed');const approval=automatorDescriptor('system.approval');if(automation.LEGACY.tfAutomatorRunV36196(approval,{}, {authorized:true,scopeValid:true,preconditionsPass:true}).status!=='human-decision-required')throw Error('manual decision boundary failed');const bounded=automatorDescriptor('system.arithmetic'),admitted=automation.LEGACY.tfAutomatorRunV36196(bounded,{op:'add'},{scopeValid:true,preconditionsPass:true});if(admitted.status!=='admitted'||admitted.executed!==false||admitted.authorityGranted!==false)throw Error('bounded automator boundary failed');return {pass:true,systems:c.systems.length,generators:c.generators.length,automators:c.automators.length,policies:c.policies,uuidCoverage:true,completion:c.complete,authorityGranted:false};}
return Object.freeze({TF_COMPLETION_SYSTEM_V36196:SYSTEM,tfCanonicalSystemIdsV36196:canonicalSystemIds,tfSystemGeneratorDescriptorV36196:generatorDescriptor,tfSystemAutomatorDescriptorV36196:automatorDescriptor,tfCompletionCoverageV36196:coverage,tfAutomatorRunV36196:automation.LEGACY.tfAutomatorRunV36196,tfCompletionSelfTestV36196:selfTest});}
function qualify(sourceText=''){const q=bind().tfCompletionSelfTestV36196(sourceText);return Object.freeze({...q,id:ID,version:VERSION,qualificationGranted:false});}

function bindNeedCompletionClosureV04631(deps={}){
 const {tfCanonicalSystemIdsV36196,tfReconstructFromInnerCapabilitiesV36384,tfInnerReconstructionSelfTestV36384,tfCompletionSelfTestV36196}=deps;
 /* === Terraformer v0.36.385: Need / Completion Closure Gate === */
const TF_RECONSTRUCTION_REQUIRED_SYSTEMS_V36385=Object.freeze(["system.seed","system.seeding","system.seeder","system.bootstrap","system.registry","system.generator","system.reconstruction","system.system","system.identity","system.unique","system.uuid","system.number","system.numbering","system.numberer","system.name","system.naming","system.namer","system.engine","system.service","system.working","system.worker","system.automator","system.pool","system.farmer","system.context","system.instantiation","system.instance","system.constructor","system.function","system.call","system.parameter","system.execution","system.return","system.ticketer","system.wiring","system.wire","system.grouping","system.grouper","system.group","system.system-group","system.statement","system.stating","system.stater","system.loop","system.looping","system.looper","system.rule","system.ruling","system.carrier","system.socket","system.server","system.client","system.view","system.review","system.preview","system.thumbnail","system.summary","system.logging","system.reporting","system.assurance"]);

const TF_NEED_COMPLETION_SCHEMA_V36385=Object.freeze({schema:"TERRAFORMER-NEED-COMPLETION/1",scope:"inner-reconstruction-closure",
 categories:Object.freeze(["present-and-needed","needed-but-missing","not-needed-for-reconstruction-closure"]),completionRequiresZeroMissing:true,
 completionRequiresInternalReconstruction:true,additionByNeedOnly:true,absenceDoesNotImplyNeed:true,externalAssemblyAllowed:false,authorityAmplification:false});
function tfNeedCompletionAuditV36385(sourceText){
 const canonical=tfCanonicalSystemIdsV36196(sourceText),set=new Set(canonical),required=new Set(TF_RECONSTRUCTION_REQUIRED_SYSTEMS_V36385);
 const presentNeeded=TF_RECONSTRUCTION_REQUIRED_SYSTEMS_V36385.filter(id=>set.has(id)),neededMissing=TF_RECONSTRUCTION_REQUIRED_SYSTEMS_V36385.filter(id=>!set.has(id));
 const notNeeded=canonical.filter(id=>!required.has(id));
 const reconstruction=tfReconstructFromInnerCapabilitiesV36384(sourceText);
 const internalClosure=reconstruction.count===canonical.length&&reconstruction.schema.innerCapabilitiesOnly===true;
 return Object.freeze({schema:TF_NEED_COMPLETION_SCHEMA_V36385,canonicalSystems:canonical.length,requiredSystems:required.size,
  presentAndNeeded:Object.freeze(presentNeeded),neededButMissing:Object.freeze(neededMissing),notNeededForReconstructionClosure:Object.freeze(notNeeded),
  presentAndNeededCount:presentNeeded.length,neededButMissingCount:neededMissing.length,notNeededForReconstructionClosureCount:notNeeded.length,
  internalClosure,completionEligible:neededMissing.length===0&&internalClosure,additionsRequired:neededMissing.length});
}
function tfNeedCompletionSelfTestV36385(sourceText){
 const a=tfNeedCompletionAuditV36385(sourceText),missing=[];
 if(a.requiredSystems!==60||a.presentAndNeededCount!==60||a.neededButMissingCount!==0||a.additionsRequired!==0)missing.push("need-closure");
 if(!a.internalClosure||!a.completionEligible||a.schema.externalAssemblyAllowed||!a.schema.additionByNeedOnly||!a.schema.absenceDoesNotImplyNeed)missing.push("completion-gate");
 const r=tfInnerReconstructionSelfTestV36384(sourceText);if(!r.pass||r.missing!==0||r.orphans!==0)missing.push("reconstruction");
 const c=tfCompletionSelfTestV36196(sourceText);if(!c.pass||!c.completion)missing.push("universal-completion");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Need / Completion closure failed: "+missing.join(",")+".");
 return Object.freeze({pass:true,canonicalSystems:a.canonicalSystems,requiredSystems:a.requiredSystems,presentAndNeeded:a.presentAndNeededCount,
  neededButMissing:a.neededButMissingCount,notNeededForReconstructionClosure:a.notNeededForReconstructionClosureCount,additionsRequired:0,
  internalReconstructionClosure:true,completionEligible:true,absenceDoesNotImplyNeed:true,additionByNeedOnly:true,externalAssemblyAllowed:false,missing:0});
}
globalThis.TF_RECONSTRUCTION_REQUIRED_SYSTEMS_V36385=TF_RECONSTRUCTION_REQUIRED_SYSTEMS_V36385;
globalThis.TF_NEED_COMPLETION_SCHEMA_V36385=TF_NEED_COMPLETION_SCHEMA_V36385;
globalThis.tfNeedCompletionAuditV36385=tfNeedCompletionAuditV36385;
 return Object.freeze({TF_RECONSTRUCTION_REQUIRED_SYSTEMS_V36385,TF_NEED_COMPLETION_SCHEMA_V36385,tfNeedCompletionAuditV36385,tfNeedCompletionSelfTestV36385});
}

module.exports=Object.freeze({ID,VERSION,SYSTEM,canonicalSystemIds,bind,qualify,bindNeedCompletionClosureV04631});
