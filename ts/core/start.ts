import * as tsPong from "../babylon/Pong";
import * as threePong from "../three/Pong";
import {Actor} from "./Actor";

export class Start {

    private renderer: rendererConfig;

    constructor(config:rendererConfig) {

        let paddle1 = new Actor(<Actor>{color: "#FF0000", location:{x:0, y:0.5, z:12}, scale:{x:6, y:1, z:1}});
        let paddle2 = new Actor(<Actor>{color: "#00FF00", location:{x:0, y:0.5, z:-12}, scale:{x:6, y:1, z:1}});

        this.selectRenderer(config, [paddle1, paddle2]);
        // let setup = new Setup(config);
    }

    selectRenderer(config: rendererConfig, actor:Array<Actor>) {
        if (config.babylon == true) {let render = new tsPong.Pong(actor);}
        if (config.three == true) { let render = new threePong.Pong(actor)};
    }
}
