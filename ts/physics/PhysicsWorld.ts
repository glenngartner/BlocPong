import {ActorManager} from "../core/ActorManager";
/**
 * Created by glenn on 5/18/2017.
 */

export class PhysicsWorld {

    world: CANNON.World;
    public static sphere: CANNON.Body;
    ground: CANNON.Body;
    timeStep: number = 1.0 / 60.0;

    constructor(private actorManager: ActorManager) {
        this.world = new CANNON.World();
        this.world.gravity.set(0, 0, -9.82);
        this.world.broadphase = new CANNON.NaiveBroadphase();

        this.createPlane();
        this.createSphere();

        this.world.solver.iterations = 3;

        this.simLoop();
    }

    createSphere() {
        let mass = 5, radius = .5;
        let sphereShape = new CANNON.Sphere(radius);
        PhysicsWorld.sphere = new CANNON.Body({
            mass: mass,
            shape: sphereShape
        });
        PhysicsWorld.sphere.position.set(0, 0, 10);
        this.world.addBody(PhysicsWorld.sphere);
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
    }
}