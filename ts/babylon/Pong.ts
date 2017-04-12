import {Start} from "../core/start";

export class Pong {

    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.Light;

    constructor(array: Array<Actor>) {
        this.initGame();
        this.createScene();
        this.createPaddles(array);
        // this.createPaddles('paddle2', 4, 1, 1, 0, 0, -10);
        this.animate();
    }

    initGame() {
        this._canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');
        this._engine = new BABYLON.Engine(this._canvas, true);
    }

    createScene(): void {
        // create a basic BJS Scene object
        this._scene = new BABYLON.Scene(this._engine);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this._camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 20, new BABYLON.Vector3(0, 0, 0), this._scene);

        // target the camera to scene origin
        this._camera.setTarget(BABYLON.Vector3.Zero());

        // attach the camera to the canvas
        this._camera.attachControl(this._canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);

        // create a built-in "sphere" shape; with 16 segments and diameter of 2
        // let sphere = BABYLON.MeshBuilder.CreateSphere('sphere1',
        //     {segments: 16, diameter: 2}, this._scene);
        //
        // // move the sphere upward 1/2 of its height
        // sphere.position.y = 1;

        // create a built-in "ground" shape
        let ground = BABYLON.MeshBuilder.CreateGround('ground1',
            {
                width: 20, height: 40, subdivisions: 2
            },
            this._scene);

        let probe = new BABYLON.ReflectionProbe('groundProbe', 256, this._scene, true);
        // probe.renderList.push(sphere);

        let groundMat = new BABYLON.PBRMaterial('groundMat', this._scene);
        groundMat.reflectivityColor = BABYLON.Color3.White();
        groundMat.microSurface = 0;
        groundMat.reflectionTexture = probe.cubeTexture;
    }

    createPaddles(actors: Array<Actor>) {
        for (let actor of actors) {


            let paddle = BABYLON.MeshBuilder.CreateBox(actor.name, {width: actor.scale.x, height: actor.scale.y, depth: actor.scale.z}, this._scene);
            paddle.position = new BABYLON.Vector3(actor.location.x, actor.location.y, actor.location.z);

            let material = new BABYLON.PBRMaterial('mat', this._scene);
            material.albedoColor = BABYLON.Color3.FromHexString(actor.color);
            // material.reflectionColor = BABYLON.Color3.White();
            material.reflectivityColor = BABYLON.Color3.Gray();
            material.microSurface = .25;
            paddle.material = material;
        }
    }

    animate(): void {
        // run the render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}
