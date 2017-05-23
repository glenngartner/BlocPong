/**
 * Created by glenn on 5/18/2017.
 */

declare module OIMO {
    class World {
        timeStep: number;
        numIterations: number;
        broadphase: number;
        worldscale: number;
        random: boolean
        info: boolean;
        enableRandomizer: boolean;
        size: Array<number>;
        pos: Array<number>;
        density: number;
        gravity: Array<number>;
        add({}): OIMO.Shape;
        step();
        postLoop(): any;
        play();
    }

    class Shape{
        position: Vec3;
    }

    class Vec3{
        x: number;
        y: number;
        z: number;
    }
}