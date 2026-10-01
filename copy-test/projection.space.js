'use strict';

/**
 * Haamu Projection Space
 *
 * Renderer-disconnected structured projection model.
 * Plate geometry is input evidence only: Projection Space may derive coordinates
 * from it but may never resize, reposition, style, or otherwise mutate a Plate.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const finite=(value,fallback)=>Number.isFinite(Number(value))?Number(value):fallback;
const TYPES=Object.freeze(['text','plot','graph','tree','mind-map','diagram','image','video','vector','background','prompt','interaction']);

const HaamuProjectionSpace=Object.freeze({
  family:'projection',
  role:'projection.space',
  type:'sparse-hierarchical-vector-projection-space',
  version:'0.1.0',
  nodeTypes:TYPES,

  create(options={}){
    const plate=Object.freeze({
      id:String(options.plate?.id??options.plateId??'plate'),
      x:finite(options.plate?.x,0),
      y:finite(options.plate?.y,0),
      width:Math.max(0,finite(options.plate?.width,0)),
      height:Math.max(0,finite(options.plate?.height,0)),
      authority:'read-only',
    });
    const resolution=Object.freeze({
      columns:Math.max(1,Math.trunc(finite(options.resolution?.columns,4096))),
      rows:Math.max(1,Math.trunc(finite(options.resolution?.rows,4096))),
      allocation:'sparse',
    });
    return Object.freeze({
      type:'projection-space',
      id:String(options.id??plate.id+':projection'),
      plate,
      coordinateSystem:'plate-local-normalized-vector',
      resolution,
      hierarchy:Object.freeze({enabled:true,allocation:'on-demand'}),
      layers:Object.freeze([]),
      nodes:Object.freeze([]),
      rendererConnected:false,
      mayResizePlate:false,
      mayMovePlate:false,
      changesGeometry:false,
    });
  },

  address(space,point={}){
    if(space?.type!=='projection-space')throw new TypeError('Projection Space required.');
    const x=Math.max(0,Math.min(1,finite(point.x,0)));
    const y=Math.max(0,Math.min(1,finite(point.y,0)));
    const column=Math.min(space.resolution.columns-1,Math.floor(x*space.resolution.columns));
    const row=Math.min(space.resolution.rows-1,Math.floor(y*space.resolution.rows));
    return Object.freeze({type:'projection-address',x,y,row,column,key:row+':'+column});
  },

  node(space,options={}){
    if(space?.type!=='projection-space')throw new TypeError('Projection Space required.');
    const projectionType=String(options.projectionType??options.kind??'vector');
    if(!TYPES.includes(projectionType))throw new RangeError('Unknown projection type.');
    const bounds=Object.freeze({
      x:Math.max(0,Math.min(1,finite(options.bounds?.x,0))),
      y:Math.max(0,Math.min(1,finite(options.bounds?.y,0))),
      width:Math.max(0,Math.min(1,finite(options.bounds?.width,0))),
      height:Math.max(0,Math.min(1,finite(options.bounds?.height,0))),
    });
    return Object.freeze({
      type:'projection-node',
      id:String(options.id??projectionType+':node'),
      projectionType,
      bounds,
      matrix:Object.freeze({addressing:'sparse',spaceId:space.id}),
      grid:Object.freeze({enabled:!!options.grid,definition:options.grid??null}),
      mesh:Object.freeze({
        topology:options.mesh?.topology??'arbitrary',
        nodes:Object.freeze([...(options.mesh?.nodes??[])]),
        edges:Object.freeze([...(options.mesh?.edges??[])]),
      }),
      source:options.source??null,
      data:options.data??null,
      transform:Object.freeze({...options.transform}),
      lifecycle:options.lifecycle??'ready',
      interactive:!!options.interactive,
      rendererBinding:null,
      rendererConnected:false,
      mayResizePlate:false,
      mayMovePlate:false,
      changesGeometry:false,
    });
  },

  layer(space,options={}){
    if(space?.type!=='projection-space')throw new TypeError('Projection Space required.');
    return Object.freeze({
      type:'projection-layer',
      id:String(options.id??'layer'),
      spaceId:space.id,
      order:Math.trunc(finite(options.order,0)),
      role:String(options.role??'content'),
      nodeIds:Object.freeze([...(options.nodeIds??[])]),
      rendererConnected:false,
    });
  },

  delta(space,changes=[]){
    if(space?.type!=='projection-space')throw new TypeError('Projection Space required.');
    return Object.freeze({
      type:'projection-delta',
      spaceId:space.id,
      changes:Object.freeze([...(changes??[])]),
      scope:'dirty-regions-only',
      rendererConnected:false,
      changesGeometry:false,
    });
  },
});

globalThis.HaamuFamilies['projection.space']=Object.freeze({
  family:HaamuProjectionSpace.family,
  role:HaamuProjectionSpace.role,
  type:HaamuProjectionSpace.type,
  version:HaamuProjectionSpace.version,
});

globalThis.HaamuProjectionSpace=HaamuProjectionSpace;
