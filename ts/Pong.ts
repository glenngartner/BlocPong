/**
 * Created by glenn on 2/28/2017.
 */
import * as THREE from "three";
import {Paddle} from "./Paddle";
import {PongCamera} from "./Camera";
import {PongRender} from "./PongRender";

export class Pong {

    constructor() {
        let scene = new THREE.Scene();
        let camera = new PongCamera();
        let renderer = new PongRender(scene, camera);

        let paddleDims = {width: 1, height: 0.5, depth: 4};
        let compPaddle = new Paddle(paddleDims, {x:-15, y:0, z:0}, scene);
        let playerPaddle = new Paddle(paddleDims, {x:15, y:0, z:0}, scene);

    }
}
