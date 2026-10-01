'use strict';
/* Terraformer v0.44.36: Universal Assurance Fabric extraction. */
function bind(deps={}){
 const {identity,uuidValidate,canonicalSystemIds}=deps;
 if(typeof identity!=='function') throw new Error('assurance dependency missing: identity');
 if(typeof uuidValidate!=='function') throw new Error('assurance dependency missing: uuidValidate');
 if(typeof canonicalSystemIds!=='function') throw new Error('assurance dependency missing: canonicalSystemIds');
 function assuranceIdentity(id,name,role){return Object.freeze({id,uuid:identity('system',id),name,role,capabilities:Object.freeze(['assurance.conditions','assurance.evidence','assurance.evaluate','assurance.report','assurance.reconcile']),grantsAuthority:false});}
 const systems=Object.freeze({validation:assuranceIdentity('system.validation','Validation System','validation'),validator:assuranceIdentity('system.validator','Validator','validation-agent'),verification:assuranceIdentity('system.verification','Verification System','verification'),verifier:assuranceIdentity('system.verifier','Verifier','verification-agent'),examination:assuranceIdentity('system.examination','Examination System','examination'),examiner:assuranceIdentity('system.examiner','Examiner','examination-agent'),inspection:assuranceIdentity('system.inspection','Inspection System','inspection'),inspector:assuranceIdentity('system.inspector','Inspector','inspection-agent')});
 const conditions=Object.freeze(['identity-valid','uuid-valid','schema-valid','type-valid','scope-valid','configuration-valid','dependency-valid','relationship-valid','reference-valid','state-valid','policy-valid','authorization-valid','security-boundary-valid','input-valid','output-valid','invariant-valid','preconditions-valid','postconditions-valid','stage-valid','navigation-valid','coordination-valid','generator-conditions-valid','automator-policy-valid','evidence-present','integrity-valid','compatibility-valid','recovery-valid','regression-valid','completion-consistent']);
 function applicability(targetKind,condition,targetId=''){const kind=String(targetKind),id=String(targetId).toLowerCase();if(!['system','generator','automator'].includes(kind))return 'not-applicable';if(condition==='generator-conditions-valid')return kind==='generator'?'required':'not-applicable';if(condition==='automator-policy-valid')return kind==='automator'?'required':'not-applicable';if(condition==='authorization-valid')return kind==='automator'||/(auth|secure|crypto|network|transfer|admin|payment|external)/.test(id)?'required':'applicable';return 'required';}
 function profile(targetKind,targetId){const cs=conditions.map(name=>Object.freeze({name,applicability:applicability(targetKind,name,targetId)}));return Object.freeze({uuid:identity('assurance-profile',targetKind+':'+targetId),targetKind,targetId,conditions:cs});}
 function evaluate(p,evidence={}){const results=p.conditions.map(c=>{if(c.applicability==='not-applicable')return{name:c.name,status:'not-applicable'};if(Object.prototype.hasOwnProperty.call(evidence,c.name))return{name:c.name,status:evidence[c.name]===true?'pass':'fail'};return{name:c.name,status:'unverified'};});const required=results.filter((r,i)=>p.conditions[i].applicability==='required');return{uuid:identity('assurance-result',p.uuid+':'+JSON.stringify(results)),targetKind:p.targetKind,targetId:p.targetId,results,qualified:required.length>0&&required.every(x=>x.status==='pass'),state:required.some(x=>x.status==='fail')?'failed':required.every(x=>x.status==='pass')?'verified':'unverified',authorityGranted:false};}
 function coverage(sourceText){const ids=canonicalSystemIds(sourceText),generators=ids.map(x=>'generator.'+x.slice(7)),automators=ids.map(x=>'automator.'+x.slice(7));return{systems:ids.map(x=>profile('system',x)),generators:generators.map(x=>profile('generator',x)),automators:automators.map(x=>profile('automator',x))};}
 function selfTest(sourceText){for(const x of Object.values(systems))if(!uuidValidate(x.uuid))throw new Error('assurance UUID');const cov=coverage(sourceText);if(!cov.systems.length||cov.systems.length!==cov.generators.length||cov.systems.length!==cov.automators.length)throw new Error('assurance coverage');const gp=profile('generator','generator.window');if(gp.conditions.find(x=>x.name==='generator-conditions-valid').applicability!=='required')throw new Error('generator condition');const ap=profile('automator','automator.whatsapp.api');if(ap.conditions.find(x=>x.name==='authorization-valid').applicability!=='required')throw new Error('authorization condition');const ev=Object.fromEntries(conditions.map(x=>[x,true]));if(evaluate(ap,ev).state!=='verified')throw new Error('assurance evaluation');if(evaluate(ap,{}).state!=='unverified')throw new Error('missing evidence must not pass');if(evaluate(ap,{...ev,'integrity-valid':false}).state!=='failed')throw new Error('failed evidence must fail');if(evaluate(ap,ev).authorityGranted)throw new Error('assurance authority leak');return{pass:true,identities:8,conditions:conditions.length,systems:cov.systems.length,generators:cov.generators.length,automators:cov.automators.length,validation:true,verification:true,examination:true,inspection:true,evidenceRequired:true,authorityGranted:false};}
 return {TF_ASSURANCE_SYSTEMS_V36201:systems,TF_ASSURANCE_CONDITIONS_V36201:conditions,tfAssuranceApplicabilityV36201:applicability,tfAssuranceProfileV36201:profile,tfAssuranceEvaluateV36201:evaluate,tfUniversalAssuranceCoverageV36201:coverage,tfAssuranceSelfTestV36201:selfTest};
}


