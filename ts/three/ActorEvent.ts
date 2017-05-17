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
    overMesh: THREE.Mesh | THREE.Object3D;
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
                if (intersects[0].object) {

                    this.selectedMesh = intersects[0].object;
                }
                this.pickedPoint = intersects[0].point;
                this.deltaPosition = this.mouseOver3DPoint.sub(this.selectedMesh.position);
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

            if (this.selectedMesh && this.actorManager.actorPropertyValue(this.selectedMesh.name, "draggable")) {
                this.actorManager.changeActorPropertyValue(this.selectedMesh.name, "isDragging", false);
                this.actorManager.changeActorPropertyValue(this.selectedMesh.name, "selected", false);
                this.selectedMesh = null;
            }

            this.clicked = false;
            this._camera.enableOrbitControls();
        })
    }

    trackCursor() {
        this._canvas.addEventListener("pointermove", (e) => {

            let rayCaster = new THREE.Raycaster();

            let mouse2D = new THREE.Vector2(
                ( (e.clientX - this._renderer.domElement.offsetLeft) / this._renderer.domElement.clientWidth) * 2 - 1,
                -( ( e.clientY - this._renderer.domElement.offsetTop ) / this._renderer.domElement.clientHeight ) * 2 + 1);

            rayCaster.setFromCamera(mouse2D, this._camera);

            let intersects = rayCaster.intersectObjects(this._scene.children);

            //check for the presence of an intersection, but also that the mouse is over a mesh
            // if the mouse is over the background, the changeActorProperty() will not have a position for the cursor
            // in 3D space, and will return an error when told to move this actor to the cursor location
            // over an infinite background

            if (intersects.length > 0 && intersects[0].object) {

                this.mouseOver3DPoint = intersects[0].point;
                this.overMesh = intersects[0].object;
            }

            // since this updates every mouseMove frame, and an object may not have been selected
            // yet, make sure there's a selected mesh before setting its property value (or you'll
            // throw an error

            if (this.selectedMesh) {
                if (this.actorManager.actorPropertyValue(this.selectedMesh.name, "draggable")) {
                    this.actorManager.changeActorPropertyValue(this.selectedMesh.name, "isDragging", true);
                    this.changeGenericMeshLocationValues();
                }
            }

            // let mode = "direct";
            // if (mode == "linear" && this.clicked) {
            //     // use a linear or smooth movement from first click point
            //     let newMouseY = this._scene.pointerY;
            //     let mouseYDelta = this.mouseDownY - newMouseY;
            //     let deltaFactor = -.001;
            //     let moveAmount = mouseYDelta * deltaFactor;
            //     actor.location.x += moveAmount;
            // } else if (mode == "direct" && this.clicked) {
            //     // use exact mouse position
            //     let pickResult = this._scene.pick(this._scene.pointerX, this._scene.pointerY);
            //     if (pickResult) {
            //         actor.location.x = pickResult.pickedPoint.x;
            //     }
            // }
        })
    }

    changeGenericMeshLocationValues() {
        let genericActor = this.actorManager.returnActorByName(this.selectedMesh.name);

        // this check is necessary, because some meshes may not be generated using the
        // babylon actor creation method, so they don't have the generic location property
        if (genericActor.location) {

            genericActor.location.x = this.mouseOver3DPoint.z - this.deltaPosition.z;
            genericActor.location.y = this.mouseOver3DPoint.y - this.deltaPosition.y;
            genericActor.location.z = this.mouseOver3DPoint.x - this.deltaPosition.x;
        }
    }

}