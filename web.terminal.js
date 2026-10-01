'use strict';
globalThis.HaamuFamilies ??= Object.create(null);
const HaamuWebTerminal=Object.freeze({
 family:'web',role:'web.terminal',type:'web-terminal-boundary',version:'0.1.0',
 input(value,options={}){if(!globalThis.HaamuTerminalInput)throw new Error('HaamuTerminalInput unavailable.');return HaamuTerminalInput.create(value,options);},
 execute(value,options={}){
  const input=this.input(value,options);
  if(!globalThis.HaamuTerminalShell)throw new Error('HaamuTerminalShell unavailable.');
  const router=options.router??globalThis.HaamuShellRouter;
  return HaamuTerminalShell.execute(input,router,options);
 },
 process(output,plate,options={}){if(!globalThis.HaamuTerminal?.process)throw new Error('HaamuTerminal unavailable.');return HaamuTerminal.process(output,plate,options);},
 allocate(output,plate,options={}){if(!globalThis.HaamuTerminal?.allocate)throw new Error('HaamuTerminal unavailable.');return HaamuTerminal.allocate(output,plate,options);},
 render(output,plate,options={}){if(!globalThis.HaamuTerminal?.render)throw new Error('HaamuTerminal unavailable.');return HaamuTerminal.render(output,plate,options);}
});
globalThis.HaamuFamilies['web.terminal']=Object.freeze({family:'web',role:'web.terminal',type:'web-terminal-boundary',version:'0.1.0'});
globalThis.HaamuWebTerminal=HaamuWebTerminal;
