import {ActorManager} from "../core/ActorManager";
import {Actor} from "../interfaces";
/**
 * Created by glenngartner on 3/14/17.
 */

export class Render extends THREE.WebGLRenderer {

    constructor(public _scene: THREE.Scene,
                public camera: THREE.Camera,
                public actorManager: ActorManager) {
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

    checkActorState(prop: string, value: string | number | boolean, trueFunc: (actor:Actor)=>void, falseFunc: Function) {

        let actorList = this.actorManager.getActors;

        for (let actor of actorList) {
            if (actor[prop] == value) {
                trueFunc(actor);
            } else {
                falseFunc(actor);
            }
        }
    }

    highlightActor=(actor:Actor)=>{
        let meshToHighlight = this._scene.getObjectByName(actor.name);
        meshToHighlight.getObjectByName("outline").visible = true;
    };

    removeHighlight=(actor:Actor)=>{
        let meshToRemoveHighlight = this._scene.getObjectByName(actor.name);
        meshToRemoveHighlight.getObjectByName("outline").visible = false;
    };

    startDragging=(actor:Actor)=>{
        if(actor.draggable == true){
            actor.isDragging = true;
            this._scene.getObjectByName(actor.name).position.z += 1;
        }
    }

    stopDragging=(actor:Actor)=>{
        actor.isDragging = false;
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.render(this._scene, this.camera);
        // this.loopThisFunction();
        // this.loopRenderFunctions();
        this.checkActorState("selected", true, this.highlightActor, this.removeHighlight);
        this.checkActorState("selected", true, this.startDragging, this.stopDragging);
    }
}
