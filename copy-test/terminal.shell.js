'use strict';
globalThis.HaamuFamilies ??= Object.create(null);
const HaamuTerminalShell=Object.freeze({
 family:'terminal',role:'terminal.shell',type:'terminal-shell-bridge',version:'0.1.0',
 execute(input,router,context={}){
  if(!input||input.type!=='terminal-input')throw new TypeError('Terminal input record required.');
  if(!router?.execute)throw new TypeError('Shell router required.');
  return router.execute(input.shell,input.value,{...context,terminalInput:input});
 }
});
globalThis.HaamuFamilies['terminal.shell']=Object.freeze({family:'terminal',role:'terminal.shell',type:'terminal-shell-bridge',version:'0.1.0'});
globalThis.HaamuTerminalShell=HaamuTerminalShell;
