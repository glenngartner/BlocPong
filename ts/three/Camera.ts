
export class PongCamera extends THREE.PerspectiveCamera {

    constructor(
        public loc: vector3 = {x:0, y:40, z:0},
        public rot: vector3 = {x: -Math.PI/2, y: -Math.PI/2, z:-Math.PI/2}
    ){
        super(35, window.innerWidth / window.innerHeight, 0.1, 1000);
        // this.position.z = 10;
        this.setPosition(loc, rot);

        this.setControls();
    }

    setPosition(loc: vector3, rot: vector3){
        this.position.set(loc.x, loc.y, loc.z);
        // this.rotateX(rot.x);
        // this.rotateZ(rot.z);
        // this.rotateY(rot.y);
        // this.rotateOnAxis(new THREE.Vector3(0, 1, 0), rot.z);
    }

    setControls(){
        let controls = new THREE.OrbitControls(this);
    }
}
