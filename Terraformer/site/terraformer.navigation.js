'use strict';
const fs=require('fs'),path=require('path');
const ID='system.navigation',VERSION='0.47.77',REGISTRY='terraformer.navigations.json',PRELOAD_DEPTH=2;
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY),'utf8'));if(x.systemId!==ID||x.preloadDepth!==PRELOAD_DEPTH||x.authorityGranted!==false)throw Error(ID+': registry mismatch');return Object.freeze(x);}
function normalizeEnvironment(v){if(typeof v!=='string'||!v.trim())throw Error(ID+': environment required');return v.trim().toLowerCase();}
function plan(environment,transitions,current){
 const env=normalizeEnvironment(environment);
 if(!Array.isArray(transitions))throw Error(ID+': transitions required');
 const edges=transitions.filter(x=>x&&x.environment===env&&x.admitted===true);
 const byFrom=new Map(); for(const e of edges){if(!byFrom.has(e.from))byFrom.set(e.from,[]);byFrom.get(e.from).push(e);}
 let frontier=[current],steps=[];
 for(let depth=1;depth<=PRELOAD_DEPTH;depth++){
   const next=[];const prepared=[];
   for(const from of frontier)for(const e of (byFrom.get(from)||[])){
     if(e.authorityGranted===true||e.blocked===true)continue;
     prepared.push(Object.freeze({from:e.from,to:e.to,environment:env,depth,prepared:true,executed:false,authorityGranted:false}));
     next.push(e.to);
   }
   steps.push(Object.freeze(prepared));frontier=next;
 }
 return Object.freeze({environment:env,current,preloadDepth:PRELOAD_DEPTH,steps:Object.freeze(steps),executed:false,mutationPerformed:false,persistencePerformed:false,authorityGranted:false});
}
function qualify(){const p=plan('research',[{environment:'research',from:'a',to:'b',admitted:true},{environment:'research',from:'b',to:'c',admitted:true},{environment:'research',from:'c',to:'d',admitted:true}], 'a');return Object.freeze({pass:p.steps.length===2&&p.steps[0][0].to==='b'&&p.steps[1][0].to==='c'&&!p.executed&&!p.authorityGranted,id:ID});}
const SYSTEM=Object.freeze({id:ID,concept:'Navigation',type:'navigation-system',preloadDepth:PRELOAD_DEPTH,environmentScoped:true,planOnly:true,mutationPerformed:false,persistencePerformed:false,externalEffect:false,authorityGranted:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});
module.exports=Object.freeze({ID,VERSION,REGISTRY,PRELOAD_DEPTH,SYSTEM,registry,normalizeEnvironment,plan,qualify});
