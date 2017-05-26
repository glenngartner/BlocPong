import {ActorManager} from "../core/ActorManager";
import {Actor} from "../interfaces";
/**
 * Created by glenn on 5/18/2017.
 */

export class PhysicsWorld {

    world: CANNON.World;
    sphere: CANNON.Body;
    paddle: CANNON.Body;
    aiPaddle: CANNON.Body;
    ground: CANNON.Body;
    timeStep: number = 1.0 / 60.0;
    linearDamping: number = 0;
    angularDamping: number = 0;
    angularVelocity: number = 10;

    constructor(private actorManager: ActorManager) {
        this.world = new CANNON.World();
        this.world.gravity.set(0, 0, -9.82);
        this.world.broadphase = new CANNON.NaiveBroadphase();

        this.createPlane();
        this.createCollisionObjects();

        this.world.solver.iterations = 5;

        this.simLoop();
    }

    createSphere(actor: Actor) {
        let mass = actor.mass, radius = actor.scale.x / 2, speedMult = 15;
        let sphereShape = new CANNON.Sphere(radius);
        this.sphere = new CANNON.Body({
            mass: mass,
            shape: sphereShape,
            linearDamping: this.linearDamping,
            angularDamping: this.angularDamping
        });
        this.sphere.position.set(actor.location.x, actor.location.z, actor.location.y);
        this.sphere.velocity.set(2, speedMult, 0);
        this.world.addBody(this.sphere);
    }

    createBox(actor: Actor) {
        if (actor.name == "paddle1") {
            this.createPaddle(actor);
        } else if (actor.name == "paddle2"){
            this.createPaddle(actor);
        } else {
            let boxShape = new CANNON.Box(new CANNON.Vec3(actor.scale.x / 2, actor.scale.z, actor.scale.y));
            let boxBody = new CANNON.Body({mass: actor.mass, shape: boxShape, linearDamping: this.linearDamping, angularDamping: this.angularDamping});
            boxBody.position.set(actor.location.x, actor.location.z, actor.location.y);
            this.world.addBody(boxBody);
        }
    }

    createPaddle(actor:Actor) {
        let paddleShape = new CANNON.Box(new CANNON.Vec3(actor.scale.x / 2, actor.scale.z, actor.scale.y));
        let paddleBody= new CANNON.Body({mass: actor.mass, shape: paddleShape, linearDamping: this.linearDamping, angularDamping: this.angularDamping});
        paddleBody.position.set(actor.location.x, actor.location.z, actor.location.y);
        this.world.addBody(paddleBody);

        if(actor.name == "paddle1"){
            this.paddle = paddleBody;
        } else if (actor.name == "paddle2"){
            this.aiPaddle = paddleBody;
        }

        // let paddleShape = new CANNON.Box(new CANNON.Vec3(3, .5, .5));
        // this.paddle = new CANNON.Body({mass: 0, shape: paddleShape, linearDamping: this.linearDamping, angularDamping: this.angularDamping});
        // this.paddle.position.set(0, 10, .5);
        // this.world.addBody(this.paddle);
    }

    createCollisionObjects() {
        let actors = this.actorManager.getActors;
        for (let actor of actors) {
            if (actor.isRigidBody && actor.type == "box") {
                this.createBox(actor);
            } else if (actor.isRigidBody && actor.type == "sphere") {
                this.createSphere(actor)
            }
        }
    }

    createPlane() {
        let groundShape = new CANNON.Plane();
        this.ground = new CANNON.Body({mass: 0, shape: groundShape, linearDamping: this.linearDamping, angularDamping: this.angularDamping});
        this.world.addBody(this.ground);
    }

    simLoop = () => {
        requestAnimationFrame(this.simLoop);
        this.world.step(this.timeStep);
        if (this.sphere) {
            this.actorManager.changeActorPropertyValue("ball", "location", {
                x: this.sphere.position.x,
                y: this.sphere.position.z,
                z: this.sphere.position.y
            });
        }

        // check to see if a collision "contact" was made between rigid or static body objects
        // this length will always be 1, since we have a ground place, and the ball is alwasy colliding with that
        // if the length is 2, we want to know details about the second collision object

        if (this.world.contacts.length > 1) {
            console.log("The ball collided with a non-ground object");
            console.log("Collision impact velocity along normal: " + this.world.contacts[1].getImpactVelocityAlongNormal());
            console.log("The contact normal is" + this.world.contacts[1].ni);

            this.sphere.velocity = this.world.contacts[1].ni.mult(-15);
            // this.sphere.angularVelocity = this.sphere.angularVelocity.mult(-100);

            // make the ball bounce fast, in it's opposite direction
            // we're diretly setting the velocity to the inverse of the contact point's location
            // if (this.world.contacts[1].ni == new CANNON.Vec3(1, 0, 0)) {
            //     this.sphere.velocity = this.world.contacts[1].ni.mult(-15,);
            //     this.sphere.velocity.vadd(new CANNON.Vec3(0, 0, 5));
            // } else {
            //     this.sphere.velocity = this.world.contacts[1].ni.mult(-15,);
            // }
        }

        // get the locations of the generic (headless) objects in the generic scene. as their positions change,
        // update the positions of their corresponding static meshes. Currently, this just applies to
        // paddle1: who's dragged by the user with a pointer / mouse
        // paddle2: who's updated by the generic renderer, to always track the ball's position
        let paddle1Loc = this.actorManager.actorPropertyValue("paddle1", "location");
        if (this.paddle) this.paddle.position.set(paddle1Loc.x, paddle1Loc.z, paddle1Loc.y);

        let paddleAILoc = this.actorManager.actorPropertyValue("paddle2", "location");
        if (this.aiPaddle) this.aiPaddle.position.set(paddleAILoc.x, paddleAILoc.z, paddleAILoc.y);
    }
}