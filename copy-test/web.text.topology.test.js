'use strict';

const assert=require('node:assert/strict');
require('./web.text.js');
const W=globalThis.HaamuWebText;

const base=()=>({
 area:{x:10,y:20,width:110,height:90},
 padding:{top:5,right:5,bottom:5,left:5},
 promptReserve:20,promptGap:5,
 cell:{width:10,height:10,columnGap:0,rowGap:0},
 promptCell:{width:10,height:5,columnGap:0,rowGap:0},
});

assert.equal(W.version,'1.27.1');

const expected={
 'top-left':['0:0','0:1','0:2'],
 'top-right':['0:9','0:8','0:7'],
 'bottom-left':['5:0','5:1','5:2'],
 'bottom-right':['5:9','5:8','5:7'],
};
for(const corner of Object.keys(expected)){
 const r=W.populateDisplay('ABC',{...base(),corner});
 assert.deepEqual(r.mesh.nodes.map(n=>n.address),expected[corner]);
 assert.equal(r.topology.matrix.columns,10);
 assert.equal(r.topology.matrix.rows,6);
 assert.equal(r.topology.mayResizePlate,false);
 assert.equal(r.topology.mayMovePlate,false);
}

const spaced=W.displayTopology({...base(),cell:{width:9,height:9,columnGap:1,rowGap:1}});
assert.equal(spaced.grid.columns,10);
assert.equal(spaced.grid.rows,6);

const prompt=W.populatePrompt('abcdefghijklmnopqrstuvwxyz0123456789',{
 ...base(),promptCorner:'bottom-right',promptMaxRows:3
});
assert.equal(prompt.topology.grid.rows,3);
assert.equal(prompt.topology.grid.columns,10);
assert.equal(prompt.mesh.capacity,30);
assert.equal(prompt.mesh.overflow,true);
assert.equal(prompt.mesh.displaced.join(''),'456789');
assert.equal(prompt.editingAuthority,'native-textarea-ime');

const unicode=W.populateDisplay('A👨‍👩‍👧‍👦e\u0301B',{...base(),corner:'top-left'});
assert.deepEqual(unicode.mesh.nodes.map(n=>n.text),['A','👨‍👩‍👧‍👦','é','B']);
assert.equal(unicode.mesh.nodes[1].grapheme.value,'👨‍👩‍👧‍👦');

const original=Object.freeze({x:10,y:20,width:110,height:90});
const opts={...base(),area:original,corner:'bottom-right'};
const before=JSON.stringify(original);
const result=W.populateDisplay('immutable',opts);
assert.equal(JSON.stringify(original),before);
assert.deepEqual(result.topology.field,{type:'web-text-output-field',x:15,y:25,width:100,height:55,role:'output',streams:['text','shell','terminal','search','command','status','error']});
assert.equal(result.topology.plateAuthority,'read-only');
assert.equal(result.mesh.changesGeometry,false);

console.log('PASS web.text topology qualification v1.27.1');
