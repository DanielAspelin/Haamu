'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = vm.createContext({Intl,TextEncoder});
const root = path.resolve(__dirname,'..');
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
// Compile every classic script in one shared realm to catch lexical collisions.
for (const match of html.matchAll(/<script src="([^?]+)\?[^\"]+"><\/script>/g)) {
 const name=match[1];
 if(['entry.pre.js','entry.post.js','index.js','default.js','haamu.js','browser.entry.js','web.entry.js','web.js'].includes(name)) continue;
 vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),context,{filename:name});
}
const result = vm.runInContext(`(() => {
 const plate = HaamuWebPlate.create({id:'test'});
 const record = HaamuWebText.processForPlate('👨‍👩‍👧‍👦e\\u0301',plate,{unit:'glyph',columns:2});
 return {units:record.matrix.cells.map(cell=>cell.text),nodes:record.mesh.nodes.length,columns:record.grid.columns};
})()`,context);
assert.deepEqual(Array.from(result.units),['👨‍👩‍👧‍👦','é']);
assert.equal(result.columns,2);
assert.ok(result.nodes>0);
console.log('PASS classic-script shared scope and grapheme plate composition');
