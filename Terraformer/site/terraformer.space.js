"use strict";
function bindSpaceV04462(){const SPACE_SYSTEM=Object.freeze({schema:"TERRAFORMER-SPACE/1",id:"system.space",mode:"bounded-space-definition",authorityGranted:false});return Object.freeze({SPACE_SYSTEM});}module.exports={bindSpaceV04462};

const TERRAFORMER_SPACE_SYSTEM=Object.freeze({schema:'TERRAFORMER-SPACE-SYSTEM/1',id:'system.space',name:'Space System',family:'spatial',type:'system',state:'integrated',canonicalPath:'terraformer://space/',governs:Object.freeze(['position','extent','dimension','region','coordinate','relationship']),rule:'Space System represents spatial structure and coordinates; it does not claim physical control of represented space.'});
const TERRAFORMER_SCALE_TIME_SPACE_RELATIONSHIPS=Object.freeze({schema:'TERRAFORMER-SCALE-TIME-SPACE-RELATIONSHIPS/1',relations:Object.freeze([['system.micro','contains','system.nano'],['system.clock','depends-on','system.time'],['system.time','orders','event'],['system.space','locates','entity'],['system.map','projects','system.space']])});

Object.assign(module.exports,{TERRAFORMER_SPACE_SYSTEM,TERRAFORMER_SCALE_TIME_SPACE_RELATIONSHIPS});
