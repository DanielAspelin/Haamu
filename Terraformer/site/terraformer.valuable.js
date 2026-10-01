'use strict';
const DESCRIPTOR=Object.freeze({
 schema:'TERRAFORMER-VALUABLE-SYSTEM/1',id:'system.valuable',name:'Valuable System',
 typeOf:'system.system',registry:'terraformer.valuables.json',
 authorityGranted:false,ownershipGranted:false,financialWorthImplied:false,priorityGranted:false
});
function classify(subject,criteria,evidence=[],qualification='UNVERIFIED'){
 if(typeof subject!=='string'||!subject.trim())throw Error('valuable: subject required');
 if(typeof criteria!=='string'||!criteria.trim())throw Error('valuable: criteria required');
 if(!Array.isArray(evidence))throw Error('valuable: evidence must be an array');
 return Object.freeze({schema:'TERRAFORMER-VALUABLE/1',subject,criteria,
  evidence:Object.freeze([...evidence]),qualification,
  valuable:true,authorityGranted:false,ownershipGranted:false,financialWorthImplied:false});
}
function validate(v){return !!v&&v.schema==='TERRAFORMER-VALUABLE/1'&&v.valuable===true&&v.authorityGranted===false;}
module.exports=Object.freeze({DESCRIPTOR,classify,validate});
