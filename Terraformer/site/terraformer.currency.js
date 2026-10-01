"use strict";
function bindCurrencyIdentitySocialV04562(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.321: Currency / Payment / Identity / Social Fabric === */
const TF_CURRENCY_IDENTITY_SOCIAL_SYSTEMS_V36321=Object.freeze([
 Object.freeze({id:"system.euro",concept:"Euro",type:"currency-system",mode:"fiat-currency-reference",condition:"context-identified",state:"ready"}),
 Object.freeze({id:"system.bitcoin",concept:"Bitcoin",type:"cryptocurrency-system",mode:"decentralized-digital-asset-reference",condition:"context-identified",state:"ready"}),
 Object.freeze({id:"system.paypal",concept:"PayPal",type:"external-payment-service-system",mode:"external-payment-provider-boundary",condition:"context-identified",state:"ready"}),
 Object.freeze({id:"system.passport",concept:"Passport",type:"identity-document-system",mode:"travel-identity-document-reference",condition:"context-identified",state:"ready"}),
 Object.freeze({id:"system.card",concept:"Card",type:"credential-or-data-carrier-system",mode:"card-reference",condition:"context-identified",state:"ready"}),
 Object.freeze({id:"system.identity-card",concept:"Identity Card",type:"identity-document-system",mode:"identity-card-reference",condition:"context-identified",state:"ready"}),
 Object.freeze({id:"system.social-security",concept:"Social Security",type:"social-administration-system",mode:"social-security-reference",condition:"context-identified",state:"ready"}),
 Object.freeze({id:"system.social",concept:"Social",type:"social-domain-system",mode:"social-context",condition:"context-identified",state:"ready"})
]);
const TF_CURRENCY_IDENTITY_SOCIAL_RELATIONSHIPS_V36321=Object.freeze([
 Object.freeze({from:"system.euro",relation:"type-of",to:"system.currency"}),
 Object.freeze({from:"system.bitcoin",relation:"type-of",to:"system.cryptocurrency"}),
 Object.freeze({from:"system.paypal",relation:"uses",to:"system.payment"}),
 Object.freeze({from:"system.passport",relation:"uses",to:"system.identity"}),
 Object.freeze({from:"system.identity-card",relation:"type-of",to:"system.card"}),
 Object.freeze({from:"system.identity-card",relation:"uses",to:"system.identity"}),
 Object.freeze({from:"system.social-security",relation:"uses",to:"system.social"})
]);
function tfFinancialReferenceV36321(spec={}){
 const kind=String(spec.kind??"").toLowerCase();
 if(!["euro","bitcoin","paypal"].includes(kind))throw new Error("financial reference kind must be euro bitcoin or paypal");
 return Object.freeze({system:"system."+kind,kind,amount:spec.amount==null?null:String(spec.amount),
  accountReference:spec.accountReference?String(spec.accountReference):null,walletReference:spec.walletReference?String(spec.walletReference):null,
  credentialsEmbedded:false,privateKeysEmbedded:false,transactionPerformed:false,paymentPerformed:false,
  balanceClaimed:false,exchangeRateClaimed:false,externalAuthorityAssumed:false,authorityGranted:false});
}
function tfIdentitySocialReferenceV36321(spec={}){
 const kind=String(spec.kind??"").toLowerCase();
 if(!["passport","card","identity-card","social-security","social"].includes(kind))throw new Error("identity/social reference kind unsupported");
 return Object.freeze({system:"system."+kind,kind,subjectReference:spec.subjectReference?String(spec.subjectReference):null,
  identifier:spec.identifier?String(spec.identifier):null,sensitiveData:kind==="passport"||kind==="identity-card"||kind==="social-security",
  identifierPersistenceDefault:false,identifierLoggingDefault:false,identityProven:false,eligibilityProven:false,
  citizenshipImplied:false,governmentAuthorityImplied:false,legalValidityImplied:false,authorityGranted:false});
}
function tfCurrencyIdentitySocialSelfTestV36321(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.euro","system.bitcoin","system.paypal","system.passport","system.card","system.identity-card","system.social-security","system.social","system.currency","system.payment","system.identity","system.cryptocurrency"])if(!ids.has(id))missing.push(id);
 const e=tfFinancialReferenceV36321({kind:"euro",amount:"1.00"}),b=tfFinancialReferenceV36321({kind:"bitcoin"}),p=tfFinancialReferenceV36321({kind:"paypal"}),i=tfIdentitySocialReferenceV36321({kind:"identity-card",identifier:"REDACTED"}),ss=tfIdentitySocialReferenceV36321({kind:"social-security"});
 if(e.transactionPerformed||b.privateKeysEmbedded||p.credentialsEmbedded||i.identifierPersistenceDefault||i.identityProven||!i.sensitiveData||!ss.sensitiveData||ss.eligibilityProven||ss.governmentAuthorityImplied)missing.push("currency-identity-social-boundary");
 if(missing.length)throw new Error("currency identity social qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:8,reusedSystems:6,euro:true,bitcoin:true,paypal:true,passport:true,card:true,identityCard:true,
  socialSecurity:true,social:true,credentialsEmbedded:false,privateKeysEmbedded:false,financialExecution:false,
  sensitiveIdentifierPersistenceDefault:false,identityAuthorityImplied:false,governmentAuthorityImplied:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_CURRENCY_IDENTITY_SOCIAL_SYSTEMS_V36321,TF_CURRENCY_IDENTITY_SOCIAL_RELATIONSHIPS_V36321,tfFinancialReferenceV36321,tfIdentitySocialReferenceV36321,tfCurrencyIdentitySocialSelfTestV36321});
}
const TERRAFORMER_CURRENCY_SYSTEM=Object.freeze({schema:'TERRAFORMER-CURRENCY-SYSTEM/1',id:'system.currency',name:'Currency System',family:'value',type:'currency-system',state:'integrated',canonicalPath:'terraformer://currency/',governs:Object.freeze(['currency','code','unit','denomination','amount','rate-reference']),rule:'Currency System represents currency units and admitted rate references; representation does not establish exchange rates, ownership, transfer, or transaction authority.'});

module.exports=Object.freeze({bindCurrencyIdentitySocialV04562,TERRAFORMER_CURRENCY_SYSTEM});
