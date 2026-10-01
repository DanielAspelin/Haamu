"use strict";
function bindHostPrivilegeV04552(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.312: Host Privilege Detection / Credentialless Login Boundary === */
const TF_PRIVILEGE_SYSTEM_V36312=Object.freeze([
 Object.freeze({id:"system.privilege",concept:"Privilege",type:"security-context-system",mode:"read-only-effective-process-authority-detection",condition:"running-process-context-available",state:"ready"})
]);
const TF_PRIVILEGE_RELATIONSHIPS_V36312=Object.freeze([
 Object.freeze({from:"system.node",relation:"has-context",to:"system.privilege"}),
 Object.freeze({from:"system.login",relation:"observes",to:"system.privilege"}),
 Object.freeze({from:"system.authorization",relation:"observes",to:"system.privilege"}),
 Object.freeze({from:"system.privilege",relation:"distinct-from",to:"system.authentication"}),
 Object.freeze({from:"system.privilege",relation:"distinct-from",to:"system.identity"})
]);
function tfHostPrivilegeV36312(env=process.env,nodeProcess=process){
 const uid=typeof nodeProcess.getuid==="function"?nodeProcess.getuid():null;
 const euid=typeof nodeProcess.geteuid==="function"?nodeProcess.geteuid():uid;
 const sudoEvidence=!!(env&&((env.SUDO_UID!=null&&env.SUDO_UID!=="")||(env.SUDO_USER!=null&&env.SUDO_USER!=="")));
 const effectiveRoot=euid===0;
 return Object.freeze({system:"system.privilege",platform:String(nodeProcess.platform||process.platform),
  uid,euid,effectiveRoot,sudoEvidence,administrative:effectiveRoot,
  provenance:effectiveRoot?(sudoEvidence?"effective-root-with-sudo-evidence":"effective-root"):(euid==null?"uid-api-unavailable":"non-root"),
  passwordRequested:false,passwordCaptured:false,credentialPrompt:false,elevationAttempted:false,
  privilegeMutation:false,authorityGranted:false});
}
function tfCredentiallessLoginBoundaryV36312(spec={}){
 const privilege=spec.privilege||tfHostPrivilegeV36312();
 return Object.freeze({system:"system.login",loginIdentitySeparate:true,authenticationSeparate:true,
  machineCredentialRequired:false,machinePasswordRequested:false,hostPrivilegeObserved:true,
  administrative:privilege.administrative===true,elevationAttempted:false,authorityGranted:false});
}
function tfHostPrivilegeSelfTestV36312(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.privilege","system.login","system.authentication","system.authorization","system.node","system.user","system.identity"])if(!ids.has(id))missing.push(id);
 const root=tfHostPrivilegeV36312({SUDO_UID:"1000",SUDO_USER:"tester"},{platform:"linux",getuid:()=>0,geteuid:()=>0});
 const user=tfHostPrivilegeV36312({},{platform:"linux",getuid:()=>1000,geteuid:()=>1000});
 const noUid=tfHostPrivilegeV36312({},{platform:"win32"});
 const login=tfCredentiallessLoginBoundaryV36312({privilege:root});
 if(!root.administrative||!root.sudoEvidence||user.administrative||noUid.administrative||login.machineCredentialRequired||
    login.machinePasswordRequested||root.passwordRequested||root.elevationAttempted||root.privilegeMutation)missing.push("privilege-boundary");
 if(missing.length)throw new Error("host privilege qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:1,loginReused:true,privilege:true,euidRootAuthoritative:true,sudoEvidenceProvenanceOnly:true,
  machineCredentialsNotRequested:true,noElevationAttempt:true,readOnlyDetection:true,executionPerformed:false,mutationPerformed:false,
  authorityAmplification:false,missing:0});
}
/* === Terraformer v0.36.313: Cross-Platform Host Privilege Detection === */
function tfWindowsPrivilegeProbeV36313(execFileSyncFn){
 const run=typeof execFileSyncFn==="function"?execFileSyncFn:require("child_process").execFileSync;
 try{
  const out=String(run("whoami",["/groups"],{encoding:"utf8",windowsHide:true,stdio:["ignore","pipe","ignore"],timeout:3000}));
  const adminGroup=/S-1-5-32-544/i.test(out);
  const highIntegrity=/S-1-16-(12288|16384)/i.test(out);
  return Object.freeze({available:true,administratorsGroup:adminGroup,highIntegrity,
    administrative:adminGroup&&highIntegrity,probe:"whoami-groups",credentialPrompt:false,elevationAttempted:false});
 }catch(_){
  return Object.freeze({available:false,administratorsGroup:false,highIntegrity:false,administrative:false,
    probe:"unavailable",credentialPrompt:false,elevationAttempted:false});
 }
}
function tfCrossPlatformPrivilegeV36313(options={}){
 const p=options.nodeProcess||process, env=options.env||p.env||process.env, platform=String(options.platform||p.platform||process.platform);
 if(platform==="win32"){
  const w=tfWindowsPrivilegeProbeV36313(options.execFileSync);
  return Object.freeze({system:"system.privilege",platform,administrative:w.administrative,
   provenance:w.probe,administratorsGroup:w.administratorsGroup,highIntegrity:w.highIntegrity,
   passwordRequested:false,passwordCaptured:false,credentialPrompt:false,elevationAttempted:false,
   privilegeMutation:false,authorityGranted:false});
 }
 const uid=typeof p.getuid==="function"?p.getuid():null;
 const euid=typeof p.geteuid==="function"?p.geteuid():uid;
 const sudoEvidence=!!(env&&((env.SUDO_UID!=null&&env.SUDO_UID!=="")||(env.SUDO_USER!=null&&env.SUDO_USER!=="")));
 const effectiveRoot=euid===0;
 return Object.freeze({system:"system.privilege",platform,uid,euid,effectiveRoot,sudoEvidence,
  administrative:effectiveRoot,provenance:effectiveRoot?(sudoEvidence?"effective-root-with-sudo-evidence":"effective-root"):(euid==null?"uid-api-unavailable":"non-root"),
  passwordRequested:false,passwordCaptured:false,credentialPrompt:false,elevationAttempted:false,
  privilegeMutation:false,authorityGranted:false});
}
function tfCrossPlatformPrivilegeSelfTestV36313(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.privilege","system.login","system.authentication","system.authorization","system.node","system.identity"])if(!ids.has(id))missing.push(id);
 const linux=tfCrossPlatformPrivilegeV36313({platform:"linux",env:{SUDO_UID:"1000"},nodeProcess:{platform:"linux",getuid:()=>0,geteuid:()=>0}});
 const mac=tfCrossPlatformPrivilegeV36313({platform:"darwin",env:{},nodeProcess:{platform:"darwin",getuid:()=>501,geteuid:()=>0}});
 const win=tfCrossPlatformPrivilegeV36313({platform:"win32",nodeProcess:{platform:"win32",env:{}},execFileSync:()=>[
  "BUILTIN\\Administrators","S-1-5-32-544","Enabled group","High Mandatory Level","S-1-16-12288"].join("\n")});
 const winUser=tfCrossPlatformPrivilegeV36313({platform:"win32",nodeProcess:{platform:"win32",env:{}},execFileSync:()=>[
  "BUILTIN\\Users","S-1-5-32-545","Medium Mandatory Level","S-1-16-8192"].join("\n")});
 if(!linux.administrative||!mac.administrative||!win.administrative||winUser.administrative||
    linux.passwordRequested||mac.credentialPrompt||win.elevationAttempted||win.privilegeMutation)missing.push("cross-platform-boundary");
 if(missing.length)throw new Error("cross-platform privilege qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:0,privilegeSystemReused:true,linux:true,macOS:true,windows:true,
  posixEffectiveUid:true,windowsTokenGroupProbe:true,windowsHighIntegrityRequired:true,
  machineCredentialsNotRequested:true,uacElevationNotAttempted:true,readOnlyDetection:true,
  executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_PRIVILEGE_SYSTEM_V36312,TF_PRIVILEGE_RELATIONSHIPS_V36312,tfHostPrivilegeV36312,tfCredentiallessLoginBoundaryV36312,tfHostPrivilegeSelfTestV36312,tfWindowsPrivilegeProbeV36313,tfCrossPlatformPrivilegeV36313,tfCrossPlatformPrivilegeSelfTestV36313});
}
module.exports=Object.freeze({bindHostPrivilegeV04552});

/* Terraformer v0.48.5: static declaration migrated from terraformer.temporary.js. */
const TF_PRIVILEGE_TTL_MS=120000;
