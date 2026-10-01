'use strict';

/**
 * Haamu Browser Plate State — logical Plate presentation state.
 * Plate dimensions remain automatic. The owning corner button opens/closes
 * the Plate. Desktop alone may toggle normal <-> maximized.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const systems=new Map();
const DESKTOP_STATES=Object.freeze(['normal','maximized']);

const createSystem=plateId=>{
 let desktopState='normal';
 const listeners=new Set();
 const publish=()=>{
  const snapshot=Object.freeze({type:'plate-state',plateId,desktop:desktopState,mobile:'automatic'});
  for(const listener of listeners)listener(snapshot);
  return snapshot;
 };
 return Object.freeze({
  type:'browser-plate-state-system',plateId,
  sizing:'automatic',
  mobile:Object.freeze({sizing:'automatic',controls:Object.freeze([])}),
  desktop:Object.freeze({sizing:'automatic',controls:Object.freeze(['toggle-maximize'])}),
  state(platform='desktop'){return platform==='mobile'?'automatic':desktopState;},
  toggle(platform='desktop'){
   if(platform==='mobile')return publish();
   desktopState=desktopState==='maximized'?'normal':'maximized';
   return publish();
  },
  maximize(platform='desktop'){
   if(platform==='mobile')return publish();
   desktopState='maximized';return publish();
  },
  restore(platform='desktop'){
   if(platform==='mobile')return publish();
   desktopState='normal';return publish();
  },
  subscribe(listener){
   if(typeof listener!=='function')throw new TypeError('Plate state listener required.');
   listeners.add(listener);listener(publish());
   return ()=>listeners.delete(listener);
  }
 });
};

const HaamuBrowserPlateState=Object.freeze({
 family:'browser',role:'browser.plate.state',type:'automatic-plate-state',version:'0.2.0',
 states:DESKTOP_STATES,
 forPlate(plate){
  const id=String(typeof plate==='string'?plate:(plate?.id??plate?.plateId??'')).trim();
  if(!id)throw new RangeError('Plate identity required.');
  if(!systems.has(id))systems.set(id,createSystem(id));
  return systems.get(id);
 },
 plates:()=>Object.freeze(Array.from(systems.keys()))
});
globalThis.HaamuFamilies['browser.plate.state']=Object.freeze({family:'browser',role:'browser.plate.state',type:'automatic-plate-state',version:'0.2.0'});
globalThis.HaamuBrowserPlateState=HaamuBrowserPlateState;
