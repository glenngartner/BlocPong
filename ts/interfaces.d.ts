import {Render} from "./three/Render";
import {ActorManager} from "./core/ActorManager";

export interface rendererConfig {
    three: boolean,
    babylon: boolean
}

export interface vector3 {
    x: number,
    y: number,
    z: number
}

export interface Actor {
    name?: string,
    selectable?: boolean,
    selected?: boolean,
    draggable?: boolean,
    isDragging?:boolean,
    isRigidBody?:boolean,
    type?: string,
    location?: vector3,
    rotation?: vector3,
    scale?: vector3,
    color?: string,
    colorTex?: string,
    metal?: number,
    metalTex?: string,
    roughness?: number,
    roughnessTex?: string,
    normalTex?: string,
    envColor?: number,
    envTex?: string
}

export interface Renderer {
    _type: string;
    createScene();
    createCamera();
    createBackground();
    createActor(actor: Actor);
    createMaterial();
    createDirectionalLight();
    addEvent();
    render();
}

export interface RendererInstance extends Renderer {
    _scene: BABYLON.Scene | THREE.Scene;
    _camera: BABYLON.Camera | THREE.Camera;
    _light: BABYLON.Light | THREE.Light;
    // highlightActor(actor:Actor);
    // removeHighlight(actor:Actor);
    // startDragging(actor:Actor);
    // stopDragging(actor:Actor);
    // checkActorState(prop?: string, value?: string | number | boolean, trueFunc?: Function, falseFunc?: Function);
}

export interface ActorEventInterface {
    _scene: THREE.Scene | BABYLON.Scene;
    _canvas: HTMLCanvasElement;
    _camera?: THREE.Camera | BABYLON.Camera;
    _renderer?: Render;
    actorManager: ActorManager;
    makeSelectable();
}
