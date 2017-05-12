import {ActorManager} from "../core/ActorManager";
import {Render} from "./Render";
import {ActorEventInterface} from "../interfaces";
/**
 * Created by glenn on 5/10/2017.
 */

export class ActorEvent implements ActorEventInterface {

    mouseDownX: number;
    mouseDownY: number;
    mouseMoveX: number;
    mouseMoveY: number;
    pickedPoint: THREE.Vector3;
    clicked:boolean = false;

    constructor(public _scene: THREE.Scene,
                public _canvas: HTMLCanvasElement,
                public _camera: THREE.Camera,
                public _renderer: Render,
                public actorManager: ActorManager) {

    }

    makeSelectable() {
        this._canvas.addEventListener("click", (e) => {
            this.clicked = true;
            console.log("threejs canvas has been clicked");
            let rayCaster = new THREE.Raycaster();
            this.mouseDownX = e.pageX;
            this.mouseDownY = e.pageY;

            // crazy math to account for the offset of the canvas on the page :)
            let mouse2D = new THREE.Vector2(
                ( (e.clientX - this._renderer.domElement.offsetLeft) / this._renderer.domElement.clientWidth) * 2 - 1,
                -( ( e.clientY - this._renderer.domElement.offsetTop ) / this._renderer.domElement.clientHeight ) * 2 + 1);
            rayCaster.setFromCamera(mouse2D, this._camera);

            let intersects = rayCaster.intersectObjects(this._scene.children);
            console.log(intersects);
            if (intersects.length > 0) {
                let selectedObject = intersects[0].object;
                this.pickedPoint = intersects[0].point;
                console.log("threeJS actor selected: " + selectedObject.name);
                this.actorManager.changeActorPropertyValue(intersects[0].object.name, "selected", true);
                if(this.actorManager.actorPropertyValue(selectedObject.name, "draggable") == true){
                    this.actorManager.changeActorPropertyValue(selectedObject.name, "isDragging", true);
                }
            } else {
                console.log("nothing was hit, apparently");
            }

        })
        // this._canvas.addEventListener("mousemove", (e)=>{
        //     this.mouseMoveX = e.pageX;
        //     this.mouseMoveY = e.pageY;
        //     console.log("the three actor event sees the mouse moving over the threeJS renderer");
        // })
    }
}