import {Camera} from "./Camera";
import {Render} from "./Render";
import {Mesh} from "./Mesh";
import {ActorManager} from "../core/ActorManager";


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

    addEvent(){
        this._canvas.addEventListener("click", ev=>{
            console.log("threejs canvas has been clicked");
        })
    };

    highlightActor(actor:Actor){
        console.log("threejs actor should be highlighted now");
        let outline = new THREE.OutlineEffect( this._renderer, {defaultThickNess: 0.01, defaultColor: new THREE.Color( 0x888888 ),
        defaultAlpha: 0.8, defaultKeepAlive: true } );
    };

    removeHighlight(actor:Actor){};

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

    render() {
        console.log("threejs renderer started");
        this._renderer = new Render(this._scene, this._camera);
        this._renderer.LoopFunction = this.checkActorState;
    };

}