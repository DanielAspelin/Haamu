'use strict';

/**
 * Haamu Browser Window — logical window contained by a plate.
 *
 * This is a state/identity contract only. It creates no independent viewport
 * and performs no DOM projection. Plate integration is intentionally deferred.
 */
globalThis.HaamuFamilies ??= Object.create(null);

let sequence=0;
const STATES=Object.freeze(['hidden','visible','minimized','maximized']);

const HaamuBrowserWindow=Object.freeze({
 family:'browser',role:'browser.window',type:'plate-contained-window',version:'0.1.0',
 states:STATES,

 create(definition={}){
  const id=String(definition.id??('browser-window-'+(++sequence)));
  let state=STATES.includes(definition.state)?definition.state:'hidden';
  let bounds=Object.freeze({
   x:Number(definition.x??0),y:Number(definition.y??0),
   width:Number(definition.width??0),height:Number(definition.height??0),
  });
  return Object.freeze({
   type:'browser-window',id,
   container:'plate',
   integration:'deferred',
   get state(){return state;},
   get bounds(){return bounds;},
   show(){state='visible';return state;},
   hide(){state='hidden';return state;},
   minimize(){state='minimized';return state;},
   maximize(){state='maximized';return state;},
   restore(){state='visible';return state;},
   move(x,y){bounds=Object.freeze({...bounds,x:Number(x),y:Number(y)});return bounds;},
   resize(width,height){bounds=Object.freeze({...bounds,width:Number(width),height:Number(height)});return bounds;},
  });
 }
});

globalThis.HaamuFamilies['browser.window']=Object.freeze({
 family:HaamuBrowserWindow.family,role:HaamuBrowserWindow.role,
 type:HaamuBrowserWindow.type,version:HaamuBrowserWindow.version,
});
globalThis.HaamuBrowserWindow=HaamuBrowserWindow;
