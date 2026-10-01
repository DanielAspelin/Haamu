'use strict';
const SYSTEM=Object.freeze({id:'system.composition',boundary:'COMPOSITION_BOUNDARY',authorityGranted:false,scaffold:false});
function descriptor(){return SYSTEM;}
/* === Terraformer v0.40.12 — Mobile Viewport / HTML-CSS Composition Foundation === */
const TF_MOBILE_COMPOSITION_SYSTEMS_V4012=Object.freeze([
 Object.freeze({id:"system.viewport",worker:"system.viewporter",family:"layout",purpose:"viewport measurement, constraints and presentation context"}),
 Object.freeze({id:"system.footer",worker:"system.footer-worker",family:"semantic-html",purpose:"footer semantic composition"}),
 Object.freeze({id:"system.footage",worker:"system.footager",family:"content",purpose:"governed visual/motion footage composition"}),
 Object.freeze({id:"system.heading",worker:"system.heading-worker",family:"semantic-html",purpose:"heading hierarchy composition"}),
 Object.freeze({id:"system.bar",worker:"system.bar-worker",family:"layout",purpose:"canonical bar composition with positional variants"}),
 Object.freeze({id:"system.sizing",worker:"system.sizer",family:"geometry",purpose:"size constraints and measurement"}),
 Object.freeze({id:"system.resizing",worker:"system.resizer",family:"geometry",purpose:"governed size transition"}),
 Object.freeze({id:"system.auto-sizing",worker:"system.auto-sizer",family:"geometry",purpose:"automated bounded sizing"}),
 Object.freeze({id:"system.div",worker:"system.div-worker",family:"html-primitive",purpose:"generic division/container composition"}),
 Object.freeze({id:"system.nav",worker:"system.nav-worker",family:"semantic-html",purpose:"navigation composition"}),
 Object.freeze({id:"system.title",worker:"system.title-worker",family:"semantic-html",purpose:"document and surface title composition"})
]);
const TF_HTML_FRACTION_TYPES_V4012=Object.freeze({
 semantic:Object.freeze(["header","footer","nav","main","section","article","aside","heading","title"]),
 structural:Object.freeze(["div","span","template"]),
 interactive:Object.freeze(["button","input","textarea","select","option","label","form","details","summary","dialog"]),
 media:Object.freeze(["img","picture","source","video","audio","canvas","svg"]),
 textual:Object.freeze(["p","a","strong","em","small","code","pre","blockquote","list"]),
 metadata:Object.freeze(["meta","link","style","script","title"])
});
const TF_CSS_FRACTION_TYPES_V4012=Object.freeze({
 geometry:Object.freeze(["display","position","inset","width","height","min-size","max-size","box-sizing","aspect-ratio"]),
 flow:Object.freeze(["flex","grid","block","inline","overflow","scroll","order","gap","alignment"]),
 responsive:Object.freeze(["viewport","media-query","orientation","container-query","clamp","dynamic-viewport"]),
 interaction:Object.freeze(["pointer","touch-action","cursor","focus","hover","active","disabled"]),
 typography:Object.freeze(["font","size","weight","line-height","letter-spacing","text-align"]),
 surface:Object.freeze(["background","border","radius","shadow","opacity","filter"]),
 motion:Object.freeze(["transform","transition","animation"]),
 layering:Object.freeze(["z-index","stacking-context"])
});
const TF_BAR_VARIANTS_V4012=Object.freeze(["upper","lower","top","bottom","header","footer","local","global","navigation","status","action"]);
const TF_LAYOUT_MODES_V4012=Object.freeze(["mobile-first","portrait","landscape","split","single","stacked","side-by-side","scrollable","fixed","adaptive"]);
const TF_LAYOUT_STATES_V4012=Object.freeze(["idle","measuring","sizing","resizing","auto-sizing","stable","overflowing","constrained","rotating"]);
function tfCompositionSystemV4012(id){
 const d=TF_MOBILE_COMPOSITION_SYSTEMS_V4012.find(x=>x.id===id);
 if(!d)throw new RangeError("unknown mobile composition system");
 return Object.freeze({...d,controller:id+"::controller",adapter:id+"::adapter",bridge:id+"::bridge",sandbox:id+"::sandbox",
  policy:"system.policy",automator:"system.automator",validation:"system.validation",qualification:"system.qualification",
  documentation:id+"::documentation",changeLog:id+"::change-log",version:"0.40.12",transversion:"tv0.40.12",selfAuthorizing:false});
}
function tfBarDescriptorV4012({variant="upper",owner="system.mobile",sticky=false}={}){
 if(!TF_BAR_VARIANTS_V4012.includes(variant))throw new RangeError("unsupported bar variant");
 return Object.freeze({system:"system.bar",worker:"system.bar-worker",variant,owner,sticky:Boolean(sticky),
  semantic:variant==="header"?"header":variant==="footer"?"footer":"div"});
}
function tfSizingDescriptorV4012({mode="sizing",width="auto",height="auto",minWidth=null,maxWidth=null,minHeight=null,maxHeight=null,automated=false}={}){
 const systems={sizing:["system.sizing","system.sizer"],resizing:["system.resizing","system.resizer"],"auto-sizing":["system.auto-sizing","system.auto-sizer"]};
 if(!systems[mode])throw new RangeError("unsupported sizing mode");
 return Object.freeze({system:systems[mode][0],worker:systems[mode][1],mode,width,height,minWidth,maxWidth,minHeight,maxHeight,
  automated:Boolean(automated||mode==="auto-sizing"),automator:(automated||mode==="auto-sizing")?"system.automator":null,
  authorityGranted:false});
}
function tfViewportDescriptorV4012({width=0,height=0,dpr=1,orientation=""}={}){
 const w=Number(width)||0,h=Number(height)||0,o=orientation||((w&&h&&w>h)?"landscape":"portrait");
 return Object.freeze({system:"system.viewport",worker:"system.viewporter",width:w,height:h,dpr:Number(dpr)||1,orientation:o,
  mobileFirst:true,dynamicViewport:true,layout:o==="landscape"?"side-by-side":"stacked"});
}
function tfHTMLFractionV4012({tag="div",role="",classes=[],attributes={},content=""}={}){
 const allowed=new Set(Object.values(TF_HTML_FRACTION_TYPES_V4012).flat().map(x=>x==="heading"?"h1":x==="list"?"ul":x));
 const t=String(tag).toLowerCase(); if(!allowed.has(t)&&!/^(h[1-6]|ol|li)$/.test(t))throw new RangeError("unsupported HTML fraction");
 const attrs=Object.freeze({...attributes}); return Object.freeze({system:t==="div"?"system.div":t==="nav"?"system.nav":t==="footer"?"system.footer":t==="title"?"system.title":"system.html",
  tag:t,role:String(role||""),classes:Object.freeze([...classes]),attributes:attrs,content:String(content),generatedBy:"terraformer.js"});
}
function tfCSSFractionV4012({selector="",declarations={},mode="mobile-first",condition="default",state="stable"}={}){
 if(!selector)throw new TypeError("selector required"); if(!TF_LAYOUT_MODES_V4012.includes(mode))throw new RangeError("unsupported layout mode");
 if(!TF_LAYOUT_STATES_V4012.includes(state))throw new RangeError("unsupported layout state");
 return Object.freeze({system:"system.css",selector:String(selector),declarations:Object.freeze({...declarations}),mode,condition:String(condition),state,generatedBy:"terraformer.js"});
}
function tfGenerateHTMLV4012(f){
 if(!f||!f.tag)throw new TypeError("HTML fraction required");
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 const attrs=Object.entries(f.attributes||{}).map(([k,v])=>" "+esc(k)+'="'+esc(v)+'"').join("");
 const cls=f.classes&&f.classes.length?' class="'+esc(f.classes.join(" "))+'"':"";
 const role=f.role?' role="'+esc(f.role)+'"':"";
 return "<"+f.tag+cls+role+attrs+">"+esc(f.content||"")+"</"+f.tag+">";
}
function tfGenerateCSSV4012(f){
 if(!f||!f.selector)throw new TypeError("CSS fraction required");
 const body=Object.entries(f.declarations||{}).map(([k,v])=>String(k).replace(/[A-Z]/g,m=>"-"+m.toLowerCase())+":"+String(v)).join(";");
 return f.selector+"{"+body+"}";
}
function tfMobileCompositionFabricV4012(){
 return Object.freeze({version:"0.40.12",systems:Object.freeze(TF_MOBILE_COMPOSITION_SYSTEMS_V4012.map(x=>tfCompositionSystemV4012(x.id))),
  html:TF_HTML_FRACTION_TYPES_V4012,css:TF_CSS_FRACTION_TYPES_V4012,bars:TF_BAR_VARIANTS_V4012,modes:TF_LAYOUT_MODES_V4012,states:TF_LAYOUT_STATES_V4012,
  header:Object.freeze({reuseExisting:true,canonical:"system.header"}),generation:Object.freeze({html:"JavaScript",css:"JavaScript",persistentFiles:1}),
  automation:Object.freeze({sizer:"system.automator",resizer:"system.automator",autoSizer:"system.automator",bounded:true,selfAuthorizing:false})});
}
function tfMobileCompositionSelfTestV4012(sourceText){
 const failures=[];
 for(const x of TF_MOBILE_COMPOSITION_SYSTEMS_V4012)if(!sourceText.includes('"'+x.id+'"'))failures.push("missing:"+x.id);
 const v=tfViewportDescriptorV4012({width:360,height:800,dpr:3});if(v.orientation!=="portrait"||v.layout!=="stacked")failures.push("viewport");
 const b=tfBarDescriptorV4012({variant:"lower"});if(b.variant!=="lower")failures.push("bar");
 const a=tfSizingDescriptorV4012({mode:"auto-sizing"});if(!a.automated||a.automator!=="system.automator")failures.push("autosizer");
 const h=tfHTMLFractionV4012({tag:"nav",classes:["mobile-nav"],content:"Navigation"}),hs=tfGenerateHTMLV4012(h);
 if(!hs.includes("<nav")||!hs.includes("Navigation"))failures.push("html-generation");
 const c=tfCSSFractionV4012({selector:".mobile-nav",declarations:{display:"flex",width:"100%"}}),cs=tfGenerateCSSV4012(c);
 if(!cs.includes("display:flex")||!cs.includes("width:100%"))failures.push("css-generation");
 if(failures.length)throw new Error("[TF:system.assurance:qualification-failed] Mobile composition foundation failed: "+failures.join(","));
 return Object.freeze({pass:true,version:"0.40.12",viewport:true,footer:true,footage:true,heading:true,bar:true,sizing:true,resizing:true,
  autoSizing:true,div:true,nav:true,title:true,htmlGeneration:true,cssGeneration:true,androidRuntimeRetest:"DEFERRED_FOR_HARDENING",failures:Object.freeze([])});
}

