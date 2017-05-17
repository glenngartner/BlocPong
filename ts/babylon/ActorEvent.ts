import {Actor, ActorEventInterface} from "../interfaces";
import {ActorManager} from "../core/ActorManager";
/**
 * Created by glenn on 5/11/2017.
 */

export class ActorEvent implements ActorEventInterface {

    mouseDownX: number;
    mouseDownY: number;
    clicked: boolean = false;
    mouseOver3DPoint: BABYLON.Vector3;
    selectedMesh: BABYLON.Mesh | BABYLON.AbstractMesh;
    overMesh: BABYLON.Mesh | BABYLON.AbstractMesh;
    deltaPosition: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);

    constructor(public _scene: BABYLON.Scene,
                public _canvas: HTMLCanvasElement,
                public actorManager: ActorManager,
                public _camera: BABYLON.Camera) {
    }

    // starts the mouse click and selection events for all meshes in the scene
    // also changes the isDragging property for the generic actor, if the selected mesh draggable property is set to true
    makeSelectable() {
        this._canvas.addEventListener("pointerdown", (ev) => {

            this.clicked = true;
            let pickResult = this._scene.pick(this._scene.pointerX, this._scene.pointerY);
            this.mouseDownX = this._scene.pointerX;
            this.mouseDownY = this._scene.pointerY;

            if (pickResult.hit) {

                // this check is required because the pickResult may return true, but there may not always be a mesh
                // attached to it (like clicking the background. So, an error is thrown in the case of a background click
                // if you try to change the value of a property that doesn't exist on a pick result (like the background)
                if (pickResult.pickedMesh) {

                    this.selectedMesh = pickResult.pickedMesh;
                    this.mouseOver3DPoint = pickResult.pickedPoint;

                    // set the initial delta between the pointer click 3D position and the selected object's 3D position
                    // this prevents the object from snapping to the pointer 3D position immediately
                    this.deltaPosition = this.mouseOver3DPoint.subtract(this.selectedMesh.position)

                    this.actorManager.changeActorPropertyValue(this.selectedMesh.name, "selected", true);

                    // if the selected mesh is draggable, start dragging it, as well
                    if (this.actorManager.actorPropertyValue(this.selectedMesh.name, "draggable")) {
                        this._scene.activeCamera.detachControl(this._canvas);
                    }

                }
            }
        })
    }

    afterSelection() {
        this._canvas.addEventListener("pointerup", (ev) => {

            if(this.actorManager.actorPropertyValue(this.selectedMesh.name, "draggable")){
                this.actorManager.changeActorPropertyValue(this.selectedMesh.name, "isDragging", false);
                this.actorManager.changeActorPropertyValue(this.selectedMesh.name, "selected", false);
                this.selectedMesh = null;
            }

            this.clicked = false;
            this._scene.activeCamera.attachControl(this._canvas);
        })
    }

    // always tracks the cursor intersect position in 3D space
    trackCursor() {
        this._canvas.addEventListener("pointermove", (ev) => {

            let pickedPoint = this._scene.pick(this._scene.pointerX, this._scene.pointerY);

            //check for the presence of an intersection, but also that the mouse is over a mesh
            // if the mouse is over the background, the changeActorProperty() will not have a position for the cursor
            // in 3D space, and will return an error when told to move this actor to the cursor location
            // over an infinite background

            if (pickedPoint && pickedPoint.pickedMesh) {
                this.mouseOver3DPoint = pickedPoint.pickedPoint;
                this.overMesh = pickedPoint.pickedMesh;
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

            genericActor.location.x = this.mouseOver3DPoint.x - this.deltaPosition.x;
            genericActor.location.y = this.mouseOver3DPoint.y - this.deltaPosition.y;
            genericActor.location.z = this.mouseOver3DPoint.z - this.deltaPosition.z;
        }
    }
}