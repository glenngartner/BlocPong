import {renderers} from "./renderer_config";
import {BabylonRenderer} from "../babylon/BabylonRenderer";
import {ThreeRenderer} from "../three/ThreeRenderer";

export class GenericRenderer implements Renderer {

    framework: Renderer;

    constructor(private renderers: Array<string>) {
        this.selectRenderer(renderers);
    }

    selectRenderer(renderers: Array<string>) {
        for (let renderer of renderers) {
            if (renderer == "babylonjs") {
                this.framework = new BabylonRenderer();
            } else if (renderer == "threejs") {
                this.framework = new ThreeRenderer();
            }
        }
    }

    createScene() {
        this.framework.createScene();
    };

    createCamera(){
        this.framework.createCamera();
    }

    createBackground() {
        this.framework.createBackground();
    }

    createActor(actor:Actor) {
        this.framework.createActor(actor);
    };

    createMaterial(){
        this.framework.createMaterial();
    };

    createDirectionalLight() {
        this.framework.createDirectionalLight();
    };

    render() {
        this.framework.render();
    };

}
