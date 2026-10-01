"use strict";
const {edge}=require("./terraformer.relationship");
function types(parent,child,evidence="terraformer.systemtypes.json"){return edge(parent,"types",child,evidence);}
module.exports=Object.freeze({types});
