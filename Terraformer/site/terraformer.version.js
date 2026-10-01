"use strict";
const SYSTEM=Object.freeze({id:"system.version",concept:"Version",authorityGranted:false,scaffold:true});
function bindVersionV04509(){return Object.freeze({SYSTEM});}
module.exports=Object.freeze({bindVersionV04509});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfVersionV36448(owner,{fromVersion="",toVersion="",reason="",evidence=[]}={}){const id=String(owner?.id??owner??"").trim(),from=String(fromVersion).trim(),to=String(toVersion).trim(),why=String(reason).trim();if(!id||!from||!to||!why)throw new Error("[TF:system.versioning:invalid-input] owner, fromVersion, toVersion and reason required.");if(from===to)throw new Error("[TF:system.versioning:no-transition] Successor version must differ from origin.");return Object.freeze({id:id+"::version::"+to,owner:id,system:"system.versioning",versioner:"system.versioner",origin:from,successor:to,reason:why,evidence:Object.freeze([...evidence]),originPreserved:true,state:"versioned",...TF_VERSIONING_BOUNDARY_V36448});}

function tfTransversionV36448(owner,{fromVersion="",toVersion="",reason="",transition="",evidence=[],qualification="Unverified"}={}){const base=tfVersionV36448(owner,{fromVersion,toVersion,reason,evidence}),kind=String(transition).trim();if(!kind)throw new Error("[TF:system.transversioning:invalid-input] Material transition classification required.");return Object.freeze({...base,id:base.owner+"::transversion::"+base.successor,system:"system.transversioning",versioner:undefined,transversioner:"system.transversioner",transition:kind,qualification:String(qualification||"Unverified"),originPreserved:true,state:"transversioned",...TF_VERSIONING_BOUNDARY_V36448});}

