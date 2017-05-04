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
            }

            if (renderer == "threejs") {
                this.frameworks.push(new ThreeRenderer());
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

                case "render": renderer.render();
                break;
            }
        }
    }

    createScene() {
        this.do("createScene");
        // for (let framework of this.frameworks){framework.createScene()};
    };

    createCamera() {
        // for (let framework of this.frameworks){framework.createCamera()};
        this.do("createCamera");
    }

    createBackground() {
        // for (let framework of this.frameworks){framework.createBackground()};
        this.do("createBackground");
    }

    createActor(actor: Actor) {
        for (let framework of this.frameworks){framework.createActor(actor)};
        // this.do("createActor", arguments);
    };
    createMaterial() {
        this.do("createMaterial");
    };

    createDirectionalLight() {
        this.do("createDirectionalLight");
        // for (let framework of this.frameworks){framework.createDirectionalLight()};
    };

    render() {
        this.do("render");
        // for (let framework of this.frameworks){framework.render()};
    };

}
