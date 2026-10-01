'use strict';
const TERRAFORMER_BROWSER_SYSTEM=Object.freeze({schema:'TERRAFORMER-BROWSER-SYSTEM/1',id:'system.browser',name:'Browser System',family:'presentation',type:'browser-integration-plane',mode:'host-detected',condition:'platform-dependent',state:'integrated',input:'admitted presentation URI',output:'host browser presentation',authority:'Terraformer Presentation -> Browser System -> detected browser implementation',subsystems:Object.freeze(['system.browser.firefox','system.browser.chrome','system.browser.safari']),capabilities:Object.freeze(['detect','select','launch','uri-presentation','dom-host']),persistence:false});

const TERRAFORMER_FIREFOX_SYSTEM=Object.freeze({schema:'TERRAFORMER-BROWSER-IMPLEMENTATION/1',id:'system.browser.firefox',name:'Firefox System',parent:'system.browser',family:'presentation',engine:'Gecko',platforms:Object.freeze(['linux','win32','darwin']),state:'registered',availability:'runtime-detected',persistence:false});

const TERRAFORMER_CHROME_SYSTEM=Object.freeze({schema:'TERRAFORMER-BROWSER-IMPLEMENTATION/1',id:'system.browser.chrome',name:'Chrome System',parent:'system.browser',family:'presentation',engine:'Blink',platforms:Object.freeze(['linux','win32','darwin']),state:'registered',availability:'runtime-detected',persistence:false});

const TERRAFORMER_SAFARI_SYSTEM=Object.freeze({schema:'TERRAFORMER-BROWSER-IMPLEMENTATION/1',id:'system.browser.safari',name:'Safari System',parent:'system.browser',family:'presentation',engine:'WebKit',platforms:Object.freeze(['darwin']),state:'registered',availability:'runtime-detected',persistence:false});

function tfBrowserAvailability(){const commandExists=c=>{try{const r=spawnSync(process.platform==='win32'?'where':'sh',process.platform==='win32'?[c]:['-c','command -v "$1" >/dev/null 2>&1','sh',c],{stdio:'ignore',timeout:1500});return !r.error&&r.status===0}catch{return false}},firefox=commandExists(process.platform==='win32'?'firefox.exe':'firefox'),chrome=process.platform==='darwin'?fs.existsSync('/Applications/Google Chrome.app'):commandExists(process.platform==='win32'?'chrome.exe':'google-chrome')||commandExists('chromium')||commandExists('chromium-browser'),safari=process.platform==='darwin'&&fs.existsSync('/Applications/Safari.app');return {schema:'TERRAFORMER-BROWSER-AVAILABILITY/1',platform:process.platform,browsers:{firefox:{registered:true,available:firefox},chrome:{registered:true,available:chrome},safari:{registered:true,available:safari,platformEligible:process.platform==='darwin'}},defaultOpener:process.platform==='win32'?'cmd/start':process.platform==='darwin'?'open':'xdg-open/gio',observationOnly:true}}
const {TERRAFORMER_HTML_SYSTEM}=require('./terraformer.html.js');
Object.assign(globalThis,{TERRAFORMER_HTML_SYSTEM});
const {TERRAFORMER_CSS_SYSTEM,TERRAFORMER_SYSTEM_DETECTION}=require('./terraformer.css.js');
Object.assign(globalThis,{TERRAFORMER_CSS_SYSTEM,TERRAFORMER_SYSTEM_DETECTION});
const {TERRAFORMER_KNOWLEDGE_SYSTEM,TERRAFORMER_KNOWLEDGE_TOOL_ORIENTATION,TERRAFORMER_LOCAL_SYSTEM_BOUNDARY,TERRAFORMER_GLOBAL_SYSTEM_BOUNDARY,TERRAFORMER_CLIENT_SERVER_ORIENTATION,TERRAFORMER_LOCAL_GLOBAL_BRIDGE,tfDetectSystemsForBoundary}=require('./terraformer.knowledge.js');
Object.assign(globalThis,{TERRAFORMER_KNOWLEDGE_SYSTEM,TERRAFORMER_KNOWLEDGE_TOOL_ORIENTATION,TERRAFORMER_LOCAL_SYSTEM_BOUNDARY,TERRAFORMER_GLOBAL_SYSTEM_BOUNDARY,TERRAFORMER_CLIENT_SERVER_ORIENTATION,TERRAFORMER_LOCAL_GLOBAL_BRIDGE,tfDetectSystemsForBoundary});
const {TERRAFORMER_DOM_SYSTEM}=require('./terraformer.dom.js');
Object.assign(globalThis,{TERRAFORMER_DOM_SYSTEM});
const {TERRAFORMER_JAVASCRIPT_SYSTEM}=require('./terraformer.javascript.js');
Object.assign(globalThis,{TERRAFORMER_JAVASCRIPT_SYSTEM});
const {TERRAFORMER_BASH_SYSTEM}=require('./terraformer.bash.js');
Object.assign(globalThis,{TERRAFORMER_BASH_SYSTEM});

module.exports=Object.freeze({TERRAFORMER_BROWSER_SYSTEM,TERRAFORMER_FIREFOX_SYSTEM,TERRAFORMER_CHROME_SYSTEM,TERRAFORMER_SAFARI_SYSTEM,tfBrowserAvailability});
