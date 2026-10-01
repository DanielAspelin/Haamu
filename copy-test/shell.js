'use strict';

/**
 * Haamu Shell System — bounded command-routing contract.
 *
 * A shell type describes an execution boundary. Registration does not grant
 * authority. Only explicitly supplied executors may execute outside the
 * client interpreter.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const TYPES = Object.freeze(['client','server','local','global']);
let sequence = 0;

const record = (shell, command, stream, payload, state='completed') => Object.freeze({
  type:'terminal-output',
  shell,
  commandId:`${shell}:${++sequence}`,
  sessionId:'haamu',
  sequence,
  timestamp:new Date().toISOString(),
  stream,
  payload:String(payload ?? ''),
  state,
});

const clientExecute = command => {
  const source=String(command ?? '').trim();
  if (!source) return record('client',source,'stdout','');
  const [name,...args]=source.split(/\s+/u);
  if (name==='help') return record('client',source,'stdout','help | echo <text> | clear | shell');
  if (name==='echo') return record('client',source,'stdout',args.join(' '));
  if (name==='clear') return record('client',source,'system','', 'clear');
  if (name==='shell') return record('client',source,'stdout','client');
  return record('client',source,'stderr',`Unknown client command: ${name}`,'rejected');
};

const HaamuShell = Object.freeze({
  family:'shell', role:'shell.system', type:'bounded-shell-router', version:'0.2.0',
  types:TYPES,

  inspect(command) {
    const source=String(command ?? '');
    let quote=null, escape=false, round=0, square=0, curly=0;
    for (const character of source) {
      if (escape) { escape=false; continue; }
      if (character==='\\' && quote!=="'") { escape=true; continue; }
      if (quote) { if (character===quote) quote=null; continue; }
      if (character==="'" || character==='"') { quote=character; continue; }
      if (character==='(') round+=1; else if(character===')') round=Math.max(0,round-1);
      if (character==='[') square+=1; else if(character===']') square=Math.max(0,square-1);
      if (character==='{') curly+=1; else if(character==='}') curly=Math.max(0,curly-1);
    }
    const trailingEscape=escape;
    const continuation=!!quote || trailingEscape || round>0 || square>0 || curly>0;
    return Object.freeze({
      type:'shell-input-inspection', complete:!continuation, continuation,
      reason:quote?'quote':trailingEscape?'escape':round?'parenthesis':square?'bracket':curly?'brace':null,
    });
  },

  create(type, definition={}) {
    type=String(type);
    if (!TYPES.includes(type)) throw new RangeError('Unknown shell type.');
    const executor=type==='client' ? clientExecute :
      (typeof definition.executor==='function' ? definition.executor : null);
    return Object.freeze({
      type:'shell', shellType:type,
      authority:definition.authority ?? 'ungranted',
      execute(command, context={}) {
        if (!executor) return record(type,command,'system',
          `${type} shell execution is not authorized/connected.`,'unavailable');
        const result=executor(String(command ?? ''),context);
        return result?.type==='terminal-output' ? result :
          record(type,command,'stdout',result,'completed');
      },
    });
  },

  router(definition={}) {
    const shells=Object.create(null);
    for (const type of TYPES) shells[type]=this.create(type,definition[type] ?? {});
    return Object.freeze({
      type:'shell-router',
      shell(type){ return shells[type] ?? null; },
      execute(type,command,context={}) {
        const shell=shells[type];
        if (!shell) return record(String(type),command,'stderr','Unknown shell.','rejected');
        return shell.execute(command,context);
      },
    });
  },
});

globalThis.HaamuFamilies['shell.system']=Object.freeze({
  family:HaamuShell.family, role:HaamuShell.role, type:HaamuShell.type, version:HaamuShell.version,
});
globalThis.HaamuShell=HaamuShell;
