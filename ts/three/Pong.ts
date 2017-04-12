/**
 * Created by glenn on 4/11/2017.
 */
/**
 * Created by glenn on 2/28/2017.
 */
import {Paddle} from "./Paddle";
import {PongCamera} from "./Camera";
import {PongRender} from "./PongRender";
import {PongLight} from "./PongLight";
import {Background} from "./Background";

export class Pong {

    constructor() {

        // basic scene setup (scene, camera, renderer, and light
        let scene = new THREE.Scene();
        let camera = new PongCamera({x:0, y:30, z:0}, {x:-Math.PI/2, y:0, z:0});
        let renderer = new PongRender(scene, camera);
        let background = new Background(scene);
        let centerLight = new PongLight(0xFFFFFF, scene,{x:0, y:10, z:0}, 2);

        // create paddles
        let paddleDims = {x: 1, y: 0.5, z: 4};
        let compPaddle = new Paddle(paddleDims, {x:-14, y:0, z:0}, 0xFF0000, scene);
        let playerPaddle = new Paddle(paddleDims, {x:14, y:0, z:0}, 0xFFFF00, scene);

        // sample cube camera
        // let cubeCamera = new THREE.CubeCamera(.1, 2000, 256);
        // cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
        // cubeCamera.updateCubeMap(renderer, scene);
        // scene.add(cubeCamera);

        // sample sphere
        let sphere = new THREE.Mesh(
            new THREE.SphereBufferGeometry(1, 32, 16),
            new THREE.MeshStandardMaterial(
                {
                    roughness: .25,
                    metalness: 1,
                    shading: THREE.SmoothShading
                    // envMap: cubeCamera.renderTarget.texture
                }
            ));
        scene.add(sphere);

        // create game board
        let board = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(50, 25),
            new THREE.MeshStandardMaterial(
                {
                    roughness: .25,
                    metalness: 1
                    // shading: THREE.SmoothShading,
                    // envMap: cubeCamera.renderTarget.texture
                }
            )
        );
        board.rotateX(-Math.PI/2);
        board.position.setY(-.15);
        // scene.add(board);
    }
}
