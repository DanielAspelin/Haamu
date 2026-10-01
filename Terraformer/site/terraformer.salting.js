"use strict";
function bindSaltingV04491(){const SYSTEM=Object.freeze({id:"system.salting",name:"Salting System",family:"cryptography",type:"salting-system",mode:"random-salt-operation",state:"naturalized",
  concepts:Object.freeze(["Salting"]),integrates:Object.freeze(["system.cryptography","system.security","system.generator","system.hashing"]),saltIsSecret:false,reuseByDefault:false,grantsAuthority:false});function tfSaltV36259(bytes=16){const c=require("node:crypto");bytes=Number(bytes);if(!Number.isInteger(bytes)||bytes<16||bytes>64)throw new Error("salt length outside admitted bounds");return c.randomBytes(bytes);}return Object.freeze({SYSTEM,tfSaltV36259});}
module.exports={bindSaltingV04491};
