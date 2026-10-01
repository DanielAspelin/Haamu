'use strict';
const TERRAFORMER_BASH_SYSTEM=Object.freeze({schema:'TERRAFORMER-BASH-SYSTEM/1',id:'system.bash',name:'Bash System',family:'runtime',type:'generated-shell-plane',mode:'volatile-stdin',condition:'platform-dependent',state:'subordinate',input:'generated Bash source in volatile memory',output:'captured stdout/stderr/result',authority:'Terraformer Boundary -> JavaScript System -> Node.js System -> Bash System',generation:'memory',transport:'stdin',persistentScript:false,persistence:false});

module.exports=Object.freeze({TERRAFORMER_BASH_SYSTEM});
