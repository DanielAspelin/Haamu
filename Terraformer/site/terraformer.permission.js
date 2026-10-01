"use strict";
/* Candidate physicalization of an already-evidenced identity; not yet canonical responsibility ownership. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CANDIDATE-PHYSICALIZATION/1",id:"system.permission",concept:"Permission",
 typeOf:"system.candidate",origin:"terraformer.system.js",
 establishedType:"system-architecture-primitive",establishedFamily:null,
 qualification:"UNVERIFIED",canonicalResponsibility:false,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfUniversalPermissionFabricV36420(sourceText){const ids=tfCanonicalSystemIdsV36196(sourceText);const permissions=ids.map((owner,index)=>Object.freeze({owner,permission:owner+"::permission",perimeter:owner+"::permission::perimeter",number:index+1,authority:"system.permission",perimeterAuthority:"system.perimeter",authorizationAuthority:"system.authorization",accessAuthority:"system.access",visibilityAuthority:"system.visibility",protectionAuthority:"system.protection",grants:Object.freeze([]),denies:Object.freeze([]),...TF_PERMISSION_DEFAULTS_V36420}));return Object.freeze({system:"system.permission",version:"0.36.420",systems:ids.length,permissions:Object.freeze(permissions),onePermissionPerSystem:permissions.length===ids.length,onePerimeterPerPermission:true,defaults:TF_PERMISSION_DEFAULTS_V36420,relationships:TF_PERMISSION_PERIMETER_RELATIONSHIPS_V36420});}

function tfSystemPermissionV36420(sourceText,systemId){const fabric=tfUniversalPermissionFabricV36420(sourceText),x=fabric.permissions.find(p=>p.owner===String(systemId));if(!x)throw new Error("[TF:system.permission:unknown-system] canonical System required.");return x;}

function tfUniversalPermissionSelfTestV36420(sourceText){const ids=tfCanonicalSystemIdsV36196(sourceText),f=tfUniversalPermissionFabricV36420(sourceText),missing=[];if(!ids.includes("system.permission"))missing.push("permission");if(!ids.includes("system.perimeter"))missing.push("perimeter");if(f.permissions.length!==ids.length)missing.push("coverage");if(new Set(f.permissions.map(x=>x.permission)).size!==ids.length)missing.push("permission-uniqueness");if(new Set(f.permissions.map(x=>x.perimeter)).size!==ids.length)missing.push("perimeter-uniqueness");for(const p of f.permissions){if(p.automaticGrant||p.automaticAuthorization||p.automaticExecution||p.automaticPersistence||p.automaticNetworkAccess||p.automaticExternalAccess||p.externalEffect||p.authorityAmplification)missing.push("boundary");if(p.grants.length||p.denies.length)missing.push("implicit-policy");}const n=ids.length;if(tfUniversalEngineFabricV36349(sourceText).engines.length!==n||tfCompactSystemSeedV36353(sourceText).entries.length!==n||tfUniversalSystemLayerFabricV36389(sourceText).layers!==n||tfUniversalSystemDefaultsFabricV36388(sourceText).defaults!==n||tfUniversalSpecificationFabricV36397(sourceText).specifications!==n||tfUniversalReferenceFabricV36396(sourceText).references!==n||tfUniversalProcessCycleFabricV36395(sourceText).processes!==n)missing.push("universal-fabric");if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Universal permission fabric failed: "+[...new Set(missing)].join(","));return Object.freeze({pass:true,newSystems:0,permissionReused:true,perimeterReused:true,systemsCovered:n,permissions:n,perimeters:n,leastPrivilege:true,automaticGrant:false,missing:0});}

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_PERMISSION_DEFAULTS_V36420=Object.freeze({principle:"least-privilege",visibility:"private",mode:"inert-by-default",automaticGrant:false,automaticAuthorization:false,automaticExecution:false,automaticPersistence:false,automaticNetworkAccess:false,automaticExternalAccess:false,externalEffect:false,authorityAmplification:false});
