import * as tsPong from "../babylon/Pong";
import * as threePong from "../three/Pong";
import { Actor } from "./Actor";
import { GenericRenderer } from "./GenericRenderer"; 

export class Start {

    //private renderer: rendererConfig;
    private renderer: Renderer; 

    constructor(config:Array<string>) {

        let paddle1 = new Actor(<Actor>{color: "#FF0000", location:{x:0, y:0.5, z:12}, scale:{x:6, y:1, z:1}});
        let paddle2 = new Actor(<Actor>{color: "#00FF00", location:{x:0, y:0.5, z:-12}, scale:{x:6, y:1, z:1}});

        //this.selectRenderer(config, [paddle1, paddle2]);
        // let setup = new Setup(config);

        this.renderer = new GenericRenderer(config); 
        this.renderer.createScene();
        this.renderer.createCamera();
        this.renderer.createBackground();
        this.renderer.createActor([paddle1, paddle2]);
        this.renderer.createDirectionalLight();
        this.renderer.render();
    }
}
