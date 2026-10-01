'use strict';
const TERRAFORMER_GOOGLE_SYSTEM=Object.freeze({schema:'TERRAFORMER-PLATFORM-FAMILY-SYSTEM/1',id:'system.google',name:'Google System',uriRoot:'google',children:Object.freeze(['system.app.android']),type:'vendor-family-taxonomy',authority:'classification/navigation only'});
const TERRAFORMER_URI_PLATFORM_ROOTS=Object.freeze({microsoft:Object.freeze({system:'system.microsoft',children:Object.freeze({windows:'system.platform.windows'})}),apple:Object.freeze({system:'system.apple',children:Object.freeze({macos:'system.platform.macos',ios:'system.app.ios',ipados:'system.app.ios'})}),linux:Object.freeze({system:'system.linux',children:Object.freeze({debian:'system.platform.debian',fedora:'system.platform.fedora'})}),google:Object.freeze({system:'system.google',children:Object.freeze({android:'system.app.android'})})});

module.exports=Object.freeze({TERRAFORMER_GOOGLE_SYSTEM,TERRAFORMER_URI_PLATFORM_ROOTS});
