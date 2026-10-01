'use strict';
const TERRAFORMER_PRESENTATION_GRID_SYSTEM=Object.freeze({schema:'TERRAFORMER-PRESENTATION-GRID-SYSTEM/1',id:'system.grid.presentation',name:'Presentation Grid System',parent:'system.customization',family:'presentation',input:'viewport/layout geometry',output:'presentation cells/guides',capabilities:Object.freeze(['row','column','cell','guide','gutter','alignment','snap-target']),authority:'presentation geometry only',distinctFrom:'system.grid',rule:'Presentation Grid System does not replace or inherit authority from the structural Grid System.'});

module.exports=Object.freeze({TERRAFORMER_PRESENTATION_GRID_SYSTEM});
