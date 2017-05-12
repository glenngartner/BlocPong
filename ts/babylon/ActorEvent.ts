import {ActorEventInterface} from "../interfaces";
import {ActorManager} from "../core/ActorManager";
/**
 * Created by glenn on 5/11/2017.
 */

export class ActorEvent implements ActorEventInterface {

    mouseDownX: number;
    mouseDownY: number;
    meshStartPosX: number;
    clicked: boolean = false;

    constructor(public _scene: BABYLON.Scene,
                public _canvas: HTMLCanvasElement,
                public actorManager: ActorManager,
                public _camera: BABYLON.Camera) {
    }

    makeSelectable() {
        this._canvas.addEventListener("click", (ev) => {
            this.clicked = true;
            let pickResult = this._scene.pick(this._scene.pointerX, this._scene.pointerY);
            this.mouseDownX = this._scene.pointerX;
            this.mouseDownY = this._scene.pointerY;
            this.meshStartPosX = pickResult.pickedMesh.position.x;

            if (pickResult) {
                console.log("babylon scene picked!");
                let pickedMesh = pickResult.pickedMesh;
                this.actorManager.changeActorPropertyValue(pickedMesh.name, "selected", true);
                if (this.actorManager.actorPropertyValue(pickedMesh.name, "draggable") == true) {
                    this.actorManager.changeActorPropertyValue(pickedMesh.name, "isDragging", true);
                }
            }
        })
    }
}