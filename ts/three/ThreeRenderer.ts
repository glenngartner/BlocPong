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
        this._canvas.addEventListener("click", (e)=>{
            console.log("threejs canvas has been clicked");
            let rayCaster = new THREE.Raycaster();
            let mouseX = e.pageX;
            let mouseY = e.pageY;

            // crazy math to account for the offset of the canvas on teh page :)
            let mouse2D = new THREE.Vector2(
                ( (e.clientX - this._renderer.domElement.offsetLeft) / this._renderer.domElement.clientWidth) * 2 - 1,
                -( ( e.clientY - this._renderer.domElement.offsetTop ) / this._renderer.domElement.clientHeight ) * 2 + 1);
            rayCaster.setFromCamera(mouse2D, this._camera);

            let intersects = rayCaster.intersectObjects(this._scene.children);
            console.log(intersects);
            if (intersects.length > 0 ){
                let selectedObject = intersects[0].object;
               console.log("threeJS actor selected: " + selectedObject.name);
               this.actorManager.changeActorPropertyValue(intersects[0].object.name, "selected", true);
            } else {
                console.log("nothing was hit, apparently");
            }

        })
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

    render() {
        console.log("threejs renderer started");
        this._renderer = new Render(this._scene, this._camera);
        this._renderer.LoopFunction = this.checkActorState;
    };

}