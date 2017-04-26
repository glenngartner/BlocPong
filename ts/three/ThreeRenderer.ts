import {Camera} from "./Camera";
import {Render} from "./Render";
import {Paddle} from "./Paddle";


export class ThreeRenderer implements RendererInstance {

    _scene: THREE.Scene;
    _camera: Camera;
    _light: THREE.DirectionalLight;

    createScene() {
        console.log("threejs scene created!");
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
        let paddle = new Paddle(actor, this._scene);
    };

    createMaterial(){};

    createDirectionalLight() {
        console.log("threejs sunlight started!");
        let centerLight = new THREE.HemisphereLight("white", "brown", 2);
        this._scene.add(centerLight);
        console.log("threejs sunlight created!");
    };

    render() {
        console.log("threejs renderer started");
        let _renderer = new Render(this._scene, this._camera);
    };

}