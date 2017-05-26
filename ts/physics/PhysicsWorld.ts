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
    linearDamping: number = .01;
    angularDamping: number = .01;
    angularVelocity: number = 10;
    randomBounceMultiplier: number = 10;
    ballVelocity: number = -20;

    constructor(private actorManager: ActorManager) {
        this.world = new CANNON.World();
        this.world.gravity.set(0, 0, -9.82);
        this.world.broadphase = new CANNON.NaiveBroadphase();

        this.createPlane(1);
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
        this.sphere.velocity.set(speedMult/2, speedMult, 0);
        this.world.addBody(this.sphere);
    }

    createBox(actor: Actor) {
        if (actor.name == "paddle1") {
            this.createPaddle(actor);
        } else if (actor.name == "paddle2") {
            this.createPaddle(actor);
        } else {
            let boxShape = new CANNON.Box(new CANNON.Vec3(actor.scale.x / 2, actor.scale.z, actor.scale.y));
            let boxBody = new CANNON.Body({
                mass: actor.mass,
                shape: boxShape,
                linearDamping: this.linearDamping,
                angularDamping: this.angularDamping
            });
            boxBody.position.set(actor.location.x, actor.location.z, actor.location.y);
            this.world.addBody(boxBody);
        }
    }

    createPaddle(actor: Actor) {
        let paddleShape = new CANNON.Box(new CANNON.Vec3(actor.scale.x / 2, actor.scale.z, actor.scale.y));
        let paddleBody = new CANNON.Body({
            mass: actor.mass,
            shape: paddleShape,
            linearDamping: this.linearDamping,
            angularDamping: this.angularDamping
        });
        paddleBody.position.set(actor.location.x, actor.location.z, actor.location.y);
        this.world.addBody(paddleBody);

        if (actor.name == "paddle1") {
            this.paddle = paddleBody;
        } else if (actor.name == "paddle2") {
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

    createPlane(height: number, rotation: number = 0) {
        let groundShape = new CANNON.Plane();
        let groundBody = new CANNON.Body({
            mass: 0,
            shape: groundShape,
            linearDamping: this.linearDamping,
            angularDamping: this.angularDamping
        });
        groundBody.position.set(0, height, 0);
        // groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), rotation);
        this.world.addBody(groundBody);
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

            // this adds a fake velocity to the ball when it impacts an object.
            // for now, this velocity is the inverse of the impact vector (location where both objects touched)
            let contactPoint = this.world.contacts[1].ni;

            // console.log("the ball's velocity is: " + this.sphere.velocity);

            this.sphere.velocity = contactPoint.mult(this.ballVelocity);
            // //if the ball hits on the left or right side
            // if(contactPoint.y < 0 || contactPoint.y > 0 ){
            //     this.sphere.velocity.x = contactPoint.mult(this.ballVelocity).x;
            // } else if (contactPoint.x < 0 || contactPoint.x > 0) {
            //     this.sphere.velocity = contactPoint.mult(this.ballVelocity);
            // }

            // // if the ball collides on it's right side
            // if (contactPoint.y > 0) {
            //     // and is moving up
            //     if (this.sphere.previousPosition.x < this.sphere.position.x) {
            //         this.sphere.velocity = contactPoint.mult(this.ballVelocity).vadd(new CANNON.Vec3(this.randomBounceMultiplier, 0, 0));
            //     } else {
            //         // it must be moving down
            //         this.sphere.velocity = contactPoint.mult(this.ballVelocity).vsub(new CANNON.Vec3(this.randomBounceMultiplier, 0, 0));
            //     }
            // } // if the ball collides on it's left
            // else if (contactPoint.y < 0) {
            //     // and it's moving up
            //     if (this.sphere.previousPosition.x < this.sphere.position.x) {
            //         this.sphere.velocity = contactPoint.mult(this.ballVelocity).vadd(new CANNON.Vec3(this.randomBounceMultiplier, 0, 0));
            //     } else {
            //         // it must be moving down
            //         this.sphere.velocity = contactPoint.mult(this.ballVelocity).vsub(new CANNON.Vec3(this.randomBounceMultiplier, 0, 0));
            //     }
            // } // if the ball collides on its top
            // else if (contactPoint.x > 0) {
            //     // and it's moving right
            //     if (this.sphere.previousPosition.y < this.sphere.position.y) {
            //         this.sphere.velocity = contactPoint.mult(this.ballVelocity).vadd(new CANNON.Vec3(0, this.randomBounceMultiplier, 0));
            //     } else {
            //         // it must be moving left, so add a force left
            //         this.sphere.velocity = contactPoint.mult(this.ballVelocity).vsub(new CANNON.Vec3(0, this.randomBounceMultiplier, 0));
            //     }
            // } // if the ball collides on its bottom
            // else if (contactPoint.x < 0) {
            //     // and it's moving right
            //     if (this.sphere.previousPosition.y < this.sphere.position.y) {
            //         this.sphere.velocity = contactPoint.mult(this.ballVelocity).vadd(new CANNON.Vec3(0, this.randomBounceMultiplier, 0));
            //     } else {
            //         // it must be moving left, so add a force left
            //         this.sphere.velocity = contactPoint.mult(this.ballVelocity).vsub(new CANNON.Vec3(0, this.randomBounceMultiplier, 0));
            //     }
            // } else {
            //     // it hit some other location, so just make that impact vector negative with a multiplier
            //     this.sphere.velocity = contactPoint.mult(this.ballVelocity);
            // }

            //another option, didn't work, though. needs tweaking
            // if (contactPoint.y == 1 || contactPoint.y == -1) {
            //     // if the ball is moving right, do this
            //     if (this.sphere.previousPosition.y < this.sphere.position.y) {
            //         // us a positive (upwards) random angle
            //         this.sphere.velocity = contactPoint.mult(this.ballVelocity).vadd(new CANNON.Vec3(Math.random() * this.randomBounceMultiplier, 0, 0));
            //     } else {
            //         // the ball must be moving left, so use a negative (downwards) random angle
            //         this.sphere.velocity = contactPoint.mult(this.ballVelocity).vsub(new CANNON.Vec3(Math.random() * this.randomBounceMultiplier, 0, 0));
            //     }
            //     // otherwise, if the ball is colliding on its top or bottom, do this
            // } else if (contactPoint.x == 1 || contactPoint.x == -1) {
            //
            //     //if the ball is moving up, do this
            //     if (this.sphere.previousPosition.x < this.sphere.position.x) {
            //         // add a negative random angle multiplier, so the ball can bounce, or reflect, left (otherwise, the ball always bounces right
            //         this.sphere.velocity = contactPoint.mult(this.ballVelocity).vsub(new CANNON.Vec3(0, Math.random() * this.randomBounceMultiplier, 0));
            //     } else {
            //         // the ball must be moving down, so use a positive random angle multiplier, so the ball bounces, or reflects, some angle to the right
            //         this.sphere.velocity = contactPoint.mult(this.ballVelocity).vadd(new CANNON.Vec3(0, Math.random() * this.randomBounceMultiplier, 0));
            //     }
            //     // if the ball doesn't impact on it's left or right (unlikely, since the world it's in is comprised
            //     // of all flat surfaces, up or down, do this:
            // } else {
            //     this.sphere.velocity = contactPoint.mult(this.ballVelocity);
            // }
            // this.sphere.velocity = this.world.contacts[1].ni.mult(this.ballVelocity).vadd(new CANNON.Vec3(Math.random()*this.randomBounceMultiplier, Math.random()*this.randomBounceMultiplier, 0));

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