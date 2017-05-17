import {ActorManager} from "../core/ActorManager";
import {Render} from "./Render";
import {ActorEventInterface} from "../interfaces";
import {Camera} from "./Camera";
/**
 * Created by glenn on 5/10/2017.
 */

export class ActorEvent implements ActorEventInterface {

    mouseDownX: number;
    mouseDownY: number;
    clicked: boolean = false;
    mouseOver3DPoint: THREE.Vector3;
    selectedMesh: THREE.Mesh | THREE.Object3D;
    overMesh: THREE.Mesh;
    pickedPoint: THREE.Vector3;
    deltaPosition: THREE.Vector3;

    constructor(public _scene: THREE.Scene,
                public _canvas: HTMLCanvasElement,
                public _camera: Camera,
                public _renderer: Render,
                public actorManager: ActorManager) {

    }

    makeSelectable() {
        this._canvas.addEventListener("pointerdown", (e) => {
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

            if (intersects.length > 0) {
                this.selectedMesh = intersects[0].object;
                this.pickedPoint = intersects[0].point;
                console.log("threeJS actor selected: " + this.selectedMesh.name);
                this.actorManager.changeActorPropertyValue(this.selectedMesh.name, "selected", true);
                if (this.actorManager.actorPropertyValue(this.selectedMesh.name, "draggable") == true) {
                    this._camera.disableOrbitControls();
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

    afterSelection() {
        this._canvas.addEventListener("pointerup", (ev) => {

            if (this.actorManager.actorPropertyValue(this.selectedMesh.name, "draggable")) {
                this.actorManager.changeActorPropertyValue(this.selectedMesh.name, "isDragging", false);
                this.actorManager.changeActorPropertyValue(this.selectedMesh.name, "selected", false);
                this.selectedMesh = null;
            }

            this.clicked = false;
            this._camera.enableOrbitControls();
        })
    }

    K
}