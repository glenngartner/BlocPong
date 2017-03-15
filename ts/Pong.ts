/**
 * Created by glenn on 2/28/2017.
 */
import * as THREE from "three";
import {Paddle} from "./Paddle";
import {PongCamera} from "./Camera";
import {PongRender} from "./PongRender";
import {PongLight} from "./PongLight";

export class Pong {

    constructor() {
        let scene = new THREE.Scene();
        let camera = new PongCamera();
        let renderer = new PongRender(scene, camera);
        // let leftLight = new PongLight(0xFFFFFF, scene,{x:-10, y:10, z:0}, 2);
        // let rightLight = new PongLight(0xFFFFFF, scene,{x:10, y:10, z:0}, 2);
        let centerLight = new PongLight(0xFFFFFF, scene,{x:0, y:10, z:0}, 2);

        let paddleDims = {width: 1, height: 0.5, depth: 4};
        let compPaddle = new Paddle(paddleDims, {x:-14, y:0, z:0}, 0xFF0000, scene);
        let playerPaddle = new Paddle(paddleDims, {x:14, y:0, z:0}, 0xFFFF00, scene);
    }
}
