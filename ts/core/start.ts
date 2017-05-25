import {ActorBuilder} from "./ActorBuilder";
import { GenericRenderer } from "./GenericRenderer";
import {ActorManager} from "./ActorManager";
import {Actor, Renderer} from "../interfaces";
import {PhysicsWorld} from "../physics/PhysicsWorld";


export class Start {

    private renderer: Renderer;

    constructor(config:Array<string>) {

        let actorManager = new ActorManager();

        let paddle1 = new ActorBuilder(actorManager, <Actor>{name: "paddle1", isRigidBody: true, draggable: true, constrainToAxis: "x", color: "#FF0000", location:{x:0, y:0.5, z:12}, scale:{x:6, y:1, z:1}});
        let paddle2 = new ActorBuilder(actorManager, <Actor>{name: "paddle2", isRigidBody: true, color: "#00FF00", location:{x:0, y:0.5, z:-12}, scale:{x:6, y:1, z:1}, isTracker: true, trackedTargetName: "ball", trackedTargetAxis: "x"});
        let ball = new ActorBuilder(actorManager, <Actor>{name: "ball", color: "#49acad", isRigidBody: true, mass: 2, location:{x:0, y:0.5, z:0}, type:"sphere"});
        let topWall = new ActorBuilder(actorManager, <Actor>{name:"topWall", isRigidBody: true, color: "#65aaa4", location: {x:-10, y:0.5, z:0}, scale:{x:1, y:1, z:30}});
        let bottomWall = new ActorBuilder(actorManager, <Actor>{name:"bottomWall", isRigidBody: true, color: "#65aaa4", location: {x:10, y:0.5, z:0}, scale:{x:1, y:1, z:30}});


        this.renderer = new GenericRenderer(actorManager, config);
        this.renderer.createScene();
        this.renderer.createCamera();
        this.renderer.createBackground();
        this.renderer.createActor([paddle1, paddle2, ball, topWall, bottomWall]);
        this.renderer.createDirectionalLight();
        this.renderer.render();
        this.renderer.addEvent();

        let physicsWorld = new PhysicsWorld(actorManager);
    }
}
