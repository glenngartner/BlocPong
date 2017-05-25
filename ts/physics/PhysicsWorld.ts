import {ActorManager} from "../core/ActorManager";
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
        this.createSphere();
        this.createPaddle();

        this.world.solver.iterations = 3;

        this.simLoop();
    }

    createSphere() {
        let mass = 2, radius = .5, speedMult = 10;
        let sphereShape = new CANNON.Sphere(radius);
        PhysicsWorld.sphere = new CANNON.Body({
            mass: mass,
            shape: sphereShape
        });
        PhysicsWorld.sphere.position.set(0, 0, 1);
        PhysicsWorld.sphere.velocity.set(Math.random()*speedMult, Math.random()*speedMult, 0);
        this.world.addBody(PhysicsWorld.sphere);
    }

    createPaddle(){
        let paddleShape = new CANNON.Box(new CANNON.Vec3(3, .5, .5));
        this.paddle = new CANNON.Body({mass: 0, shape: paddleShape});
        this.paddle.position.set(0, 10, .5);
        this.world.addBody(this.paddle);
    }

    createSlope(){
        let slopeShape = new CANNON.Plane();
        let slopeBody = new CANNON.Body({mass:0, shape: slopeShape});
        slopeBody.position.set(0, 0, 5);
        slopeBody.quaternion.setFromEuler(-Math.PI/4, 0, 0);
        this.world.addBody(slopeBody);
    }

    createPlane() {
        let groundShape = new CANNON.Plane();
        this.ground = new CANNON.Body({mass: 0, shape: groundShape});
        this.world.addBody(this.ground);
    }

    simLoop = () => {
        requestAnimationFrame(this.simLoop);
        // console.log("Sphere location is: "
        //     + "("
        //     + PhysicsWorld.sphere.position.x
        //     + ", "
        //     + PhysicsWorld.sphere.position.y
        //     + ", "
        //     + PhysicsWorld.sphere.position.z
        //     + ")"
        // )
        this.world.step(this.timeStep);
        this.actorManager.changeActorPropertyValue("ball", "location", {
            x: PhysicsWorld.sphere.position.x,
            y: PhysicsWorld.sphere.position.z,
            z: PhysicsWorld.sphere.position.y
        });

        if (this.world.contacts.length > 1){
            console.log("The ball is colliding with a non-ground object");
        }

        let paddle1Loc = this.actorManager.actorPropertyValue("paddle1", "location");
        this.paddle.position.set(paddle1Loc.x, paddle1Loc.z, paddle1Loc.y);
    }
}