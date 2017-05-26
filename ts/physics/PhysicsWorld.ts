import {ActorManager} from "../core/ActorManager";
import {Actor} from "../interfaces";
/**
 * Created by glenn on 5/18/2017.
 */

export class PhysicsWorld {

    world: CANNON.World;
    public static sphere: CANNON.Body;
    paddle: CANNON.Body;
    ground: CANNON.Body;
    timeStep: number = 1.0 / 60.0;

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
        let mass = actor.mass, radius = actor.scale.x / 2, speedMult = 10;
        let sphereShape = new CANNON.Sphere(radius);
        PhysicsWorld.sphere = new CANNON.Body({
            mass: mass,
            shape: sphereShape
        });
        PhysicsWorld.sphere.position.set(actor.location.x, actor.location.z, actor.location.y);
        PhysicsWorld.sphere.velocity.set(2, speedMult, 0);
        this.world.addBody(PhysicsWorld.sphere);
    }

    createBox(actor: Actor) {
        if (actor.name == "paddle1") {
            this.createPaddle();
        } else {
            let boxShape = new CANNON.Box(new CANNON.Vec3(actor.scale.x/2, actor.scale.z, actor.scale.y));
            let boxBody = new CANNON.Body({mass: actor.mass, shape: boxShape});
            boxBody.position.set(actor.location.x, actor.location.z, actor.location.y);
            this.world.addBody(boxBody);
        }
    }

    createPaddle() {
        let paddleShape = new CANNON.Box(new CANNON.Vec3(3, .5, .5));
        this.paddle = new CANNON.Body({mass: 0, shape: paddleShape});
        this.paddle.position.set(0, 10, .5);
        this.world.addBody(this.paddle);
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
        this.ground = new CANNON.Body({mass: 0, shape: groundShape});
        this.world.addBody(this.ground);
    }

    simLoop = () => {
        requestAnimationFrame(this.simLoop);
        this.world.step(this.timeStep);
        if (PhysicsWorld.sphere) {
            this.actorManager.changeActorPropertyValue("ball", "location", {
                x: PhysicsWorld.sphere.position.x,
                y: PhysicsWorld.sphere.position.z,
                z: PhysicsWorld.sphere.position.y
            });
        }

        if (this.world.contacts.length > 1) {
            console.log("The ball collided with a non-ground object");
        }

        let paddle1Loc = this.actorManager.actorPropertyValue("paddle1", "location");
        if (this.paddle) this.paddle.position.set(paddle1Loc.x, paddle1Loc.z, paddle1Loc.y);
    }
}