"use strict";
const SYSTEM=Object.freeze({id:"system.construction",concept:"Construction",authorityGranted:false});
function bindConstructionV04504(){return Object.freeze({SYSTEM});}
module.exports=Object.freeze({bindConstructionV04504});

/* Terraformer v0.48.3: bridge-covered cross-owner migration. */
function tfPageConstructionLifecycleV4021({blueprint,validated=false,admitted=false,reconstruct=false,preservedState={}}={}){
 if(reconstruct){
  const rebuilt=tfReconstructPageV4021(blueprint,{admitted,preservedState});
  return admitted?tfMaterializeConstructedPageV4021(rebuilt):rebuilt;
 }
 const pre=tfPreConstructPageV4021(blueprint,{validated});
 if(!admitted)return pre;
 const built=tfConstructPageV4021(pre,{admitted});
 return built.constructed?tfMaterializeConstructedPageV4021(built):built;
}

