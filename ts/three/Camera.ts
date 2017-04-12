
export class PongCamera extends THREE.PerspectiveCamera {

    constructor(
        public loc: vector3 = {x:0, y:10, z:0},
        public rot: vector3 = {x: -Math.PI/2, y: 0, z:0}
    ){
        super(35, window.innerWidth / window.innerHeight, 0.1, 1000);
        // this.position.z = 10;
        this.setPosition(loc, rot);

        this.setControls();
    }

    setPosition(loc: vector3, rot: vector3){
        this.position.set(loc.x, loc.y, loc.z);
        this.rotateX(rot.x);
    }

    setControls(){
        let controls = new THREE.OrbitControls(this);
    }
}
