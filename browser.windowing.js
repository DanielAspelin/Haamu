'use strict';

/**
 * Haamu Browser Windowing — hidden plate-contained window manager.
 *
 * Topology remains Haamu-owned. Windowing exists logically inside the plate
 * boundary and remains unprojected until later qualified plate integration.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const windows=new Map();
let focus=null;

const HaamuBrowserWindowing=Object.freeze({
 family:'browser',role:'browser.windowing',type:'hidden-plate-windowing',version:'0.2.0',
 container:'plate',projection:'hidden',integration:'deferred',

 create(definition={}){
  if(!globalThis.HaamuBrowserWindow?.create)throw new Error('HaamuBrowserWindow unavailable.');
  const target=HaamuBrowserWindow.create({...definition,state:'hidden'});
  if(windows.has(target.id))throw new Error('Browser window already exists: '+target.id);
  windows.set(target.id,target);
  return target;
 },
 get(id){return windows.get(String(id))??null;},
 list(){return Object.freeze(Array.from(windows.values()));},
 focus(id){const target=this.get(id);if(!target)throw new RangeError('Unknown browser window.');focus=target.id;return focus;},
 focused(){return focus?this.get(focus):null;},
 close(id){const key=String(id),existed=windows.delete(key);if(focus===key)focus=null;return existed;},
 hideAll(){for(const target of windows.values())target.hide();focus=null;return windows.size;}
});

globalThis.HaamuFamilies['browser.windowing']=Object.freeze({
 family:HaamuBrowserWindowing.family,role:HaamuBrowserWindowing.role,
 type:HaamuBrowserWindowing.type,version:HaamuBrowserWindowing.version,
});
globalThis.HaamuBrowserWindowing=HaamuBrowserWindowing;
