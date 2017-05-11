import {renderers} from "./renderer_config";
import {BabylonRenderer} from "../babylon/BabylonRenderer";
import {ThreeRenderer} from "../three/ThreeRenderer";
import {ActorManager} from "./ActorManager";
import {Actor, Renderer} from "../interfaces";

export class GenericRenderer implements Renderer {

    _type: string = "generic";
    frameworks: Array<Renderer>;

    constructor(public actorManager: ActorManager, private renderers: Array<string>) {
        this.frameworks = [];
        this.selectRenderer(renderers);
    }

    selectRenderer(renderers: Array<string>) {
        for (let renderer of renderers) {
            if (renderer == "babylonjs") {
                this.frameworks.push(new BabylonRenderer(this.actorManager));
                console.log("using babylonJS");
            }

            if (renderer == "threejs") {
                this.frameworks.push(new ThreeRenderer(this.actorManager));
                console.log("using threeJS");
            }
        }
    }

    private do(func: string, ...args ) {
        for (let renderer of this.frameworks) {
            switch (func) {
                case "createScene": renderer.createScene();
                break;

                case "createCamera": renderer.createCamera();
                break;

                case "createBackground": renderer.createBackground();
                break;

                case "createActor": renderer.createActor(args);
                // case "createActor": renderer.createActor.apply(renderer, args);
                break;

                case "createMaterial": renderer.createMaterial();
                break;

                case "createDirectionalLight": renderer.createDirectionalLight();
                break;

                case "addEvent": renderer.addEvent();
                break;

                case "render": renderer.render();
                break;
            }
        }
    }

    createScene() {
        this.do("createScene");
    };

    createCamera() {
        this.do("createCamera");
    }

    createBackground() {
        this.do("createBackground");
    }

    createActor(actor: Actor) {
        for (let framework of this.frameworks){framework.createActor(actor)};
    };
    createMaterial() {
        this.do("createMaterial");
    };

    createDirectionalLight() {
        this.do("createDirectionalLight");
    };

    addEvent(){
        this.do("addEvent");
    };

    render() {
        this.do("render");
    };

}
