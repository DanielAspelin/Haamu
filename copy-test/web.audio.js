'use strict';

/**
 * Haamu Web Audio — web-family audio processor, allocator and composer.
 *
 * Mirrors WebText responsibility boundaries for audio without assuming device
 * permission or playback authority. Final playback belongs to Browser Output.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const finiteAudio=(value,fallback)=>Number.isFinite(Number(value))?Number(value):fallback;

const HaamuWebAudio=Object.freeze({
  family:'web', role:'web.audio', type:'audio-processor-allocator-composer', version:'0.1.0',

  process(value, options={}) {
    return Object.freeze({
      type:'audio',
      source:value,
      sampleRate:finiteAudio(options.sampleRate,48000),
      channels:Math.max(1,Math.trunc(finiteAudio(options.channels,2))),
      duration:Math.max(0,finiteAudio(options.duration,0)),
      format:String(options.format ?? 'unknown'),
    });
  },

  allocate(value, options={}) {
    const record=this.process(value,options);
    const start=Math.max(0,finiteAudio(options.start,0));
    return Object.freeze({
      type:'audio-allocation', start,
      end:start+record.duration, duration:record.duration,
      units:'seconds', record,
    });
  },

  composition(plate, value, options={}) {
    if (!plate || plate.type!=='web-plate') throw new TypeError('WebAudio target must be a Plate.');
    const record=this.process(value,options);
    const matrix=plate.generateMatrix({rows:1,columns:1,cells:[{
      row:0,column:0,id:'audio:0',text:String(options.label ?? 'audio')
    }]});
    const grid=plate.generateGrid(options.grid ?? {});
    const mesh=plate.generateMesh({...(options.mesh ?? {}),animationScope:'audio'});
    return Object.freeze({plateId:plate.id,record,matrix,grid,mesh});
  },

  processForPlate(value, plate, options={}) {
    return Object.freeze({type:'plate-audio-processing',target:plate.id,...this.composition(plate,value,options)});
  },
});

globalThis.HaamuFamilies['web.audio']=Object.freeze({
  family:HaamuWebAudio.family, role:HaamuWebAudio.role,
  type:HaamuWebAudio.type, version:HaamuWebAudio.version,
});
globalThis.HaamuWebAudio=HaamuWebAudio;
