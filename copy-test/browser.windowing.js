'use strict';


/* module-private execution scope */
(() => {
/**
 * Haamu Browser Windowing — one isolated hidden windowing system per Plate.
 *
 * Each Plate owns its own window registry and focus state. No window may
 * implicitly cross Plate boundaries. DOM projection remains deferred.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const systems=new Map();

const createSystem=plateId=>{
 const windows=new Map();
 let focus=null;
 return Object.freeze({
  type:'browser-windowing-system',
  plateId,
  container:'plate',
  projection:'hidden',
  integration:'deferred',

  create(definition={}){
   if(!globalThis.HaamuBrowserWindow?.create)throw new Error('HaamuBrowserWindow unavailable.');
   const target=HaamuBrowserWindow.create({...definition,state:'hidden'});
   if(windows.has(target.id))throw new Error('Browser window already exists in plate: '+target.id);
   windows.set(target.id,target);
   return target;
  },
  get(id){return windows.get(String(id))??null;},
  list(){return Object.freeze(Array.from(windows.values()));},
  focus(id){
   const target=this.get(id);
   if(!target)throw new RangeError('Unknown browser window in plate.');
   focus=target.id;
   return focus;
  },
  focused(){return focus?this.get(focus):null;},
  close(id){
   const key=String(id),existed=windows.delete(key);
   if(focus===key)focus=null;
   return existed;
  },
  hideAll(){
   for(const target of windows.values())target.hide();
   focus=null;
   return windows.size;
  }
 });
};

const HaamuBrowserWindowing=Object.freeze({
 family:'browser',role:'browser.windowing',type:'per-plate-hidden-windowing',version:'0.3.0',
 container:'plate',projection:'hidden',integration:'deferred',

 forPlate(plate){
  const plateId=String(typeof plate==='string'?plate:(plate?.id??plate?.plateId??'')).trim();
  if(!plateId)throw new RangeError('Plate identity required.');
  if(!systems.has(plateId))systems.set(plateId,createSystem(plateId));
  return systems.get(plateId);
 },
 hasPlate(plateId){return systems.has(String(plateId));},
 plates(){return Object.freeze(Array.from(systems.keys()));},
 removePlate(plateId){
  const key=String(plateId);
  systems.get(key)?.hideAll();
  return systems.delete(key);
 }
});

globalThis.HaamuFamilies['browser.windowing']=Object.freeze({
 family:HaamuBrowserWindowing.family,role:HaamuBrowserWindowing.role,
 type:HaamuBrowserWindowing.type,version:HaamuBrowserWindowing.version,
});
globalThis.HaamuBrowserWindowing=HaamuBrowserWindowing;
})();
