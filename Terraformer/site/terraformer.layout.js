"use strict";
function bindDesktopPlusLayoutV04617(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.373: Desktop Plus Layout / Center-Line Boundary Fabric === */
const TF_DESKTOP_PLUS_LAYOUT_SYSTEMS_V36373=Object.freeze([{"id":"system.plus-layout","concept":"Plus Layout","type":"center-cross-layout-system"},{"id":"system.banner","concept":"Banner","type":"desktop-boundary-banner-system"},{"id":"system.bar","concept":"Bar","type":"desktop-boundary-bar-system"},{"id":"system.center","concept":"Center","type":"geometric-center-system"},{"id":"system.geometry","concept":"Geometry","type":"spatial-geometry-system"},{"id":"system.horizon","concept":"Horizon","type":"horizontal-center-axis-system"}]);

const TF_DESKTOP_PLUS_LAYOUT_RELATIONSHIPS_V36373=Object.freeze([
 Object.freeze({from:"system.plus-layout",relation:"is-a",to:"system.layout"}),
 Object.freeze({from:"system.plus-layout",relation:"uses",to:"system.line"}),
 Object.freeze({from:"system.plus-layout",relation:"uses",to:"system.center"}),
 Object.freeze({from:"system.plus-layout",relation:"uses",to:"system.geometry"}),
 Object.freeze({from:"system.horizon",relation:"is-a",to:"system.line"}),
 Object.freeze({from:"system.desktop",relation:"may-use",to:"system.plus-layout"}),
 Object.freeze({from:"system.banner",relation:"may-bound",to:"system.plus-layout"}),
 Object.freeze({from:"system.bar",relation:"may-bound",to:"system.plus-layout"})
]);
const TF_DESKTOP_PLUS_LAYOUT_SCHEMA_V36373=Object.freeze({schema:"TERRAFORMER-DESKTOP-PLUS-LAYOUT/1",backgroundMost:true,
 centerArea:true,axesVisible:false,exactCenter:true,clipToUsableCenter:true,crossChrome:false,volatile:true,externalEffect:false,authorityAmplification:false});
function tfDesktopPlusLayoutV36373(rect,bounds={}){
 const x=Number(rect?.x??0),y=Number(rect?.y??0),width=Math.max(0,Number(rect?.width??0)),height=Math.max(0,Number(rect?.height??0));
 const top=Math.max(0,Number(bounds.top??0)),bottom=Math.max(0,Number(bounds.bottom??0)),left=Math.max(0,Number(bounds.left??0)),right=Math.max(0,Number(bounds.right??0));
 const area=Object.freeze({x:x+left,y:y+top,width:Math.max(0,width-left-right),height:Math.max(0,height-top-bottom)});
 const cx=area.x+area.width/2,cy=area.y+area.height/2;
 return Object.freeze({system:"system.plus-layout",desktop:"system.desktop",area,center:Object.freeze({x:cx,y:cy}),
  vertical:Object.freeze({system:"system.line",orientation:"vertical",visible:false,x:cx,y1:area.y,y2:area.y+area.height,terminatesAt:"banner-or-bar-boundary"}),
  horizontal:Object.freeze({system:"system.horizon",lineSystem:"system.line",orientation:"horizontal",visible:false,y:cy,x1:area.x,x2:area.x+area.width,terminatesAt:"banner-or-bar-boundary"}),
  quadrants:Object.freeze(["top-left","top-right","bottom-left","bottom-right"]),...TF_DESKTOP_PLUS_LAYOUT_SCHEMA_V36373});
}
function tfDesktopPlusLayoutSelfTestV36373(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_DESKTOP_PLUS_LAYOUT_SYSTEMS_V36373.map(x=>x.id);
 for(const id of [...added,"system.line","system.layout","system.desktop","system.window","system.presentation"])if(!ids.has(id))missing.push(id);
 const p=tfDesktopPlusLayoutV36373({x:0,y:0,width:1600,height:900},{top:40,bottom:40,left:20,right:20});
 if(p.center.x!==800||p.center.y!==450||p.vertical.x!==800||p.horizontal.y!==450||p.vertical.visible||p.horizontal.visible||p.area.x!==20||p.area.y!==40||p.area.width!==1560||p.area.height!==820||p.vertical.y1!==40||p.vertical.y2!==860||p.horizontal.x1!==20||p.horizontal.x2!==1580||p.crossChrome)missing.push("geometry");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Desktop Plus Layout qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:6,lineReused:true,layoutReused:true,desktopReused:true,plusLayout:true,invisibleVerticalCenterLine:true,invisibleHorizontalCenterLine:true,
  exactCenter:true,centerAreaClipped:true,terminatesAtBannerOrBar:true,crossesChrome:false,quadrants:4,systemsWithEngines:6,systemsWithServices:6,systemsInCompactSeed:6,systemsWithActiveSummaries:6,missing:0});
}
globalThis.TF_DESKTOP_PLUS_LAYOUT_SYSTEMS_V36373=TF_DESKTOP_PLUS_LAYOUT_SYSTEMS_V36373;
globalThis.TF_DESKTOP_PLUS_LAYOUT_RELATIONSHIPS_V36373=TF_DESKTOP_PLUS_LAYOUT_RELATIONSHIPS_V36373;
globalThis.TF_DESKTOP_PLUS_LAYOUT_SCHEMA_V36373=TF_DESKTOP_PLUS_LAYOUT_SCHEMA_V36373;
globalThis.tfDesktopPlusLayoutV36373=tfDesktopPlusLayoutV36373;
 return Object.freeze({TF_DESKTOP_PLUS_LAYOUT_SYSTEMS_V36373,TF_DESKTOP_PLUS_LAYOUT_RELATIONSHIPS_V36373,TF_DESKTOP_PLUS_LAYOUT_SCHEMA_V36373,tfDesktopPlusLayoutV36373,tfDesktopPlusLayoutSelfTestV36373});
}
const TERRAFORMER_LAYOUT_SYSTEM=Object.freeze({schema:'TERRAFORMER-LAYOUT-SYSTEM/1',id:'system.layout',name:'Layout System',family:'presentation',type:'system',state:'integrated',canonicalPath:'terraformer://presentation/layout/',governs:Object.freeze(['geometry','flow','alignment','bounds','placement','safe-area'])});

const FOREGROUND_LAYOUTS=Object.freeze({owner:"system.foreground",planes:Object.freeze(["BACKGROUND_LAYOUT","FOREGROUND_LAYOUT"]),nested:true,visualOnly:true});
module.exports=Object.freeze({FOREGROUND_LAYOUTS,bindDesktopPlusLayoutV04617,TERRAFORMER_LAYOUT_SYSTEM});
