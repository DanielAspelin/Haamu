"use strict";
const SYSTEM=Object.freeze({id:"system.history",concept:"History",type:"history-system",planOnly:true,persistencePerformed:false,externalCapture:false,historyRewritten:false,externalEffect:false,authorityGranted:false,scaffold:true});
const TERRAFORMER_HISTORY_SYSTEM=Object.freeze({schema:'TERRAFORMER-HISTORY/1',id:'system.history',name:'History System',family:'state-lifecycle',state:'integrated',scope:'volatile-first',canonicalPath:'terraformer://history/',governs:Object.freeze(['record','sequence','before','after','cursor','branch','reversible','undo','redo','clear']),persistence:'authorization-required',rule:'History records admitted reversible state transitions; recording history does not make an irreversible operation reversible.'});

const TERRAFORMER_UNDO_SYSTEM=Object.freeze({schema:'TERRAFORMER-UNDO/1',id:'system.history.undo',name:'Undo System',parent:'system.history',state:'integrated',canonicalPath:'terraformer://history/undo/',rule:'Undo moves the history cursor backward only across an admitted reversible transition and returns its before-state.'});

const TERRAFORMER_REDO_SYSTEM=Object.freeze({schema:'TERRAFORMER-REDO/1',id:'system.history.redo',name:'Redo System',parent:'system.history',state:'integrated',canonicalPath:'terraformer://history/redo/',rule:'Redo moves the history cursor forward only across a previously undone reversible transition and returns its after-state.'});

function tfHistoryCreate(scope='volatile'){return {schema:'TERRAFORMER-HISTORY-STATE/1',scope:scope==='persistent'?'persistent':'volatile',entries:[],cursor:-1,sequence:0}}

function tfHistoryRecord(history,change={}){if(!history||history.schema!=='TERRAFORMER-HISTORY-STATE/1')return {ok:false,reason:'invalid-history'};if(change.reversible===false)return {ok:false,reason:'irreversible-operation'};if(history.scope==='persistent'&&!change.persistenceAuthorized)return {ok:false,reason:'authorization-required'};if(history.cursor<history.entries.length-1)history.entries=history.entries.slice(0,history.cursor+1);const entry={sequence:++history.sequence,id:String(change.id||`change-${history.sequence}`),identity:String(change.identity||'state'),before:change.before,after:change.after,reversible:true,at:Date.now()};history.entries.push(entry);history.cursor=history.entries.length-1;return {ok:true,action:'record',entry,cursor:history.cursor}}

function tfHistoryUndo(history){if(!history||history.schema!=='TERRAFORMER-HISTORY-STATE/1')return {ok:false,reason:'invalid-history'};if(history.cursor<0)return {ok:false,reason:'nothing-to-undo'};const entry=history.entries[history.cursor--];return {ok:true,action:'undo',entry,state:entry.before,cursor:history.cursor}}

function tfHistoryRedo(history){if(!history||history.schema!=='TERRAFORMER-HISTORY-STATE/1')return {ok:false,reason:'invalid-history'};if(history.cursor>=history.entries.length-1)return {ok:false,reason:'nothing-to-redo'};const entry=history.entries[++history.cursor];return {ok:true,action:'redo',entry,state:entry.after,cursor:history.cursor}}
const {TERRAFORMER_URI_POOL_SYSTEM}=require('./terraformer.pool.js');
globalThis.TERRAFORMER_URI_POOL_SYSTEM=TERRAFORMER_URI_POOL_SYSTEM;
const {TERRAFORMER_WINDOW_MORPH_SYSTEM}=require('./terraformer.window.js');
globalThis.TERRAFORMER_WINDOW_MORPH_SYSTEM=TERRAFORMER_WINDOW_MORPH_SYSTEM;

module.exports=Object.freeze({SYSTEM,TERRAFORMER_HISTORY_SYSTEM,TERRAFORMER_UNDO_SYSTEM,TERRAFORMER_REDO_SYSTEM,tfHistoryCreate,tfHistoryRecord,tfHistoryUndo,tfHistoryRedo});
