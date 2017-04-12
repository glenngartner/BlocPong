/**
 * Created by glenngartner on 3/14/17.
 */

export class PongRender extends THREE.WebGLRenderer{

    constructor(
        public scene: THREE.Scene,
        public camera: THREE.Camera
    ){
        super({
            antialias: true,
            canvas: <HTMLCanvasElement>document.getElementById('renderCanvas')
        });
        this.setSize(window.innerWidth, window.innerHeight);
        this.setClearColor(0x8bfff8, 1);
        document.body.appendChild(this.domElement);
        this.animate();
    }

    animate=()=>{
        requestAnimationFrame(this.animate);
        this.render(this.scene, this.camera);
    }
}
