"use strict";
const SYSTEM=Object.freeze({id:"system.route",concept:"Route",type:"routing-path-system",mode:"bounded-route-description",activeByDefault:false,externalTransmission:false,persistenceImplied:false,authorityGranted:false});
function describe(spec={}){return Object.freeze({system:SYSTEM.id,from:spec.from??null,to:spec.to??null,via:Object.freeze(Array.isArray(spec.via)?spec.via.slice():[]),admitted:spec.admitted===true,externalTransmission:false,persistencePerformed:false,authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,describe});
