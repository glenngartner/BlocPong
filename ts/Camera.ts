/**
 * Created by glenngartner on 3/14/17.
 */

import * as THREE from "three";

export class PongCamera extends THREE.PerspectiveCamera {

    constructor(){
        super(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // this.position.z = 10;
        this.setPosition();
    }

    setPosition(){
        this.position.y = -10;
        this.rotateX(Math.PI/2);
    }
}
