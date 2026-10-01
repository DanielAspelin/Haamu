'use strict';
const TERRAFORMER_MARKDOWN_SYSTEM=Object.freeze({schema:'TERRAFORMER-MARKDOWN-SYSTEM/1',id:'system.markdown',name:'Markdown System',family:'document',type:'markdown-system',state:'integrated',canonicalPath:'terraformer://markup/markdown/',dependsOn:Object.freeze(['system.markup','system.text','system.document']),governs:Object.freeze(['markdown','block','inline','heading','paragraph','list','link','code','parse','serialize']),rule:'Markdown System is a text-markup specialization of Markup System. Markdown is not silently treated as HTML, executable code, or publication authority.'});

module.exports=Object.freeze({TERRAFORMER_MARKDOWN_SYSTEM});
