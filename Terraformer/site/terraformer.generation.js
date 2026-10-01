'use strict';
const UUID=require('./terraformer.uuid.js');
const {generate:uuid,identityV36195:tfIdentityUuidV36195,generatorV36195:tfUuidGeneratorV36195,validateV36195:tfUuidValidateV36195,reconcileCollectionV36195:tfUuidReconcileCollectionV36195,LEGACY_SYSTEM_V36195:TF_UUID_SYSTEM_V36195}=UUID;
const SYSTEM=Object.freeze({id:'system.generation',name:'Generation System',version:'0.44.30',authority:false,automaticGeneration:false});
const state={sequence:0,generations:[]};
function descriptor(){return {...SYSTEM,state:'READY',qualification:'UNDER_CONDITIONAL_EXPERIMENT'};}
function generator(spec={}){const id=String(spec.id||'').trim();if(!id) throw new TypeError('generator id required');return Object.freeze({id,kind:String(spec.kind||'bounded'),capabilities:Object.freeze([...(spec.capabilities||[]).map(String)]),authority:false,executes:false,persists:false});}
function admit(spec={},context={}){if(!spec||typeof spec!=='object')return {admitted:false,reason:'INVALID_SPEC'};if(context.scopeValid!==true||context.preconditionsPass!==true)return {admitted:false,reason:'CONDITIONS_NOT_MET'};if(context.authorized!==true&&spec.requiresAuthorization===true)return {admitted:false,reason:'AUTHORIZATION_REQUIRED'};return {admitted:true,authorityGranted:false};}
function generate(spec={},context={}){const a=admit(spec,context);if(!a.admitted)return {...a,generated:false};const rec=Object.freeze({id:'generation.'+(++state.sequence)+'.'+uuid(),generatorId:String(spec.generatorId||'generator.unspecified'),status:'ADMITTED_NOT_EXECUTED',generated:false,persisted:false,authorityGranted:false});state.generations.push(rec);return rec;}
function qualify(){const g=generator({id:'generator.test'}),denied=generate({generatorId:g.id},{scopeValid:false,preconditionsPass:true});if(g.authority||denied.generated!==false)return {pass:false};return {pass:true,authorityGranted:false,automaticGeneration:false};}
/* Migrated conditioned Generator fabric from terraformer.js v0.44.27. */
const TF_GENERATOR_FABRIC_V36194 = Object.freeze({
  version:"0.36.220",
  pipeline:Object.freeze(["schema","conditions","validate","generate","verify","register"]),
  authority:Object.freeze({
    generatedOutputGrantsAuthority:false,
    implicitPersistence:false,
    implicitExecution:false,
    implicitNetwork:false,
    implicitDeployment:false
  }),
  kinds:Object.freeze([
    "generator","system","window","configuration","settings","property","preference",
    "attribute","object","block","image","text","audio","video","snapshot","checkpoint",
    "registry","capability","scope","relationship","protocol","session","transfer","pool",
    "resource","project","service","product","document","event","notification","history"
  ])
});

function tfGeneratorDescriptorV36194(kind, spec={}) {
  if (!TF_GENERATOR_FABRIC_V36194.kinds.includes(kind)) throw new Error("Unknown generator kind: "+kind);
  return Object.freeze({
    id:"generator."+kind,
    kind,
    schema:spec.schema||{},
    conditions:Array.isArray(spec.conditions)?spec.conditions.slice():[],
    defaults:spec.defaults||{},
    validator:typeof spec.validator==="function"?spec.validator:null,
    producer:typeof spec.producer==="function"?spec.producer:null
  });
}

function tfConditionMatchV36194(condition, context) {
  if (!condition || typeof condition!=="object") return false;
  const value=context?.[condition.field];
  switch(condition.op||"eq"){
    case "eq": return value===condition.value;
    case "neq": return value!==condition.value;
    case "exists": return condition.value===false ? value===undefined : value!==undefined;
    case "in": return Array.isArray(condition.value)&&condition.value.includes(value);
    case "gte": return typeof value==="number"&&value>=condition.value;
    case "lte": return typeof value==="number"&&value<=condition.value;
    default: throw new Error("Unsupported generator condition");
  }
}

function tfGenerateV36194(descriptor, request={}, context={}) {
  if (!descriptor || !descriptor.kind) throw new TypeError("generator descriptor required");
  const conditions=descriptor.conditions||[];
  if (!conditions.every(c=>tfConditionMatchV36194(c,context))) {
    return {status:"condition-not-met",generated:false,kind:descriptor.kind};
  }
  const input=Object.assign({},descriptor.defaults,request);
  if (descriptor.validator && descriptor.validator(input,context)!==true) {
    return {status:"validation-failed",generated:false,kind:descriptor.kind};
  }
  const output=descriptor.producer ? descriptor.producer(input,context) : {
    kind:descriptor.kind, generated:true, specification:structuredClone(input)
  };
  return {
    status:"generated",generated:true,kind:descriptor.kind,
    output,
    authorityGranted:false,persisted:false,executed:false,networked:false,deployed:false
  };
}

