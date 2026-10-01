"use strict";
const SYSTEM=Object.freeze({
 id:"system.sftp",concept:"SFTP",type:"ssh-file-transfer-protocol-system",parent:"system.protocol",
 credentialsPresent:false,authenticationPerformed:false,socketOpened:false,connectionPerformed:false,
 fileRead:false,fileWritten:false,transferPerformed:false,remoteCommandExecuted:false,
 persistencePerformed:false,externalEffect:false,authorityGranted:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});