module.exports=Object.freeze({SYSTEM,descriptor,TF_MOBILE_COMPOSITION_SYSTEMS_V4012,TF_HTML_FRACTION_TYPES_V4012,TF_CSS_FRACTION_TYPES_V4012,TF_BAR_VARIANTS_V4012,TF_LAYOUT_MODES_V4012,TF_LAYOUT_STATES_V4012,tfCompositionSystemV4012,tfBarDescriptorV4012,tfSizingDescriptorV4012,tfViewportDescriptorV4012,tfHTMLFractionV4012,tfCSSFractionV4012,tfGenerateHTMLV4012,tfGenerateCSSV4012,tfMobileCompositionFabricV4012,tfMobileCompositionSelfTestV4012});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfSystemCompositionV36433(owner,{constituents=[],relationships=[]}={}){const id=String(owner?.id??owner??"");if(!id)throw new Error("[TF:system.composition:invalid-input] System identity required.");return Object.freeze({id:id+"::composition",owner:id,system:"system.composition",kind:"system-composition",constituents:Object.freeze((Array.isArray(constituents)?constituents:[constituents]).slice()),relationships:Object.freeze((Array.isArray(relationships)?relationships:[relationships]).slice()),permission:id+"::permission",guard:id+"::guard",healthStatus:id+"::health-status",model:id+"::model",prototypeModel:id+"::prototype-model",...TF_COMPOSITION_BOUNDARY_V36433});}

function tfUniversalCompositionFabricV36433(sourceText){const ids=tfCanonicalSystemIdsV36196(sourceText);const compositions=ids.map(id=>tfSystemCompositionV36433(id));return Object.freeze({version:"0.36.433",systems:ids.length,compositions:Object.freeze(compositions),oneCompositionPerSystem:compositions.length===ids.length,unique:new Set(compositions.map(x=>x.id)).size===ids.length,boundary:TF_COMPOSITION_BOUNDARY_V36433});}

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_DIRECTIVE_COMPOSITION_V36417=Object.freeze({directive:"system.directive",instruction:"system.instruction",source:"system.source",target:"system.target",direction:"system.direction",localization:"system.localization",context:"system.context",authorityRequired:true,admissionRequired:true,automaticExecution:false});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_COMPOSITION_BOUNDARY_V36433=Object.freeze({automaticOwnershipTransfer:false,automaticExecution:false,automaticMutation:false,automaticRename:false,automaticMerge:false,automaticDeletion:false,automaticPersistence:false,automaticExternalEffect:false,authorityAmplification:false});
