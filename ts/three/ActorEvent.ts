import {ActorManager} from "../core/ActorManager";
import {Render} from "./Render";
import {ActorEventInterface} from "../interfaces";
/**
 * Created by glenn on 5/10/2017.
 */

export class ActorEvent implements ActorEventInterface {

    constructor(public _scene: THREE.Scene,
                public _canvas: HTMLCanvasElement,
                public _camera: THREE.Camera,
                public _renderer: Render,
                public actorManager: ActorManager) {

    }

    makeSelectable() {
        this._canvas.addEventListener("click", (e) => {
            console.log("threejs canvas has been clicked");
            let rayCaster = new THREE.Raycaster();
            let mouseX = e.pageX;
            let mouseY = e.pageY;

            // crazy math to account for the offset of the canvas on the page :)
            let mouse2D = new THREE.Vector2(
                ( (e.clientX - this._renderer.domElement.offsetLeft) / this._renderer.domElement.clientWidth) * 2 - 1,
                -( ( e.clientY - this._renderer.domElement.offsetTop ) / this._renderer.domElement.clientHeight ) * 2 + 1);
            rayCaster.setFromCamera(mouse2D, this._camera);

            let intersects = rayCaster.intersectObjects(this._scene.children);
            console.log(intersects);
            if (intersects.length > 0) {
                let selectedObject = intersects[0].object;
                console.log("threeJS actor selected: " + selectedObject.name);
                this.actorManager.changeActorPropertyValue(intersects[0].object.name, "selected", true);
            } else {
                console.log("nothing was hit, apparently");
            }

        })
    }
}