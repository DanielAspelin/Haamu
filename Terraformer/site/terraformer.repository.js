"use strict";
const REPOSITORY=Object.freeze({schema:"TERRAFORMER-REPOSITORY/1",id:"system.repository",concept:"Repository",typeOf:"System",
 responsibility:"Represent governed repository identity, provenance and delivery context without embedding credentials or granting remote authorization.",registry:"terraformer.repositories.json",authorityGranted:false,automaticExecution:false,qualification:"UNDER_CONDITIONAL_EXPERIMENT"});
function validate(x=REPOSITORY){return !!x&&x.id==="system.repository"&&x.authorityGranted===false;}
module.exports=Object.freeze({REPOSITORY,describe:()=>REPOSITORY,validate});