function tfGeneratorGeneratorV36194(spec={}) {
  if (!spec.kind) throw new TypeError("generator kind required");
  return tfGeneratorDescriptorV36194(spec.kind,spec);
}

const TF_GENERATORS_V36194 = Object.freeze(Object.fromEntries(
  TF_GENERATOR_FABRIC_V36194.kinds.map(kind=>[kind,tfGeneratorDescriptorV36194(kind)])
));

function tfGeneratorFabricSelfTestV36194(){
  const required=["generator","system","window","configuration","settings","property","preference","attribute"];
  for(const k of required) if(!TF_GENERATORS_V36194[k]) throw new Error("missing generator: "+k);
  const g=tfGeneratorGeneratorV36194({
    kind:"system",
    conditions:[{field:"authorized",op:"eq",value:true}],
    validator:x=>typeof x.name==="string"&&x.name.length>0,
    producer:x=>({type:"system-specification",name:x.name})
  });
  const denied=tfGenerateV36194(g,{name:"Example"},{authorized:false});
  if(denied.generated) throw new Error("condition gate failed");
  const invalid=tfGenerateV36194(g,{},{authorized:true});
  if(invalid.generated) throw new Error("validation gate failed");
  const made=tfGenerateV36194(g,{name:"Example"},{authorized:true});
  if(!made.generated||made.output.name!=="Example"||made.authorityGranted||made.persisted||made.executed) throw new Error("generator boundary failed");
  const gg=tfGeneratorGeneratorV36194({kind:"window"});
  if(gg.id!=="generator.window") throw new Error("generator-generator failed");
  return {pass:true,generators:TF_GENERATOR_FABRIC_V36194.kinds.length,required:required.length,pipeline:TF_GENERATOR_FABRIC_V36194.pipeline};
}


/* Terraformer v0.44.30: Number Generator + UUID-aware Generator successor extension. */
function tfNumberGenerateV36195(spec={}){
  const crypto=require('node:crypto');
  const mode=spec.mode||'integer';
  if(mode==='sequence'){
    const start=Number.isSafeInteger(spec.start)?spec.start:0;
    const count=Number.isSafeInteger(spec.count)&&spec.count>=0?spec.count:1;
    if(count>100000) throw new RangeError('sequence too large');
    return Array.from({length:count},(_,i)=>start+i);
  }
  if(mode==='integer'){
    const min=Number.isSafeInteger(spec.min)?spec.min:0;
    const max=Number.isSafeInteger(spec.max)?spec.max:Number.MAX_SAFE_INTEGER;
    if(max<min) throw new RangeError('invalid number range');
    return crypto.randomInt(min,max===Number.MAX_SAFE_INTEGER?max:max+1);
  }
  if(mode==='deterministic'){
    const digest=crypto.createHash('sha256').update(String(spec.seed??'')).digest();
    return Number(digest.readBigUInt64BE(0)%BigInt(Number.MAX_SAFE_INTEGER));
  }
  throw new Error('unsupported number generator mode');
}
const TF_GENERATOR_KINDS_V36195=Object.freeze(Array.from(new Set([...TF_GENERATOR_FABRIC_V36194.kinds,'number','uuid'])));
const TF_GENERATORS_V36195=Object.freeze(Object.fromEntries(TF_GENERATOR_KINDS_V36195.map(kind=>{
  if(kind==='number') return [kind,Object.freeze({id:'generator.number',uuid:tfIdentityUuidV36195('generator','number'),kind})];
  if(kind==='uuid') return [kind,Object.freeze({id:'generator.uuid',uuid:tfIdentityUuidV36195('generator','uuid'),kind})];
  const prior=TF_GENERATORS_V36194[kind];
  return [kind,Object.freeze(Object.assign({},prior,{uuid:tfIdentityUuidV36195('generator',kind)}))];
})));
function tfUniversalUuidReconcileV36195(model={}){
  const out=Object.assign({},model);
  const mappings={systems:'system',capabilities:'capability',registries:'registry',relationships:'relationship',scopes:'scope',sessions:'session',transfers:'transfer',pools:'pool',snapshots:'snapshot',checkpoints:'checkpoint',objects:'object',blocks:'block',events:'event',resources:'resource'};
  for(const [field,kind] of Object.entries(mappings)) if(Array.isArray(model[field])) out[field]=tfUuidReconcileCollectionV36195(kind,model[field]);
  out.generators=Object.values(TF_GENERATORS_V36195);
  return out;
}
function tfUuidNumberSelfTestV36195(){
  if(!tfUuidValidateV36195(TF_UUID_SYSTEM_V36195.uuid)) throw new Error('UUID system identity invalid');
  const a=tfUuidGeneratorV36195({name:'system:test'}),b=tfUuidGeneratorV36195({name:'system:test'});
  if(a!==b||!tfUuidValidateV36195(a)) throw new Error('stable UUID generation failed');
  const r=tfUuidGeneratorV36195({mode:'runtime'});
  if(!tfUuidValidateV36195(r)||r===a) throw new Error('runtime UUID generation failed');
  const seq=tfNumberGenerateV36195({mode:'sequence',start:7,count:3});
  if(seq.join(',')!=='7,8,9') throw new Error('number sequence failed');
  const d1=tfNumberGenerateV36195({mode:'deterministic',seed:'terraformer'}),d2=tfNumberGenerateV36195({mode:'deterministic',seed:'terraformer'});
  if(d1!==d2) throw new Error('deterministic number failed');
  const reconciled=tfUniversalUuidReconcileV36195({systems:[{id:'system.a'}],capabilities:[{id:'cap.a'}],objects:[{id:'obj.a'}],blocks:[{id:'block.a'}],relationships:[{id:'rel.a'}],snapshots:[{id:'snap.a'}]});
  for(const field of ['systems','capabilities','objects','blocks','relationships','snapshots']) if(!tfUuidValidateV36195(reconciled[field][0].uuid)) throw new Error('universal UUID reconciliation failed: '+field);
  if(!TF_GENERATORS_V36195.number||!TF_GENERATORS_V36195.uuid) throw new Error('generators missing');
  for(const x of Object.values(TF_GENERATORS_V36195)) if(!tfUuidValidateV36195(x.uuid)) throw new Error('generator UUID missing');
  return {pass:true,uuidSystem:true,numberGenerator:true,uuidGenerator:true,generators:TF_GENERATOR_KINDS_V36195.length,stable:'UUIDv5',runtime:'UUIDv4',universalReconciliation:true};
}
const SUCCESSOR_V36195=Object.freeze({TF_GENERATOR_KINDS_V36195,TF_GENERATORS_V36195,tfNumberGenerateV36195,tfUniversalUuidReconcileV36195,tfUuidNumberSelfTestV36195});

