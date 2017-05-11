import {ActorBuilder} from "./ActorBuilder";
import { GenericRenderer } from "./GenericRenderer";
import {ActorManager} from "./ActorManager";
import {Actor, Renderer} from "../interfaces";


export class Start {

    private renderer: Renderer;

    constructor(config:Array<string>) {

        let actorManager = new ActorManager();

        let paddle1 = new ActorBuilder(actorManager, <Actor>{name: "paddle1", color: "#FF0000", location:{x:0, y:0.5, z:12}, scale:{x:6, y:1, z:1}});
        let paddle2 = new ActorBuilder(actorManager, <Actor>{name: "paddle2", color: "#00FF00", location:{x:0, y:0.5, z:-12}, scale:{x:6, y:1, z:1}});
        let ball = new ActorBuilder(actorManager, <Actor>{name: "ball", color: "#49acad", location:{x:0, y:0.5, z:0}, type:"sphere"});


        this.renderer = new GenericRenderer(actorManager, config);
        this.renderer.createScene();
        this.renderer.createCamera();
        this.renderer.createBackground();
        this.renderer.createActor([paddle1, paddle2, ball]);
        this.renderer.createDirectionalLight();
        this.renderer.render();
        this.renderer.addEvent();
    }
}
