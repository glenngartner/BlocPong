/**
 * Created by glenngartner on 3/14/17.
 */

export class Render extends THREE.WebGLRenderer{

    private loopThisFunction: Function = f=>{};


    constructor(
        public scene: THREE.Scene,
        public camera: THREE.Camera
    ){
        super({
            antialias: true,
            canvas: <HTMLCanvasElement>document.getElementById('threeCanvas')
        });
        let canvas = document.getElementById('threeCanvas');
        let parent = canvas.parentElement;
        this.setSize(window.innerWidth/2, window.innerHeight/2);
        this.setClearColor(0x8bfff8, 1);
        document.body.appendChild(this.domElement);

        this.animate();
    }

    set LoopFunction(func: Function){
        this.loopThisFunction = func;
    }

    animate=()=>{
        requestAnimationFrame(this.animate);
        this.render(this.scene, this.camera);
        this.loopThisFunction();
    }
}
