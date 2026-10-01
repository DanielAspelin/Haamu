"use strict";
const fs=require("fs"),path=require("path");
const ID="system.scalability",VERSION="0.47.85",DIMENSION="SCALABILITY",REGISTRY="terraformer.scalabilities.json";
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY),"utf8"));if(x.owner!==ID||x.authority!==false)throw Error("SCALABILITY_REGISTRY_INVALID");return Object.freeze(x);}
function assess(spec={}){
 const current=Number(spec.current??0),target=Number(spec.target??current);
 if(!Number.isFinite(current)||!Number.isFinite(target)||current<0||target<0)throw Error("SCALABILITY_VALUE_INVALID");
 return Object.freeze({dimension:DIMENSION,current,target,scalar:target-current,direction:target>current?"UP":target<current?"DOWN":"STABLE",
 planOnly:true,scalingPerformed:false,authorityGranted:false,qualificationGranted:false});
}
function descriptor(){return Object.freeze({id:ID,version:VERSION,dimension:DIMENSION,typeOf:"system.dimension",uses:"system.scalar",authority:false,qualification:"UNDER_CONDITIONAL_EXPERIMENT"});}
module.exports=Object.freeze({ID,VERSION,DIMENSION,REGISTRY,registry,assess,descriptor});
