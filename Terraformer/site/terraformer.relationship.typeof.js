"use strict";
/* Generic dotted projection for established typeOf relationships. */
const {edge}=require("./terraformer.relationship");
function typeOf(child,parent,evidence="terraformer.systemtypes.json"){
 return edge(child,"typeOf",parent,evidence);
}
module.exports=Object.freeze({typeOf});
