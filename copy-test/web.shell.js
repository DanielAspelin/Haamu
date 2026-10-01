'use strict';
globalThis.HaamuFamilies ??= Object.create(null);
const HaamuWebShell=Object.freeze({
 family:'web',role:'web.shell',type:'web-shell-boundary',version:'0.1.0',
 router(definition={}){if(!globalThis.HaamuShell?.router)throw new Error('HaamuShell unavailable.');return HaamuShell.router(definition);},
 execute(shell,command,context={}){
  const router=context.router??globalThis.HaamuShellRouter;
  if(!router?.execute)throw new Error('Haamu shell router unavailable.');
  return router.execute(String(shell??'client'),String(command??''),context);
 }
});
globalThis.HaamuFamilies['web.shell']=Object.freeze({family:'web',role:'web.shell',type:'web-shell-boundary',version:'0.1.0'});
globalThis.HaamuWebShell=HaamuWebShell;
