import {ActorEventInterface} from "../interfaces";
import {ActorManager} from "../core/ActorManager";
/**
 * Created by glenn on 5/11/2017.
 */

export class ActorEvent implements ActorEventInterface {

    constructor(public _scene: BABYLON.Scene,
                public _canvas: HTMLCanvasElement,
                public _camera: BABYLON.Camera,
                public actorManager: ActorManager) {
    }

    makeSelectable() {
        this._canvas.addEventListener("click", ev => {
            let pickResult = this._scene.pick(this._scene.pointerX, this._scene.pointerY);

            if (pickResult) {
                console.log("babylon scene picked!");
                this.actorManager.changeActorPropertyValue(pickResult.pickedMesh.name, "selected", true);
            }
        })
    }

}