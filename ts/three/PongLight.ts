
export class PongLight extends THREE.PointLight {

    constructor(
        private col: number,
        private scene: THREE.Scene,
        private loc: vector3 = { x: 0, y: 0, z: 0 },
        private bright: number = 1
    ) {
        super();
        this.color = new THREE.Color(col);
        this.intensity = bright;
        this.positionLight(loc);
        this.scene.add(this);
    }

    positionLight(loc: vector3) {
        this.position.set(loc.x, loc.y, loc.z);
    }
}