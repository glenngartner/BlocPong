import * as THREE from "three";

export class PongLight extends THREE.PointLight {

    constructor(
        private col: number,
        private scene: THREE.Scene,
        private loc: location = { x: 0, y: 0, z: 0 },
        private bright: number = 1
    ) {
        super();
        this.color = new THREE.Color(col);
        this.intensity = bright;
        this.positionLight(loc);
        this.scene.add(this);
    }

    positionLight(loc: location) {
        this.position.set(loc.x, loc.y, loc.z);
    }
}
