'use strict';
const TERRAFORMER_MARKET_SYSTEM=Object.freeze({schema:'TERRAFORMER-MARKET-SYSTEM/1',id:'system.market',name:'Market System',family:'market',type:'market-system',state:'integrated',canonicalPath:'terraformer://market/',dependsOn:Object.freeze(['system.business','system.resource']),governs:Object.freeze(['market','offer','demand','supply','participant-reference','price-observation','exchange-reference']),rule:'Market System represents market information and relationships; observations are not transaction authority, financial advice, or guaranteed market truth.'});
function tfConditionEvaluate(value){return Object.freeze({schema:'TERRAFORMER-CONDITION-RESULT/1',state:value===true?'satisfied':value===false?'unsatisfied':'unknown',effectAuthorized:false,persisted:false})}

module.exports=Object.freeze({TERRAFORMER_MARKET_SYSTEM,tfConditionEvaluate});
