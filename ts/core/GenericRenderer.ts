import {renderers} from "./renderer_config";
import {BabylonRenderer} from "../babylon/BabylonRenderer";
import {ThreeRenderer} from "../three/ThreeRenderer";

export class GenericRenderer implements Renderer {

    framework: Renderer;
    framework2: Renderer;
    frameworks: Array<Renderer>;

    constructor(private renderers: Array<string>) {
        // this.selectRenderer(renderers);
        this.framework = new BabylonRenderer();
        this.framework2 = new ThreeRenderer(); 
    }

    selectRenderer(renderers: Array<string>) {
        for (let renderer of renderers) {
            if (renderer == "babylonjs") {
                this.framework = new BabylonRenderer();
            }
            if (renderer == "threejs") {
                this.framework2 = new ThreeRenderer();
            }
        }
    }

    createScene() {
        if (this.framework) this.framework.createScene();
        if (this.framework2) this.framework2.createScene();
    };

    createCamera() {
        if (this.framework) this.framework.createCamera();
        if (this.framework2) this.framework2.createCamera();
    }

    createBackground() {
        if (this.framework) this.framework.createBackground();
        if (this.framework2) this.framework2.createBackground();
    }

    createActor(actor: Actor) {
        if (this.framework) this.framework.createActor(actor);
        if (this.framework2) this.framework2.createActor(actor);
    };

    createMaterial() {
        if (this.framework) this.framework.createMaterial();
        if (this.framework2) this.framework2.createMaterial();
            };

    createDirectionalLight() {
        if (this.framework) this.framework.createDirectionalLight();
        if (this.framework2) this.framework2.createDirectionalLight();
            };

    render() {
        if (this.framework) this.framework.render();
        if (this.framework2) this.framework2.render();
    };

}
