/**
 * Created by glenn on 4/11/2017.
 */
/**
 * Created by glenn on 2/28/2017.
 */
import {Mesh} from "./Mesh";
import {Camera} from "./Camera";
import {Render} from "./Render";
import {PongLight} from "./PongLight";
import {Background} from "./Background";

export class Pong {

    constructor(actor:Array<Actor>) {

        // remove the babylonjs required canvas element (three adds its own)

        // basic scene setup (scene, camera, renderer, and light
        let scene = new THREE.Scene();
        let camera = new Camera({x:0, y:30, z:0}, {x:-Math.PI/2, y:0, z:0});
        let renderer = new Render(scene, camera);
        // let background = new Background(scene);
        // let centerLight = new PongLight(0xFFFFFF, scene,{x:0, y:10, z:0}, 2);
        let centerLight = new THREE.HemisphereLight("white", "brown", 2);
        scene.add(centerLight);

        // create paddles
        let paddleDims = {x: 1, y: 0.5, z: 4};
        let compPaddle = new Mesh(actor, scene);
        // let playerPaddle = new Mesh(paddleDims, {x:14, y:0, z:0}, 0xFFFF00, scene);

        // create game board
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
        scene.add(board);
    }
}
