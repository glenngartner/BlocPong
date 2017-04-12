import * as tsPong from "../babylon/Pong";
import * as threePong from "../three/Pong";

export class Start {

    private renderer: rendererConfig;

    constructor(config:rendererConfig) {
        this.selectRenderer(config);
    }

    selectRenderer(config: rendererConfig) {
        if (config.babylon == true) {
            console.log("BabylonJS is active!");
            let pong = new tsPong.Pong();
        } else if (config.three == true) {
            console.log("threeJS is active!");
            let pong = new threePong.Pong();
        } else {
            console.log("You have no renderers active!");
        }
    }
}
