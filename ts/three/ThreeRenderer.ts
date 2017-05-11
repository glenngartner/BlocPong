import {Camera} from "./Camera";
import {Render} from "./Render";
import {Mesh} from "./Mesh";
import {ActorManager} from "../core/ActorManager";
import {ActorEvent} from "./ActorEvent";
import {RendererInstance} from "../interfaces";
import {Actor} from "../interfaces";


export class ThreeRenderer implements RendererInstance {

    _type: string = "threeJS";
    _canvas: HTMLCanvasElement;
    _scene: THREE.Scene;
    _camera: Camera;
    _light: THREE.DirectionalLight;
    _renderer: Render;

    constructor(private actorManager: ActorManager){

    }

    createScene() {
        console.log("threejs scene created!");
        this._canvas = <HTMLCanvasElement>document.getElementById("threeCanvas");
        this._scene = new THREE.Scene();
    };

    createCamera(){
        console.log("threejs camera is created");
        this._camera = new Camera({x:0, y:30, z:0}, {x:-Math.PI/2, y:0, z:0});
    };

    createBackground(){};

    //TODO: make this method more generic, so it can stand alone.
    createActor(actor: Array<Actor>) {
        console.log("threejs actor created!");

        // create the game board
        let board = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(50, 25),
            new THREE.MeshStandardMaterial(
                {
                    color:"white",
                    roughness: 1
                    // metalness: 0
                    // shading: THREE.SmoothShading,
                    // envMap: cubeCamera.renderTarget.texture
                }
            )
        );
        board.rotateX(-Math.PI/2);
        board.position.setY(-.15);
        this._scene.add(board);
        //
        // // create the paddles
        let paddleDims = {x: 1, y: 0.5, z: 4};
        let mesh = new Mesh(actor, this._scene);
    };

    createMaterial(){};

    createDirectionalLight() {
        let centerLight = new THREE.HemisphereLight("white", "brown", 2);
        this._scene.add(centerLight);
        console.log("threejs sunlight created!");
    };

    //TODO: refactor this event, to exist outside this class
    addEvent(){
        let eventManager = new ActorEvent(this._scene, this._canvas, this._camera, this._renderer, this.actorManager);
        eventManager.makeSelectable();
    };

    highlightActor(actor:Actor){
        let meshToHighlight = this._scene.getObjectByName(actor.name);
        // console.log("threejs mesh selected: " + this._scene.getObjectByName(actor.name).name);
        meshToHighlight.getObjectByName("outline").visible = true;
    };

    removeHighlight(actor:Actor){
        let meshToRemoveHighlight = this._scene.getObjectByName(actor.name);
        meshToRemoveHighlight.getObjectByName("outline").visible = false;
    };

    checkActorState=()=>{
        // console.log("threejs is constantly checking actor state");
        let actorList = this.actorManager.getActors;

        // identify the selected actor, per the generic renderer actor list
        for (let actor of actorList){
            if (actor.selected == true){
                this.highlightActor(actor);
            } else {
                this.removeHighlight(actor);
            }
        }
    };

    // TODO: make this function usable, generic, and escape the one above (requires rework of render class
    // checkActorState(prop: string, value: string | number | boolean, trueFunc: (actor:Actor)=>void, falseFunc: Function) {
    //
    //     let actorList = this.actorManager.getActors;
    //
    //     for (let actor of actorList) {
    //         if (actor[prop] == value) {
    //             trueFunc(actor);
    //         } else {
    //             falseFunc(actor);
    //         }
    //     }
    // }

    render() {
        console.log("threejs renderer started");
        this._renderer = new Render(this._scene, this._camera);
        this._renderer.LoopFunction = this.checkActorState;
    };

}