const LEGACY=Object.freeze({TF_GENERATOR_FABRIC_V36194,TF_GENERATORS_V36194,tfGeneratorGeneratorV36194,tfGenerateV36194,tfGeneratorFabricSelfTestV36194});
function systemGeneratorDescriptor(systemId,identityFn){if(typeof identityFn!=='function')throw new TypeError('identity function required');return Object.freeze({id:'generator.'+String(systemId).slice(7),uuid:identityFn('generator',systemId),systemId,conditions:Object.freeze(['schema-valid','conditions-satisfied','scope-valid','verification-pass']),grantsAuthority:false,persists:false,executes:false,deploys:false});}
const TERRAFORMER_GENERATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-GENERATION-SYSTEM/1',id:'system.generation',name:'Generation System',family:'generation',type:'generation-system',state:'integrated',canonicalPath:'terraformer://generation/',dependsOn:Object.freeze(['system.program', 'system.resource']),governs:Object.freeze(['generation', 'specification', 'input', 'generator-reference', 'output', 'validation']),rule:'Generation System creates representations or artifacts from admitted specifications; generation does not authorize publication, execution, persistence, or external effects.'});
const {TERRAFORMER_AUTOMATOR}=require('./terraformer.automator.js');
const {TERRAFORMER_GENERATOR}=require('./terraformer.generator.js');

const TERRAFORMER_PAGE_GENERATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-PAGE-GENERATION-SYSTEM/1',id:'system.page-generation',name:'Page Generation System',family:'presentation',type:'responsive-page-generation',mode:'mobile-first',state:'integrated',generationOrder:Object.freeze(['mobile','desktop']),defaults:Object.freeze({mobile:'portrait',desktop:'landscape'}),capabilities:Object.freeze(['mobile-first','desktop-second','portrait','landscape','live-orientation','viewport-reflow','media-query','resize','rotation']),rule:'Generate mobile-first presentation constraints before desktop enhancements; active orientation follows viewport geometry and media state rather than user-agent identity.',persistence:false});
const {TERRAFORMER_ORIENTATION_SYSTEM,tfPageGenerationDescribe}=require('./terraformer.orientation.js');
Object.assign(globalThis,{TERRAFORMER_ORIENTATION_SYSTEM,tfPageGenerationDescribe});
const {TERRAFORMER_CUSTOMIZATION_SYSTEM}=require('./terraformer.customization.js');
Object.assign(globalThis,{TERRAFORMER_CUSTOMIZATION_SYSTEM});
const {TERRAFORMER_BUTTON_SYSTEM}=require('./terraformer.button.js');
Object.assign(globalThis,{TERRAFORMER_BUTTON_SYSTEM});

module.exports=Object.freeze({SYSTEM,descriptor,generator,admit,generate,qualify,LEGACY,SUCCESSOR_V36195,systemGeneratorDescriptor,TERRAFORMER_GENERATION_SYSTEM,TERRAFORMER_AUTOMATOR,TERRAFORMER_GENERATOR,TERRAFORMER_PAGE_GENERATION_SYSTEM});
