"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-RELATIONSHIP-SYSTEM/1",
 id:"system.relationship",concept:"Relationship",typeOf:"system.system",
 responsibility:"Own normalized references between existing identities without duplicating endpoint implementation.",
 qualification:"UNDER_CONDITIONAL_EXPERIMENT",authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function edge(from,relation,to,evidence=null){
 if(!from||!relation||!to) throw Error("relationship: from, relation, and to required");
 return Object.freeze({from:String(from),relation:String(relation),to:String(to),evidence,
   endpointOwnership:false,authorityGranted:false,persistent:false});
}
module.exports=Object.freeze({SYSTEM,edge});

/* Terraformer v0.48.11: qualified immutable depth-0 declaration migration. */
const TERRAFORMER_RELATIONSHIP_SYSTEM=Object.freeze({schema:'TERRAFORMER-SYSTEM/1',id:'system.relationship',name:'Relationship System',family:'structure',type:'relationship-system',state:'integrated',canonicalPath:'terraformer://relationship/',dependsOn:Object.freeze(['system.relation']),governs:Object.freeze(['relationship-reference','participant-reference','role-reference','direction','state','evidence']),rule:'Relationship System models contextual multi-party relationships; representation does not create legal, social, ownership, access, or authority relationships.'});

/* Terraformer v0.48.11: qualified immutable depth-0 declaration migration. */
const TERRAFORMER_CHAT_SYSTEM_RELATIONSHIPS=Object.freeze({schema:'TERRAFORMER-CHAT-SYSTEM-RELATIONSHIPS/1',relations:Object.freeze([['system.chat','uses','system.communication'],['system.chat','uses','system.conversation'],['system.chat','uses','system.conference'],['system.chat','uses','system.correspondence'],['system.chat','uses','system.voice'],['system.chat','uses','system.speech'],['system.conference','uses','system.voice'],['system.conference','uses','system.speech'],['system.correspondence','uses','system.chat.message']]),rule:'Chat is the user-facing integration surface; Conversation, Communication, Conference, Correspondence, Voice, and Speech remain separately governed systems.'});

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_REFLECT_OPERATION_RELATIONSHIPS_V36418=Object.freeze([Object.freeze({from:"system.reflecting",relation:"performs",to:"system.reflect"}),Object.freeze({from:"system.reflect",relation:"performed-by",to:"system.reflector"}),Object.freeze({from:"system.reflect",relation:"produces",to:"system.reflection"})]);
