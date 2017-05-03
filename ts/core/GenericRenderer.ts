import {renderers} from "./renderer_config";
import {BabylonRenderer} from "../babylon/BabylonRenderer";
import {ThreeRenderer} from "../three/ThreeRenderer";

export class GenericRenderer implements Renderer {

    _type: "generic";
    frameworks: Array<Renderer>;

    get getFrameworks(): Array<Renderer>{
        let frameworks = this.frameworks;
        return frameworks;
    }

    constructor(private renderers: Array<string>) {
        this.frameworks = [];
        this.selectRenderer(renderers);
    }

    selectRenderer(renderers: Array<string>) {
        for (let renderer of renderers) {
            if (renderer == "babylonjs") {
                this.frameworks.push(new BabylonRenderer());
                console.log("using babylonJS");
            } if (renderer == "threejs") {
                this.frameworks.push(new ThreeRenderer());
                console.log("using threeJS");
            }
        }
    }

    do(array: Array<Renderer>, func: Function) {
        for (let renderer of array) {
            // renderer.func;
        }
    }

    createScene() {
        for (let framework of this.frameworks){framework.createScene();
        }
    };

    createCamera() {
        for (let framework of this.frameworks){framework.createCamera();
        }
    }

    createBackground() {
        for (let framework of this.frameworks){framework.createBackground()};
    }

    createActor(actor: Actor) {
        for (let framework of this.frameworks){framework.createActor(actor)};
    };

    createMaterial() {
        for (let framework of this.frameworks){framework.createMaterial()};
    };

    createDirectionalLight() {
        for (let framework of this.frameworks){framework.createDirectionalLight()};
    };

    render() {
        for (let framework of this.frameworks){framework.render()};
    };

}
