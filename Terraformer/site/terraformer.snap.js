'use strict';
const TERRAFORMER_SNAP_SYSTEM=Object.freeze({schema:'TERRAFORMER-PRESENTATION-SYSTEM/1',id:'system.snap',name:'Snap System',parent:'system.customization',family:'presentation',input:'window/control geometry + snap intent',output:'bounded aligned geometry',capabilities:Object.freeze(['edge','corner','half','grid','restore-geometry','safe-area']),authority:'geometry-only',grid:'system.grid.presentation'});

module.exports=Object.freeze({TERRAFORMER_SNAP_SYSTEM});