function bindCodeOwnershipAuditV04499(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.267: Canonical Code Ownership Audit === */
const TF_CODE_OWNERSHIP_POLICY_V36267=Object.freeze({
 invariant:"Executable code has a canonical System owner unless it is minimum kernel/bootstrap infrastructure required to construct, register, validate, or start the System fabric.",
 classes:Object.freeze(["SYSTEM_OWNED","KERNEL_REQUIRED","DATA_PROVENANCE","ORPHAN"]),
 target:Object.freeze({unexplainedExecutableOutsideSystems:0}),
 migration:Object.freeze({movesCode:false,renamesCode:false,deletesCode:false,nonDestructive:true})
});
function tfTopLevelExecutableDeclarationsV36267(sourceText){
 const rx=/^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(|^class\s+([A-Za-z_$][\w$]*)\b/gm,out=[];let m;
 while((m=rx.exec(sourceText)))out.push(Object.freeze({name:m[1]||m[2],kind:m[1]?"function":"class",offset:m.index}));
 return Object.freeze(out);
}
function tfCodeOwnershipAuditV36267(sourceText){
 const systems=tfCanonicalSystemIdsV36196(sourceText),decl=tfTopLevelExecutableDeclarationsV36267(sourceText);
 const kernelNames=new Set(["main","usage","ensureSelfPlacement","compareSemver","sha256File","atomicWrite","safeJsonParse"]);
 const rows=decl.map(d=>{
  const n=d.name.toLowerCase();let classification="ORPHAN",owner=null,evidence="no explicit canonical ownership evidence";
  if(kernelNames.has(d.name)){classification="KERNEL_REQUIRED";owner="kernel.bootstrap";evidence="minimum bootstrap/kernel allowlist";}
  else{
   const hits=systems.filter(id=>{const leaf=id.split(".").pop().replace(/-/g,"");return leaf.length>3&&n.includes(leaf);});
   if(hits.length===1){classification="SYSTEM_OWNED";owner=hits[0];evidence="unique canonical system-name affinity";}
   else if(hits.length>1){const exact=hits.find(id=>n.includes(id.slice(7).replace(/[.-]/g,"")));if(exact){classification="SYSTEM_OWNED";owner=exact;evidence="qualified full canonical-name affinity";}}
  }
  return Object.freeze({...d,classification,owner,evidence});
 });
 const counts={};for(const r of rows)counts[r.classification]=(counts[r.classification]||0)+1;
 return Object.freeze({declarations:rows.length,systems:systems.length,rows:Object.freeze(rows),counts:Object.freeze(counts),
  unexplainedExecutableOutsideSystems:counts.ORPHAN||0,complete:(counts.ORPHAN||0)===0,nonDestructive:true});
}
function tfCodeOwnershipAuditSelfTestV36267(sourceText){
 const a=tfCodeOwnershipAuditV36267(sourceText),missing=[];
 if(!a.declarations)missing.push("declarations");if(a.rows.length!==a.declarations)missing.push("coverage");
 if(a.rows.some(r=>!TF_CODE_OWNERSHIP_POLICY_V36267.classes.includes(r.classification)))missing.push("classification");
 if(a.rows.some(r=>r.classification==="SYSTEM_OWNED"&&!r.owner))missing.push("owner");
 if(!a.nonDestructive)missing.push("non-destructive");
 if(missing.length)throw new Error("code ownership audit failure "+missing.join(","));
 return Object.freeze({pass:true,declarations:a.declarations,systems:a.systems,counts:a.counts,ownershipComplete:a.complete,
  unexplainedExecutableOutsideSystems:a.unexplainedExecutableOutsideSystems,nonDestructive:true,qualification:a.complete?"Verified":"Under Conditional Experiment",missing:0});
}
 return Object.freeze({TF_CODE_OWNERSHIP_POLICY_V36267,tfTopLevelExecutableDeclarationsV36267,tfCodeOwnershipAuditV36267,tfCodeOwnershipAuditSelfTestV36267});
}
module.exports=Object.freeze({bind,bindCodeOwnershipAuditV04499});
