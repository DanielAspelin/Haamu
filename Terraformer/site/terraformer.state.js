'use strict';
const fs=require('fs'),path=require('path');
const ID='system.state',VERSION='0.44.15',BOUNDARY='DIMENSION_BOUNDARY',DIMENSION='STATE',REGISTRY_FILE='terraformer.states.json';
const ALIASES=Object.freeze(['STATE']);
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY_FILE),'utf8'));if(x.kind!=='STATE_REGISTRY'||x.owner!==ID||x.authority!==false||!Array.isArray(x.entries))throw Error(ID+': registry mismatch');return x;}
function normalize(value){if(typeof value!=='string'||!value.trim())throw Error(ID+': invalid value');return value.trim().toUpperCase();}
function resolve(value){const v=normalize(value),r=registry(),e=r.entries.find(x=>x.id===v||(x.aliases||[]).includes(v));if(!e)throw Error(ID+': unknown '+DIMENSION.toLowerCase());return Object.freeze({...e,authority:false});}
function validate(value){const e=resolve(value);return Object.freeze({dimension:DIMENSION,value:e.id,valid:true,authority:false});}
function select(consumer,value){if(!consumer||typeof consumer!=='object'||typeof consumer.id!=='string'||!consumer.id.trim())throw Error(ID+': invalid consumer');const kind=normalize(consumer.kind);const r=registry();if(!r.eligibleConsumers.includes(kind))throw Error(ID+': ineligible consumer');const e=resolve(value);if(!e.applicability.includes(kind))throw Error(ID+': value not applicable');return Object.freeze({consumer:Object.freeze({id:consumer.id,kind}),dimension:DIMENSION,value:e.id,scoped:true,authority:false,mutatesRegistry:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,dimension:DIMENSION,registry:REGISTRY_FILE,selectionModel:'DEFINE_CENTRALLY_SELECT_LOCALLY',controller:ID+'.controller',adapter:ID+'.adapter',bridge:ID+'.bridge',authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function qualify(){const r=registry(),q=select({id:'qualification.sample',kind:'SYSTEM'},r.entries[0].id);return Object.freeze({pass:q.scoped&&q.authority===false&&!q.mutatesRegistry,id:ID,dimension:DIMENSION});}
/* === Terraformer v0.40.59 — Universal Availability / Occupation State Contract === */
const TF_UNIVERSAL_STATE_CONTRACT_V4059=Object.freeze({
 version:"0.40.59",appliesTo:"every-canonical-system",
 dimensions:Object.freeze(["availability","occupation"]),
 availabilitySystem:"system.availability",occupationSystem:"system.occupation",
 invariants:Object.freeze([
  "every-canonical-system-can-state-availability",
  "every-canonical-system-can-state-occupation",
  "availability-and-occupation-remain-independent",
  "missing-observation-yields-unknown",
  "state-statement-carries-observation-and-freshness",
  "state-statement-does-not-grant-authority-or-permission"
 ])
});
function tfSystemStateV4059(systemId,{availability=null,occupation=null,observedAt=null,freshUntil=null,source="unknown"}={}){
 if(!String(systemId).startsWith("system."))throw new TypeError("canonical system id required");
 const av=availability&&availability.state?String(availability.state):"UNKNOWN";
 const oc=occupation&&occupation.state?String(occupation.state):"UNKNOWN";
 return Object.freeze({systemId:String(systemId),
  availability:Object.freeze({state:av,detail:availability||null}),
  occupation:Object.freeze({state:oc,detail:occupation||null}),
  observedAt,freshUntil,source:String(source),authority:false,permission:false});
}
function tfSystemStateCurrentV4059(statement,now=new Date()){
 if(!statement)return Object.freeze({current:false,availability:"UNKNOWN",occupation:"UNKNOWN",reason:"no-statement"});
 const t=now instanceof Date?now.getTime():Date.parse(now);
 if(statement.freshUntil&&t>Date.parse(statement.freshUntil))
  return Object.freeze({...statement,current:false,
   availability:Object.freeze({state:"UNKNOWN",detail:statement.availability}),
   occupation:Object.freeze({state:"UNKNOWN",detail:statement.occupation}),reason:"stale"});
 return Object.freeze({...statement,current:true,reason:"current"});
}
function tfUniversalStateProjectionV4059(systemIds=[]){
 const ids=[...new Set(systemIds.map(String).filter(x=>x.startsWith("system.")))];
 return Object.freeze(ids.map(id=>tfSystemStateV4059(id)));
}
function tfUniversalStateCoverageV4059(systemIds=[]){
 const projected=tfUniversalStateProjectionV4059(systemIds);
 const bad=projected.filter(x=>!x.availability||!x.occupation);
 return Object.freeze({systems:projected.length,covered:projected.length-bad.length,
  missing:bad.length,complete:bad.length===0,states:projected});
}
function tfUniversalStateQualificationV4059(){
 const f=[],ids=["system.io","system.language","system.availability","system.occupation","system.idle"];
 const c=tfUniversalStateCoverageV4059(ids);
 if(!c.complete||c.covered!==ids.length)f.push("coverage");
 if(c.states.some(x=>x.availability.state!=="UNKNOWN"||x.occupation.state!=="UNKNOWN"))f.push("unknown-default");
 const s=tfSystemStateV4059("system.io",{availability:{state:"AVAILABLE"},occupation:{state:"MODERATE"},
  observedAt:"2026-09-27T00:00:00Z",freshUntil:"2026-09-28T00:00:00Z",source:"qualification"});
 if(s.availability.state!=="AVAILABLE"||s.occupation.state!=="MODERATE")f.push("independent-state");
 if(s.authority||s.permission)f.push("authority");
 const stale=tfSystemStateCurrentV4059(s,"2026-09-29T00:00:00Z");
 if(stale.current||stale.availability.state!=="UNKNOWN"||stale.occupation.state!=="UNKNOWN")f.push("freshness");
 if(f.length)throw Error("Universal state contract qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.59",universalAvailability:true,universalOccupation:true,
  independentDimensions:true,unknownDefault:true,freshnessAware:true,nonAuthorizing:true});
}

const TERRAFORMER_STATE_SYSTEM=Object.freeze({schema:'TERRAFORMER-STATE-SYSTEM/1',id:'system.state',name:'State System',family:'state',type:'state-system',state:'integrated',canonicalPath:'terraformer://state/',governs:Object.freeze(['state','transition','previous','current','next','evidence']),rule:'State System represents observed or admitted state and transitions; representation does not itself cause an external state change.'});

module.exports=Object.freeze({ID,VERSION,BOUNDARY,DIMENSION,REGISTRY_FILE,ALIASES,registry,normalize,resolve,validate,select,descriptor,qualify,TF_UNIVERSAL_STATE_CONTRACT_V4059,tfSystemStateV4059,tfSystemStateCurrentV4059,tfUniversalStateProjectionV4059,tfUniversalStateCoverageV4059,tfUniversalStateQualificationV4059,TERRAFORMER_STATE_SYSTEM});
