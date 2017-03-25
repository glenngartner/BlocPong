/**
 * Created by glenn on 2/28/2017.
 */
import {Paddle} from "./Paddle";
import {PongCamera} from "./Camera";
import {PongRender} from "./PongRender";
import {PongLight} from "./PongLight";

export class Pong {

    constructor() {
        // basic scene setup (scene, camera, renderer, and light
        let scene = new THREE.Scene();
        let camera = new PongCamera({x:0, y:30, z:0}, {x:-Math.PI/2, y:0, z:0});
        let renderer = new PongRender(scene, camera);
        let centerLight = new PongLight(0xFFFFFF, scene,{x:0, y:10, z:0}, 2);

        // create paddles
        let paddleDims = {x: 1, y: 0.5, z: 4};
        let compPaddle = new Paddle(paddleDims, {x:-14, y:0, z:0}, 0xFF0000, scene);
        let playerPaddle = new Paddle(paddleDims, {x:14, y:0, z:0}, 0xFFFF00, scene);
    }
}
