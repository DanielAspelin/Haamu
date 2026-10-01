"use strict";
const SYSTEM=Object.freeze({id:"system.media",concept:"Media",authorityGranted:false,scaffold:true});
function bindMediaV04526(){return Object.freeze({SYSTEM});}

function bindMediaNewsBroadcastV04526(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.292: Media / News / Broadcast Fabric === */
const TF_MEDIA_SYSTEMS_V36292=Object.freeze([
 Object.freeze({id:"system.media",concept:"Media",type:"content-carrier-domain",mode:"bounded",condition:"medium-identified",state:"ready"}),
 Object.freeze({id:"system.multimedia",concept:"Multimedia",type:"media-composition-domain",mode:"composite",condition:"multiple-media-forms-identified",state:"ready",parent:"system.media"}),
 Object.freeze({id:"system.news",concept:"News",type:"information-publication-domain",mode:"publication",condition:"source-and-time-context-identified",state:"ready",parent:"system.media"}),
 Object.freeze({id:"system.podcast",concept:"Podcast",type:"episodic-media-domain",mode:"on-demand",condition:"episode-or-feed-identified",state:"ready",parent:"system.media"}),
 Object.freeze({id:"system.radio",concept:"Radio",type:"broadcast-media-domain",mode:"broadcast",condition:"station-or-stream-identified",state:"ready",parent:"system.media"}),
 Object.freeze({id:"system.social-media",concept:"Social Media",type:"participatory-media-domain",mode:"networked",condition:"platform-and-participant-context-identified",state:"ready",parent:"system.media"})
]);
const TF_MEDIA_RELATIONSHIPS_V36292=Object.freeze([
 Object.freeze({from:"system.multimedia",relation:"part-of",to:"system.media"}),
 Object.freeze({from:"system.news",relation:"part-of",to:"system.media"}),
 Object.freeze({from:"system.podcast",relation:"part-of",to:"system.media"}),
 Object.freeze({from:"system.radio",relation:"part-of",to:"system.media"}),
 Object.freeze({from:"system.social-media",relation:"part-of",to:"system.media"}),
 Object.freeze({from:"system.podcast",relation:"uses",to:"system.streaming"}),
 Object.freeze({from:"system.radio",relation:"uses",to:"system.streaming"}),
 Object.freeze({from:"system.social-media",relation:"uses",to:"system.communication"}),
 Object.freeze({from:"system.news",relation:"uses",to:"system.communication"})
]);
function tfMediaContextV36292(kind,spec={}){
 const id="system."+String(kind),d=TF_MEDIA_SYSTEMS_V36292.find(x=>x.id===id);if(!d)throw new Error("unknown media system");
 return Object.freeze({system:id,parent:d.parent??null,type:d.type,mode:d.mode,source:spec.source??null,content:spec.content??null,
  verified:false,published:false,streams:false,communicates:false,executes:false,mutates:false,authorityGranted:false});
}
function tfMediaFabricSelfTestV36292(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.media","system.multimedia","system.news","system.podcast","system.radio","system.social-media","system.streaming","system.communication","system.type","system.mode","system.condition","system.state"])if(!ids.has(id))missing.push(id);
 for(const x of TF_MEDIA_SYSTEMS_V36292)for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);
 const n=tfMediaContextV36292("news",{source:"source",content:"item"}),r=tfMediaContextV36292("radio",{source:"station"});
 if(n.verified||n.published||r.streams||n.executes||n.mutates||n.authorityGranted)missing.push("media-boundary");
 if(missing.length)throw new Error("media qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,media:true,multimedia:true,news:true,podcast:true,radio:true,socialMedia:true,streamingBridge:true,communicationBridge:true,publicationNotImplied:true,verificationNotImplied:true,streamingNotPerformed:true,executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_MEDIA_SYSTEMS_V36292,TF_MEDIA_RELATIONSHIPS_V36292,tfMediaContextV36292,tfMediaFabricSelfTestV36292});
}
module.exports=Object.freeze({bindMediaV04526,bindMediaNewsBroadcastV04526});

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_WEB_MEDIA_TYPES_V04569=Object.freeze({"system.web-camera":"system.camera"});
