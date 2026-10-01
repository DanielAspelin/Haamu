"use strict";
function bindCalcCompareComputeV04587(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.346: Calculator / Comparison / Computer Actor Fabric === */
const TF_CALC_COMPARE_COMPUTE_SYSTEMS_V36346=Object.freeze([
 Object.freeze({id:"system.calculator",concept:"Calculator",type:"process-actor-system",mode:"arithmetic-actor",condition:"arithmetic-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.comparison",concept:"Comparison",type:"comparison-process-system",mode:"bounded-comparison",condition:"comparison-subjects-admitted",state:"ready"}),
 Object.freeze({id:"system.comparer",concept:"Comparer",type:"process-actor-system",mode:"comparison-actor",condition:"comparison-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.computer",concept:"Computer",type:"process-actor-system",mode:"computation-actor",condition:"computation-operation-admitted",state:"ready"})
]);
const TF_CALC_COMPARE_COMPUTE_RELATIONSHIPS_V36346=Object.freeze([
 Object.freeze({from:"system.calculator",relation:"part-of",to:"system.arithmetic"}),
 Object.freeze({from:"system.comparer",relation:"part-of",to:"system.comparison"}),
 Object.freeze({from:"system.computer",relation:"part-of",to:"system.computation"})
]);
function tfCalculatorPlanV36346(spec={}){
 return Object.freeze({system:"system.arithmetic",actor:"system.calculator",operation:spec.operation==null?null:String(spec.operation),
  operands:Object.freeze(Array.isArray(spec.operands)?spec.operands.slice():[]),executionPerformed:false,persistencePerformed:false,authorityGranted:false});
}
function tfComparisonPlanV36346(spec={}){
 return Object.freeze({system:"system.comparison",actor:"system.comparer",left:spec.left??null,right:spec.right??null,
  comparator:spec.comparator==null?null:String(spec.comparator),comparisonPerformed:false,mutationPerformed:false,authorityGranted:false});
}
function tfComputerPlanV36346(spec={}){
 return Object.freeze({system:"system.computation",actor:"system.computer",work:spec.work==null?null:String(spec.work),
  computationPerformed:false,automaticExecution:false,persistencePerformed:false,authorityGranted:false});
}
function tfCalcCompareComputeSelfTestV36346(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.arithmetic","system.calculator","system.comparison","system.comparer","system.computation","system.computer"])if(!ids.has(id))missing.push(id);
 const a=tfCalculatorPlanV36346({operation:"add",operands:[1,2]}),b=tfComparisonPlanV36346({left:1,right:2,comparator:"less-than"}),c=tfComputerPlanV36346({work:"fixture"});
 if(a.executionPerformed||a.authorityGranted)missing.push("calculator-boundary");
 if(b.comparisonPerformed||b.mutationPerformed||b.authorityGranted)missing.push("comparison-boundary");
 if(c.computationPerformed||c.automaticExecution||c.authorityGranted)missing.push("computer-boundary");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Calculator / comparison / computer qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:4,arithmeticReused:true,calculator:true,comparison:true,comparer:true,computationReused:true,computer:true,
  calculatorUnderArithmetic:true,comparerUnderComparison:true,computerUnderComputation:true,automaticExecution:false,authorityAmplification:false,missing:0});
}
globalThis.TF_CALC_COMPARE_COMPUTE_SYSTEMS_V36346=TF_CALC_COMPARE_COMPUTE_SYSTEMS_V36346;
globalThis.TF_CALC_COMPARE_COMPUTE_RELATIONSHIPS_V36346=TF_CALC_COMPARE_COMPUTE_RELATIONSHIPS_V36346;
globalThis.tfCalculatorPlanV36346=tfCalculatorPlanV36346;
globalThis.tfComparisonPlanV36346=tfComparisonPlanV36346;
globalThis.tfComputerPlanV36346=tfComputerPlanV36346;
 return Object.freeze({TF_CALC_COMPARE_COMPUTE_SYSTEMS_V36346,TF_CALC_COMPARE_COMPUTE_RELATIONSHIPS_V36346,tfCalculatorPlanV36346,tfComparisonPlanV36346,tfComputerPlanV36346,tfCalcCompareComputeSelfTestV36346});
}
module.exports=Object.freeze({bindCalcCompareComputeV04587});
