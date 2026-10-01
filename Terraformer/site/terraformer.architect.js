'use strict';
const TERRAFORMER_ARCHITECT=Object.freeze({
 id:'system.architect',
 name:'Architect',
 system:'system.architecture',
 position:'architect',
 attribution:Object.freeze({
  name:'Daniel Alexander Aspelin',
  relation:'creator',
  roles:Object.freeze(['Founder','Architect','Designer','Engineer','Developer']),
  scope:'Terraformer'
 }),
 operation:Object.freeze({
  level:'low-level',
  mechanism:'generic-bounded-autonomy',
  rootControlDeliveryBoundary:true,
  rootControlExecutionAuthority:false
 }),
 boundaries:Object.freeze({
  attributionIsAuthentication:false,
  positionIsAuthorization:false,
  selfAuthorizes:false,
  bypassesControl:false,
  bypassesQualification:false,
  grantsMachineRoot:false,
  grantsPersistence:false
 })
});
function tfArchitectDescriptor(){return TERRAFORMER_ARCHITECT;}
function tfArchitectRootControlDelivery(control){
 return Object.freeze({
  schema:'TERRAFORMER-ARCHITECT-ROOT-CONTROL-DELIVERY/1',
  architect:TERRAFORMER_ARCHITECT.attribution.name,
  target:'system.architect',
  control,
  delivered:true,
  executed:false,
  authorizationRequired:true,
  qualificationRequired:true
 });
}
function tfArchitectQualification(){
 const b=TERRAFORMER_ARCHITECT.boundaries;
 return Object.freeze({pass:b.attributionIsAuthentication===false&&b.positionIsAuthorization===false&&b.grantsMachineRoot===false,
  identity:TERRAFORMER_ARCHITECT.id,attribution:TERRAFORMER_ARCHITECT.attribution.name,
  roles:TERRAFORMER_ARCHITECT.attribution.roles,
  genericOperation:true,rootControlDeliveryBoundary:true,rootPrivilegeGranted:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});
}
module.exports=Object.freeze({TERRAFORMER_ARCHITECT,tfArchitectDescriptor,tfArchitectRootControlDelivery,tfArchitectQualification});
