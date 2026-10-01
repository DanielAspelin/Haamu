'use strict';
globalThis.HaamuFamilies ??= Object.create(null);
const HaamuTextParsing=Object.freeze({
 family:'text',role:'text.parsing',type:'text-parser',version:'0.1.0',
 normalize(value,form='NFC'){return String(value??'').normalize(form);},
 parse(value,options={}){
  const text=this.normalize(value,options.normalization??'NFC'),tokens=[]; let line=0,column=0,match;
  const pattern=/\r\n|\r|\n|[\p{L}\p{M}\p{N}_]+|[ \t]+|[^\p{L}\p{M}\p{N}_ \t\r\n]/gu;
  while((match=pattern.exec(text))!==null){const value=match[0];let type='punctuation';
   if(/^(?:\r\n|\r|\n)$/u.test(value))type='newline'; else if(/^[ \t]+$/u.test(value))type='whitespace'; else if(/^[\p{L}\p{M}\p{N}_]+$/u.test(value))type='word';
   tokens.push(Object.freeze({type,value,start:match.index,end:match.index+value.length,line,column}));
   if(type==='newline'){line++;column=0;}else column+=Array.from(value).length;
  }
  const lines=[]; for(let number=0;number<=line;number++){const members=tokens.filter(t=>t.line===number&&t.type!=='newline');lines.push(Object.freeze({type:'text-line',number,tokens:Object.freeze(members),text:members.map(t=>t.value).join('')}));}
  return Object.freeze({type:'parsed-text',source:text,normalization:options.normalization??'NFC',tokens:Object.freeze(tokens),lines:Object.freeze(lines)});
 }
});
globalThis.HaamuFamilies['text.parsing']=Object.freeze({family:'text',role:'text.parsing',type:'text-parser',version:'0.1.0'});globalThis.HaamuTextParsing=HaamuTextParsing;
