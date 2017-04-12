import * as tsPong from "../babylon/Pong";
import * as threePong from "../three/Pong";
import {Setup} from "./setup";
import {Actor} from "./Actor";

export class Start {

    private renderer: rendererConfig;

    constructor(config:rendererConfig) {
        let paddle1 = new Actor(<Actor>{color: "#FF0000", location:{x:0, y:0.5, z:12}, scale:{x:6, y:1, z:1}});
        let paddle2 = new Actor(<Actor>{color: "#00FF00", location:{x:0, y:0.5, z:-12}, scale:{x:6, y:1, z:1}});
        this.selectRenderer(config, [paddle1, paddle2]);
        // let setup = new Setup(config);
    }

    selectRenderer(config: rendererConfig, actor:Actor) {
        if (config.babylon == true) {
            console.log("BabylonJS is active!");
            let pong = new tsPong.Pong(actor);
        } else if (config.three == true) {
            console.log("threeJS is active!");
            let pong = new threePong.Pong();
        } else {
            console.log("You have no renderers active!");
        }
    }
}
