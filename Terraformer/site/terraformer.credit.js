"use strict";
function bindCreditV04563(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.322: Credit System === */
const TF_CREDIT_SYSTEM_V36322=Object.freeze(
 {id:"system.credit",concept:"Credit",type:"financial-capacity-system",mode:"credit-reference-and-capacity-context",condition:"financial-context-identified",state:"ready"}
);
const TF_CREDIT_RELATIONSHIPS_V36322=Object.freeze([
 Object.freeze({from:"system.credit",relation:"uses",to:"system.money"}),
 Object.freeze({from:"system.credit",relation:"uses",to:"system.currency"}),
 Object.freeze({from:"system.payment",relation:"may-use",to:"system.credit"})
]);
function tfCreditContextV36322(spec={}){
 const currency=spec.currency==null?null:String(spec.currency).toUpperCase();
 const limit=spec.limit==null?null:String(spec.limit);
 const available=spec.available==null?null:String(spec.available);
 return Object.freeze({system:"system.credit",currency,limitReference:limit,availableReference:available,
  creditIsMoney:false,creditIsPayment:false,debtImplied:false,loanImplied:false,
  creditworthinessAssessed:false,scoreCalculated:false,lendingDecisionMade:false,
  borrowingApproved:false,transactionPerformed:false,balanceClaimed:false,
  externalAuthorityAssumed:false,authorityGranted:false});
}
function tfCreditSelfTestV36322(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.credit","system.money","system.currency","system.payment"])if(!ids.has(id))missing.push(id);
 const c=tfCreditContextV36322({currency:"eur",limit:"1000",available:"500"});
 if(c.currency!=="EUR"||c.creditIsMoney||c.creditIsPayment||c.debtImplied||c.loanImplied||c.creditworthinessAssessed||c.scoreCalculated||c.lendingDecisionMade||c.borrowingApproved||c.transactionPerformed||c.balanceClaimed||c.authorityGranted)missing.push("credit-boundary");
 if(missing.length)throw new Error("credit qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:1,credit:true,moneyReused:true,currencyReused:true,paymentReused:true,
  debtImplied:false,loanImplied:false,creditworthinessAssessed:false,scoreCalculated:false,lendingDecisionMade:false,
  borrowingApproved:false,financialExecution:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_CREDIT_SYSTEM_V36322,TF_CREDIT_RELATIONSHIPS_V36322,tfCreditContextV36322,tfCreditSelfTestV36322});
}
module.exports=Object.freeze({bindCreditV04563});
