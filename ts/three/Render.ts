import {ActorManager} from "../core/ActorManager";
import {Actor} from "../interfaces";
import {ActorEvent} from "./ActorEvent";
/**
 * Created by glenngartner on 3/14/17.
 */

export class Render extends THREE.WebGLRenderer {

    constructor(private _scene: THREE.Scene,
                private camera: THREE.Camera,
                private actorManager: ActorManager,
                private actorEvent: ActorEvent,
                private _canvas: HTMLCanvasElement) {
        super({
            antialias: true,
            canvas: <HTMLCanvasElement>document.getElementById('threeCanvas')
        });
        let canvas = document.getElementById('threeCanvas');
        let parent = canvas.parentElement;
        this.setSize(window.innerWidth / 2, window.innerHeight / 2);
        this.setClearColor(0x8bfff8, 1);
        document.body.appendChild(this.domElement);

        this.animate();
    }

    checkActorState(prop: string, value: string
        | number
        | boolean, trueFunc: (actor: Actor) => void, falseFunc?: Function) {

        let actorList = this.actorManager.getActors;

        for (let actor of actorList) {
            if (actor[prop] == value) {
                trueFunc(actor);
            } else {
                if (falseFunc) {
                    falseFunc(actor);
                }
            }
        }
    }

    highlightActor = (actor: Actor) => {
        let meshToHighlight = this._scene.getObjectByName(actor.name);
        meshToHighlight.getObjectByName("outline").visible = true;
    };

    removeHighlight = (actor: Actor) => {
        let meshToRemoveHighlight = this._scene.getObjectByName(actor.name);
        meshToRemoveHighlight.getObjectByName("outline").visible = false;
    };

    updateMeshPosition = (actor: Actor) => {

        this._scene.getObjectByName(actor.name).position.x = actor.location.z;
        this._scene.getObjectByName(actor.name).position.y = actor.location.y;
        this._scene.getObjectByName(actor.name).position.z = actor.location.x;
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.render(this._scene, this.camera);
        this.checkActorState("selected", true, this.highlightActor, this.removeHighlight);
        this.checkActorState("isDragging", true, this.updateMeshPosition);
        this.checkActorState("isRigidBody", true, this.updateMeshPosition);
    }
}
