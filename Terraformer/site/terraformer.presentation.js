'use strict';
const TERRAFORMER_PRESENTATION_ABSTRACTION=Object.freeze({schema:'TERRAFORMER-PRESENTATION-ABSTRACTION/1',id:'system.presentation.abstraction',name:'Presentation Abstraction System',parent:'system.presentation',family:'presentation',state:'integrated',audience:'user',internal:Object.freeze({uri:true,port:9966,transport:'http-loopback'}),userVisible:Object.freeze({uri:'scoped-route-only',scheme:false,port:false,transport:false}),diagnostics:Object.freeze({uri:true,port:true,transport:true}),rule:'Ordinary presentation exposes application and window identity, not internal Terraformer URI, port, or transport details; diagnostics and administration may inspect them.'});

function tfPresentationRouteSegments(uri){try{const u=new URL(String(uri||''));if(u.protocol!=='terraformer:')return [];return [u.hostname,...u.pathname.split('/').filter(Boolean)].map(x=>decodeURIComponent(x))}catch{return []}}

function tfPresentationDisplayWord(value){return String(value||'').split(/[-_]+/).filter(Boolean).map(w=>w.length<=3&&/^[a-z0-9]+$/i.test(w)&&['ios','css','html','api','uri','pid','tcp','udp','gsm','gps','rfid'].includes(w.toLowerCase())?w.toUpperCase():w.charAt(0).toUpperCase()+w.slice(1)).join(' ')}

function tfPresentationIdentityWord(value){return String(value||'').toLowerCase().replace(/\bsystem\b/g,'').replace(/[^a-z0-9]+/g,'').trim()}

function tfPresentationScopedRoute(uri){return tfPresentationRouteSegments(uri).join('/')}

function tfPresentationDisplayRoute(uri,title=''){const segments=tfPresentationRouteSegments(uri),titleKey=tfPresentationIdentityWord(title);if(!segments.length)return '';const display=segments.map(tfPresentationDisplayWord),lastKey=tfPresentationIdentityWord(display[display.length-1]);if(titleKey&&lastKey===titleKey)display.pop();return display.join(' / ')}

function tfPresentationPublicLocation(input={}){const title=String(input.title||'Terraformer').replace(/\s+System\s*$/i,''),route=tfPresentationScopedRoute(input.uri),displayRoute=tfPresentationRouteSegments(input.uri).map(tfPresentationDisplayWord).join(' / '),out={schema:'TERRAFORMER-PUBLIC-PRESENTATION/4',title,route,displayRoute,lowerBarLabel:displayRoute||title,windowId:input.windowId||null,scope:input.scope||null,schemeVisible:false,portVisible:false};tfAuditVisual('project','presentation',{title,route,windowId:out.windowId,scope:out.scope},'success');return out}
const {tfUriPoolCreate}=require('./terraformer.pool.js');
globalThis.tfUriPoolCreate=tfUriPoolCreate;
const {tfUriPoolLoad}=require('./terraformer.pool.js');
globalThis.tfUriPoolLoad=tfUriPoolLoad;

module.exports=Object.freeze({TERRAFORMER_PRESENTATION_ABSTRACTION,tfPresentationRouteSegments,tfPresentationDisplayWord,tfPresentationIdentityWord,tfPresentationScopedRoute,tfPresentationDisplayRoute,tfPresentationPublicLocation});

/* Terraformer v0.47.99: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfPresentationRecordPath(){return TERRAFORMER_PRESENTATION_SESSION.record}

function tfClearPresentationSession(){try{const x=tfReadPresentationSession();if(!x.exists||x.pid===process.pid)fs.unlinkSync(tfPresentationRecordPath())}catch{}}

/* Terraformer v0.48.2: cross-owner implementation migrated after bridge qualification. */
function tfReadPresentationSession(){try{const x=JSON.parse(fs.readFileSync(tfPresentationRecordPath(),'utf8')),pid=Number(x.pid)||0,live=pid>0&&processAlive(pid),port=Number(x.port)||9966,url=String(x.url||('http://127.0.0.1:'+port+'/')),versionMatch=typeof x.version==='string'&&x.version===META.version,installationMatch=typeof x.installationId==='string'&&x.installationId===tfInstallationId(),executableIdentity=tfExecutableIdentity(),executableMatch=typeof x.executableIdentity==='string'&&!!executableIdentity&&x.executableIdentity===executableIdentity;let commandMatch=true,commandFile=null;if(live&&process.platform==='linux'){try{const cmd=fs.readFileSync('/proc/'+pid+'/cmdline','utf8').split('\0').filter(Boolean);commandFile=cmd.find(v=>/terraformer\.js$/.test(v))||null;commandMatch=!!commandFile&&path.resolve(commandFile)===path.resolve(__filename)}catch{commandMatch=false}}return {exists:true,live,verified:live&&versionMatch&&installationMatch&&executableMatch&&commandMatch,pid,port,url,versionMatch,installationMatch,executableMatch,commandMatch,commandFile,record:x};}catch{return {exists:false,live:false,verified:false,pid:null}}}

function tfWritePresentationSession(host,port,url){const dir=path.dirname(tfPresentationRecordPath());fs.mkdirSync(dir,{recursive:true,mode:0o700});const tmp=tfPresentationRecordPath()+'.tmp-'+process.pid;fs.writeFileSync(tmp,JSON.stringify({schema:'TERRAFORMER-PRESENTATION-SESSION/1',pid:process.pid,host,port,url,version:META.version,installationId:tfInstallationId(),startedAt:new Date().toISOString(),admitted:TERRAFORMER_ACCESS.admitted,executableIdentity:tfExecutableIdentity(),entryFlow:'DESKTOP_NATIVE_AUTH_OVERLAY'},null,2)+'\n',{mode:0o600});fs.renameSync(tmp,tfPresentationRecordPath());}

