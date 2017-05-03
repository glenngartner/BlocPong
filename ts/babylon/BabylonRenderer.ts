export class BabylonRenderer implements RendererInstance {

    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    _scene: BABYLON.Scene;
    _camera: BABYLON.ArcRotateCamera;
    _light: BABYLON.Light;
    _type: string = "babylonjs";

    createScene() {
        console.log("babylon scene created");
        this._canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = new BABYLON.Scene(this._engine);
    }

    createBackground() {
        this._scene.clearColor = BABYLON.Color4.FromHexString("#8bfff8FF");
    }

    createCamera() {
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this._camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 20, new BABYLON.Vector3(0, 0, 0), this._scene);

        // target the camera to scene origin
        this._camera.setTarget(BABYLON.Vector3.Zero());

        // attach the camera to the canvas
        this._camera.attachControl(this._canvas, false);
    }

    createActor(actors: Array<Actor>) {
        console.log("new babylonjs actor created!");
        let ground = BABYLON.MeshBuilder.CreateGround('ground1',
            {
                width: 20, height: 40, subdivisions: 2
            },
            this._scene);

        for (let actor of actors) {
            let mesh: BABYLON.Mesh;

            if (actor.type == "box") {
                mesh = BABYLON.MeshBuilder.CreateBox(actor.name, {
                    width: actor.scale.x,
                    height: actor.scale.y,
                    depth: actor.scale.z
                }, this._scene);
            } else if (actor.type == "sphere") {
                mesh = BABYLON.MeshBuilder.CreateSphere(
                    actor.name,
                    {
                        diameter: actor.scale.x
                    }, this._scene);
            }
            mesh.position = new BABYLON.Vector3(actor.location.x, actor.location.y, actor.location.z);

            let material = new BABYLON.PBRMaterial('mat', this._scene);
            material.albedoColor = BABYLON.Color3.FromHexString(actor.color);
            // material.reflectionColor = BABYLON.Color3.White();
            material.reflectivityColor = BABYLON.Color3.Gray();
            material.microSurface = .25;
            mesh.material = material;
        }
    }

    // configure this better (ie: specify a name parameter for this function)
    createMaterial(): BABYLON.PBRMaterial {
        let mat = new BABYLON.PBRMaterial("name", this._scene);
        mat.reflectivityColor = BABYLON.Color3.White();
        mat.microSurface = 0;
        return mat;
    };

    createDirectionalLight() {
        console.log("babylonjs sunlight created!");
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);
    }

    render() {
        console.log("babylonjs renderer looping");
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        window.addEventListener('resize', () => {
            this._engine.resize();
        })
    }
}
