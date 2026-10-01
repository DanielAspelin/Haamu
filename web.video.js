'use strict';

/**
 * Haamu Web Video — web-family video processor, allocator and composer.
 *
 * Mirrors WebText responsibility boundaries for video/frame data without
 * assuming camera permission, decoding hardware or presentation authority.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const finiteVideo=(value,fallback)=>Number.isFinite(Number(value))?Number(value):fallback;

const HaamuWebVideo=Object.freeze({
  family:'web', role:'web.video', type:'video-processor-allocator-composer', version:'0.1.0',

  process(value, options={}) {
    return Object.freeze({
      type:'video',
      source:value,
      width:Math.max(0,Math.trunc(finiteVideo(options.width,0))),
      height:Math.max(0,Math.trunc(finiteVideo(options.height,0))),
      frameRate:Math.max(0,finiteVideo(options.frameRate,0)),
      duration:Math.max(0,finiteVideo(options.duration,0)),
      format:String(options.format ?? 'unknown'),
    });
  },

  allocate(value, options={}) {
    const record=this.process(value,options);
    const start=Math.max(0,finiteVideo(options.start,0));
    return Object.freeze({
      type:'video-allocation', start,
      end:start+record.duration, duration:record.duration,
      units:'seconds', record,
    });
  },

  composition(plate, value, options={}) {
    if (!plate || plate.type!=='web-plate') throw new TypeError('WebVideo target must be a Plate.');
    const record=this.process(value,options);
    const matrix=plate.generateMatrix({rows:1,columns:1,cells:[{
      row:0,column:0,id:'video:0',text:String(options.label ?? 'video')
    }]});
    const grid=plate.generateGrid(options.grid ?? {});
    const mesh=plate.generateMesh({...(options.mesh ?? {}),animationScope:'video'});
    return Object.freeze({plateId:plate.id,record,matrix,grid,mesh});
  },

  processForPlate(value, plate, options={}) {
    return Object.freeze({type:'plate-video-processing',target:plate.id,...this.composition(plate,value,options)});
  },
});

globalThis.HaamuFamilies['web.video']=Object.freeze({
  family:HaamuWebVideo.family, role:HaamuWebVideo.role,
  type:HaamuWebVideo.type, version:HaamuWebVideo.version,
});
globalThis.HaamuWebVideo=HaamuWebVideo;
