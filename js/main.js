var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("core/ActorManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ActorManager = (function () {
        function ActorManager() {
            this.actors = [];
            console.log("actor manager created");
        }
        Object.defineProperty(ActorManager.prototype, "getActors", {
            get: function () {
                return this.actors;
            },
            enumerable: true,
            configurable: true
        });
        ActorManager.prototype.loadActors = function (newActor) {
            this.actors.push(newActor);
        };
        ActorManager.prototype.changeActorPropertyValue = function (name, prop, value) {
            for (var _i = 0, _a = this.actors; _i < _a.length; _i++) {
                var actor = _a[_i];
                if (prop === "selected") {
                    actor.selected = false;
                    actor.isDragging = false;
                }
                if (actor.name == name) {
                    actor[prop] = value;
                }
            }
        };
        ActorManager.prototype.actorPropertyValue = function (name, prop) {
            for (var _i = 0, _a = this.actors; _i < _a.length; _i++) {
                var actor = _a[_i];
                if (actor.name == name)
                    return actor[prop];
            }
        };
        ActorManager.prototype.returnActorByName = function (name) {
            for (var _i = 0, _a = this.actors; _i < _a.length; _i++) {
                var actor = _a[_i];
                if (actor.name == name) {
                    return actor;
                }
                else {
                }
            }
        };
        return ActorManager;
    }());
    exports.ActorManager = ActorManager;
});
define("three/Camera", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera(loc, rot) {
            if (loc === void 0) { loc = { x: 0, y: 25, z: 0 }; }
            if (rot === void 0) { rot = { x: -Math.PI / 2, y: -Math.PI / 2, z: -Math.PI / 2 }; }
            var _this = _super.call(this, 35, window.innerWidth / window.innerHeight, 0.1, 1000) || this;
            _this.loc = loc;
            _this.rot = rot;
            _this.setPosition(loc, rot);
            _this.setControls();
            return _this;
        }
        Camera.prototype.setPosition = function (loc, rot) {
            this.position.set(loc.x, loc.y, loc.z);
        };
        Camera.prototype.setControls = function () {
            this.controls = new THREE.OrbitControls(this);
        };
        Camera.prototype.disableOrbitControls = function () {
            this.controls.enabled = false;
        };
        Camera.prototype.enableOrbitControls = function () {
            this.controls.enabled = true;
        };
        return Camera;
    }(THREE.PerspectiveCamera));
    exports.Camera = Camera;
});
define("three/ActorEvent", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ActorEvent = (function () {
        function ActorEvent(_scene, _canvas, _camera, _renderer, actorManager) {
            this._scene = _scene;
            this._canvas = _canvas;
            this._camera = _camera;
            this._renderer = _renderer;
            this.actorManager = actorManager;
            this.clicked = false;
        }
        ActorEvent.prototype.makeSelectable = function () {
            var _this = this;
            this._canvas.addEventListener("pointerdown", function (e) {
                _this.clicked = true;
                console.log("threejs canvas has been clicked");
                var rayCaster = new THREE.Raycaster();
                _this.mouseDownX = e.pageX;
                _this.mouseDownY = e.pageY;
                var mouse2D = new THREE.Vector2(((e.clientX - _this._renderer.domElement.offsetLeft) / _this._renderer.domElement.clientWidth) * 2 - 1, -((e.clientY - _this._renderer.domElement.offsetTop) / _this._renderer.domElement.clientHeight) * 2 + 1);
                rayCaster.setFromCamera(mouse2D, _this._camera);
                var intersects = rayCaster.intersectObjects(_this._scene.children);
                if (intersects.length > 0) {
                    if (intersects[0].object) {
                        _this.selectedMesh = intersects[0].object;
                    }
                    _this.pickedPoint = intersects[0].point;
                    _this.deltaPosition = _this.mouseOver3DPoint.sub(_this.selectedMesh.position);
                    console.log("threeJS actor selected: " + _this.selectedMesh.name);
                    _this.actorManager.changeActorPropertyValue(_this.selectedMesh.name, "selected", true);
                    if (_this.actorManager.actorPropertyValue(_this.selectedMesh.name, "draggable") == true) {
                        _this._camera.disableOrbitControls();
                    }
                }
                else {
                    console.log("nothing was hit, apparently");
                }
            });
        };
        ActorEvent.prototype.afterSelection = function () {
            var _this = this;
            this._canvas.addEventListener("pointerup", function (ev) {
                if (_this.selectedMesh && _this.actorManager.actorPropertyValue(_this.selectedMesh.name, "draggable")) {
                    _this.actorManager.changeActorPropertyValue(_this.selectedMesh.name, "isDragging", false);
                    _this.actorManager.changeActorPropertyValue(_this.selectedMesh.name, "selected", false);
                    _this.selectedMesh = null;
                }
                _this.clicked = false;
                _this._camera.enableOrbitControls();
            });
        };
        ActorEvent.prototype.trackCursor = function () {
            var _this = this;
            this._canvas.addEventListener("pointermove", function (e) {
                var rayCaster = new THREE.Raycaster();
                var mouse2D = new THREE.Vector2(((e.clientX - _this._renderer.domElement.offsetLeft) / _this._renderer.domElement.clientWidth) * 2 - 1, -((e.clientY - _this._renderer.domElement.offsetTop) / _this._renderer.domElement.clientHeight) * 2 + 1);
                rayCaster.setFromCamera(mouse2D, _this._camera);
                var intersects = rayCaster.intersectObjects(_this._scene.children);
                if (intersects.length > 0 && intersects[0].object) {
                    _this.mouseOver3DPoint = intersects[0].point;
                    _this.overMesh = intersects[0].object;
                }
                if (_this.selectedMesh) {
                    if (_this.actorManager.actorPropertyValue(_this.selectedMesh.name, "draggable")) {
                        _this.actorManager.changeActorPropertyValue(_this.selectedMesh.name, "isDragging", true);
                        _this.changeGenericMeshLocationValues();
                    }
                }
            });
        };
        ActorEvent.prototype.changeGenericMeshLocationValues = function () {
            var genericActor = this.actorManager.returnActorByName(this.selectedMesh.name);
            if (genericActor.location) {
                if (genericActor.location) {
                    if (genericActor.constrainToAxis == "x") {
                        genericActor.location.x = this.mouseOver3DPoint.z - this.deltaPosition.z;
                    }
                    else if (genericActor.constrainToAxis == "y") {
                        genericActor.location.y = this.mouseOver3DPoint.y - this.deltaPosition.y;
                    }
                    else if (genericActor.constrainToAxis == "z") {
                        genericActor.location.z = this.mouseOver3DPoint.x - this.deltaPosition.x;
                    }
                    else if (genericActor.constrainToAxis == "") {
                        genericActor.location.x = this.mouseOver3DPoint.z - this.deltaPosition.z;
                        genericActor.location.y = this.mouseOver3DPoint.y - this.deltaPosition.y;
                        genericActor.location.z = this.mouseOver3DPoint.x - this.deltaPosition.x;
                    }
                }
            }
        };
        return ActorEvent;
    }());
    exports.ActorEvent = ActorEvent;
});
define("three/Render", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Render = (function (_super) {
        __extends(Render, _super);
        function Render(_scene, camera, actorManager, actorEvent, _canvas) {
            var _this = _super.call(this, {
                antialias: true,
                canvas: document.getElementById('threeCanvas')
            }) || this;
            _this._scene = _scene;
            _this.camera = camera;
            _this.actorManager = actorManager;
            _this.actorEvent = actorEvent;
            _this._canvas = _canvas;
            _this.highlightActor = function (actor) {
                var meshToHighlight = _this._scene.getObjectByName(actor.name);
                meshToHighlight.getObjectByName("outline").visible = true;
            };
            _this.removeHighlight = function (actor) {
                var meshToRemoveHighlight = _this._scene.getObjectByName(actor.name);
                meshToRemoveHighlight.getObjectByName("outline").visible = false;
            };
            _this.updateMeshPosition = function (actor) {
                _this._scene.getObjectByName(actor.name).position.x = actor.location.z;
                _this._scene.getObjectByName(actor.name).position.y = actor.location.y;
                _this._scene.getObjectByName(actor.name).position.z = actor.location.x;
            };
            _this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.render(_this._scene, _this.camera);
                _this.checkActorState("selected", true, _this.highlightActor, _this.removeHighlight);
                _this.checkActorState("isDragging", true, _this.updateMeshPosition);
                _this.checkActorState("isRigidBody", true, _this.updateMeshPosition);
            };
            var canvas = document.getElementById('threeCanvas');
            var parent = canvas.parentElement;
            _this.setSize(window.innerWidth / 2, window.innerHeight / 2);
            _this.setClearColor(0x8bfff8, 1);
            document.body.appendChild(_this.domElement);
            _this.animate();
            return _this;
        }
        Render.prototype.checkActorState = function (prop, value, trueFunc, falseFunc) {
            var actorList = this.actorManager.getActors;
            for (var _i = 0, actorList_1 = actorList; _i < actorList_1.length; _i++) {
                var actor = actorList_1[_i];
                if (actor[prop] == value) {
                    trueFunc(actor);
                }
                else {
                    if (falseFunc) {
                        falseFunc(actor);
                    }
                }
            }
        };
        return Render;
    }(THREE.WebGLRenderer));
    exports.Render = Render;
});
define("core/renderer_config", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.renderers = ["babylonjs", "threejs"];
});
define("core/ActorBuilder", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ActorBuilder = (function () {
        function ActorBuilder(manager, actor) {
            this.name = "noName";
            this.selectable = true;
            this.selected = false;
            this.draggable = false;
            this.constrainToAxis = "";
            this.isDragging = false;
            this.isRigidBody = false;
            this.mass = 0;
            this.isTracker = false;
            this.trackedTargetName = "";
            this.trackTargetAxis = "";
            this.type = "box";
            this.location = { x: 0, y: 0, z: 0 };
            this.rotation = { x: 0, y: 0, z: 0 };
            this.scale = { x: 1, y: 1, z: 1 };
            this.color = "#CCCCCC";
            this.metal = 0;
            this.roughness = 0.25;
            this.envColor = 0xCCCCCC;
            for (var prop in actor) {
                if (this.hasOwnProperty(prop) && actor[prop] != null)
                    this[prop] = actor[prop];
            }
            manager.loadActors(this);
        }
        return ActorBuilder;
    }());
    exports.ActorBuilder = ActorBuilder;
});
define("babylon/ActorEvent", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ActorEvent = (function () {
        function ActorEvent(_scene, _canvas, actorManager, _camera) {
            this._scene = _scene;
            this._canvas = _canvas;
            this.actorManager = actorManager;
            this._camera = _camera;
            this.clicked = false;
            this.deltaPosition = new BABYLON.Vector3(0, 0, 0);
        }
        ActorEvent.prototype.makeSelectable = function () {
            var _this = this;
            this._canvas.addEventListener("pointerdown", function (ev) {
                _this.clicked = true;
                var pickResult = _this._scene.pick(_this._scene.pointerX, _this._scene.pointerY);
                _this.mouseDownX = _this._scene.pointerX;
                _this.mouseDownY = _this._scene.pointerY;
                if (pickResult.hit) {
                    if (pickResult.pickedMesh) {
                        _this.selectedMesh = pickResult.pickedMesh;
                        _this.mouseOver3DPoint = pickResult.pickedPoint;
                        _this.deltaPosition = _this.mouseOver3DPoint.subtract(_this.selectedMesh.position);
                        _this.actorManager.changeActorPropertyValue(_this.selectedMesh.name, "selected", true);
                        if (_this.actorManager.actorPropertyValue(_this.selectedMesh.name, "draggable")) {
                            _this._scene.activeCamera.detachControl(_this._canvas);
                        }
                    }
                }
            });
        };
        ActorEvent.prototype.afterSelection = function () {
            var _this = this;
            this._canvas.addEventListener("pointerup", function (ev) {
                if (_this.selectedMesh && _this.actorManager.actorPropertyValue(_this.selectedMesh.name, "draggable")) {
                    _this.actorManager.changeActorPropertyValue(_this.selectedMesh.name, "isDragging", false);
                    _this.actorManager.changeActorPropertyValue(_this.selectedMesh.name, "selected", false);
                    _this.selectedMesh = null;
                }
                _this.clicked = false;
                _this._scene.activeCamera.attachControl(_this._canvas);
            });
        };
        ActorEvent.prototype.trackCursor = function () {
            var _this = this;
            this._canvas.addEventListener("pointermove", function (ev) {
                var pickedPoint = _this._scene.pick(_this._scene.pointerX, _this._scene.pointerY);
                if (pickedPoint && pickedPoint.pickedMesh) {
                    _this.mouseOver3DPoint = pickedPoint.pickedPoint;
                    _this.overMesh = pickedPoint.pickedMesh;
                }
                if (_this.selectedMesh) {
                    if (_this.actorManager.actorPropertyValue(_this.selectedMesh.name, "draggable")) {
                        _this.actorManager.changeActorPropertyValue(_this.selectedMesh.name, "isDragging", true);
                        _this.changeGenericMeshLocationValues();
                    }
                }
            });
        };
        ActorEvent.prototype.changeGenericMeshLocationValues = function () {
            var genericActor = this.actorManager.returnActorByName(this.selectedMesh.name);
            if (genericActor.location) {
                if (genericActor.constrainToAxis == "x") {
                    genericActor.location.x = this.mouseOver3DPoint.x - this.deltaPosition.x;
                }
                else if (genericActor.constrainToAxis == "y") {
                    genericActor.location.y = this.mouseOver3DPoint.y - this.deltaPosition.y;
                }
                else if (genericActor.constrainToAxis == "z") {
                    genericActor.location.z = this.mouseOver3DPoint.z - this.deltaPosition.z;
                }
                else if (genericActor.constrainToAxis == "") {
                    genericActor.location.x = this.mouseOver3DPoint.x - this.deltaPosition.x;
                    genericActor.location.y = this.mouseOver3DPoint.y - this.deltaPosition.y;
                    genericActor.location.z = this.mouseOver3DPoint.z - this.deltaPosition.z;
                }
            }
        };
        return ActorEvent;
    }());
    exports.ActorEvent = ActorEvent;
});
define("babylon/BabylonRenderer", ["require", "exports", "babylon/ActorEvent"], function (require, exports, ActorEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BabylonRenderer = (function () {
        function BabylonRenderer(actorManager) {
            var _this = this;
            this.actorManager = actorManager;
            this._type = "babylonjs";
            this.highlightActor = function (actor) {
                var meshToHighlight = _this._scene.getMeshByName(actor.name);
                meshToHighlight.outlineWidth = .1;
                meshToHighlight.outlineColor = BABYLON.Color3.Black();
                meshToHighlight.renderOutline = true;
            };
            this.removeHighlight = function (actor) {
                var meshToRemoveHighlight = _this._scene.getMeshByName(actor.name);
                meshToRemoveHighlight.renderOutline = false;
            };
            this.updateMeshPosition = function (actor) {
                _this._scene.getMeshByName(actor.name).position.x = actor.location.x;
                _this._scene.getMeshByName(actor.name).position.y = actor.location.y;
                _this._scene.getMeshByName(actor.name).position.z = actor.location.z;
            };
            this.render = function () {
                _this._engine.runRenderLoop(function () {
                    _this._scene.render();
                    _this.checkActorState("selected", true, _this.highlightActor, _this.removeHighlight);
                    _this.checkActorState("isDragging", true, _this.updateMeshPosition);
                    _this.checkActorState("isRigidBody", true, _this.updateMeshPosition);
                });
                window.addEventListener('resize', function () {
                    _this._engine.resize();
                });
            };
        }
        BabylonRenderer.prototype.createScene = function () {
            console.log("babylon scene created");
            this._canvas = document.getElementById('babylonCanvas');
            this._engine = new BABYLON.Engine(this._canvas, true);
            this._scene = new BABYLON.Scene(this._engine);
        };
        BabylonRenderer.prototype.createBackground = function () {
            this._scene.clearColor = BABYLON.Color4.FromHexString("#8bfff8FF");
        };
        BabylonRenderer.prototype.createCamera = function () {
            this._camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 30, new BABYLON.Vector3(0, 0, 0), this._scene);
            this._camera.setTarget(BABYLON.Vector3.Zero());
            this._camera.attachControl(this._canvas, false);
        };
        BabylonRenderer.prototype.createActor = function (actors) {
            console.log("new babylonjs actor created!");
            var ground = BABYLON.MeshBuilder.CreateGround('ground1', {
                width: 20, height: 40, subdivisions: 2
            }, this._scene);
            for (var _i = 0, actors_1 = actors; _i < actors_1.length; _i++) {
                var actor = actors_1[_i];
                var mesh = void 0;
                if (actor.type == "box") {
                    mesh = BABYLON.MeshBuilder.CreateBox(actor.name, {
                        width: actor.scale.x,
                        height: actor.scale.y,
                        depth: actor.scale.z
                    }, this._scene);
                }
                else if (actor.type == "sphere") {
                    mesh = BABYLON.MeshBuilder.CreateSphere(actor.name, {
                        diameter: actor.scale.x
                    }, this._scene);
                }
                mesh.position = new BABYLON.Vector3(actor.location.x, actor.location.y, actor.location.z);
                var material = new BABYLON.PBRMaterial('mat', this._scene);
                material.albedoColor = BABYLON.Color3.FromHexString(actor.color);
                material.reflectivityColor = BABYLON.Color3.Gray();
                material.microSurface = .25;
                mesh.material = material;
            }
        };
        BabylonRenderer.prototype.createMaterial = function () {
            var mat = new BABYLON.PBRMaterial("name", this._scene);
            mat.reflectivityColor = BABYLON.Color3.White();
            mat.microSurface = 0;
            return mat;
        };
        ;
        BabylonRenderer.prototype.createDirectionalLight = function () {
            console.log("babylonjs sunlight created!");
            this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);
        };
        BabylonRenderer.prototype.addEvent = function () {
            this.actorEvent = new ActorEvent_1.ActorEvent(this._scene, this._canvas, this.actorManager, this._camera);
            this.actorEvent.makeSelectable();
            this.actorEvent.afterSelection();
            this.actorEvent.trackCursor();
        };
        ;
        BabylonRenderer.prototype.checkActorState = function (prop, value, trueFunc, falseFunc) {
            var actorList = this.actorManager.getActors;
            for (var _i = 0, actorList_2 = actorList; _i < actorList_2.length; _i++) {
                var actor = actorList_2[_i];
                if (actor[prop] == value) {
                    trueFunc(actor);
                }
                else {
                    if (falseFunc) {
                        falseFunc(actor);
                    }
                }
            }
        };
        return BabylonRenderer;
    }());
    exports.BabylonRenderer = BabylonRenderer;
});
define("three/Mesh", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Mesh = (function () {
        function Mesh(actorArray, scene) {
            this.actorArray = actorArray;
            this.scene = scene;
            this.buildMesh(actorArray);
        }
        Mesh.prototype.buildMesh = function (actors) {
            for (var _i = 0, actors_2 = actors; _i < actors_2.length; _i++) {
                var actor = actors_2[_i];
                var geo = void 0;
                var geoOutline = void 0;
                if (actor.type == "box") {
                    geo = new THREE.BoxGeometry(actor.scale.z, actor.scale.y, actor.scale.x);
                    geoOutline = new THREE.BoxGeometry(actor.scale.z, actor.scale.y, actor.scale.x);
                }
                else if (actor.type == "sphere") {
                    geo = new THREE.SphereGeometry(actor.scale.x / 2, 16, 16);
                    geoOutline = new THREE.SphereGeometry(actor.scale.x / 2, 16, 16);
                }
                var mat = this.buildMaterial(actor.color);
                var mesh = new THREE.Mesh(geo, mat);
                var matOutline = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
                var outlineMesh = new THREE.Mesh(geoOutline, matOutline);
                outlineMesh.scale.multiplyScalar(1.15);
                outlineMesh.name = "outline";
                mesh.name = actor.name;
                this.setPosition(mesh, actor.location);
                this.scene.add(mesh);
                mesh.add(outlineMesh);
                outlineMesh.visible = false;
            }
        };
        Mesh.prototype.buildMaterial = function (color) {
            var mat = new THREE.MeshStandardMaterial();
            mat.color = new THREE.Color(color);
            mat.roughness = 0.25;
            return mat;
        };
        Mesh.prototype.setPosition = function (mesh, loc) {
            mesh.position.set(loc.z, loc.y, loc.x);
        };
        return Mesh;
    }());
    exports.Mesh = Mesh;
});
define("three/ThreeRenderer", ["require", "exports", "three/Camera", "three/Render", "three/Mesh", "three/ActorEvent"], function (require, exports, Camera_1, Render_1, Mesh_1, ActorEvent_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ThreeRenderer = (function () {
        function ThreeRenderer(actorManager) {
            var _this = this;
            this.actorManager = actorManager;
            this._type = "threeJS";
            this.addEvent = function () {
                _this.actorEvent = new ActorEvent_2.ActorEvent(_this._scene, _this._canvas, _this._camera, _this._renderer, _this.actorManager);
                _this.actorEvent.makeSelectable();
                _this.actorEvent.afterSelection();
                _this.actorEvent.trackCursor();
            };
            this.render = function () {
                console.log("threejs renderer started");
                _this._renderer = new Render_1.Render(_this._scene, _this._camera, _this.actorManager, _this.actorEvent, _this._canvas);
            };
        }
        ThreeRenderer.prototype.createScene = function () {
            console.log("threejs scene created!");
            this._canvas = document.getElementById("threeCanvas");
            this._scene = new THREE.Scene();
        };
        ;
        ThreeRenderer.prototype.createCamera = function () {
            console.log("threejs camera is created");
            this._camera = new Camera_1.Camera({ x: 0, y: 40, z: 0 }, { x: -Math.PI / 2, y: 0, z: 0 });
        };
        ;
        ThreeRenderer.prototype.createBackground = function () { };
        ;
        ThreeRenderer.prototype.createActor = function (actor) {
            console.log("threejs actor created!");
            var board = new THREE.Mesh(new THREE.PlaneBufferGeometry(42, 20), new THREE.MeshStandardMaterial({
                color: "white",
                roughness: 1
            }));
            board.rotateX(-Math.PI / 2);
            board.position.setY(-.15);
            this._scene.add(board);
            var paddleDims = { x: 1, y: 0.5, z: 4 };
            var mesh = new Mesh_1.Mesh(actor, this._scene);
        };
        ;
        ThreeRenderer.prototype.createMaterial = function () { };
        ;
        ThreeRenderer.prototype.createDirectionalLight = function () {
            var centerLight = new THREE.HemisphereLight("white", "brown", 2);
            this._scene.add(centerLight);
            console.log("threejs sunlight created!");
        };
        ;
        return ThreeRenderer;
    }());
    exports.ThreeRenderer = ThreeRenderer;
});
define("core/GenericRenderer", ["require", "exports", "babylon/BabylonRenderer", "three/ThreeRenderer"], function (require, exports, BabylonRenderer_1, ThreeRenderer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GenericRenderer = (function () {
        function GenericRenderer(actorManager, renderers) {
            var _this = this;
            this.actorManager = actorManager;
            this.renderers = renderers;
            this._type = "generic";
            this.animationLoop = function () {
                requestAnimationFrame(_this.animationLoop);
                for (var _i = 0, _a = _this.actors; _i < _a.length; _i++) {
                    var actor = _a[_i];
                    if (actor.isTracker) {
                        var target = _this.actorManager.returnActorByName(actor.trackedTargetName);
                        if (actor.trackTargetAxis == "x") {
                            actor.location.x = target.location.x;
                        }
                        else if (actor.trackTargetAxis == "y") {
                            actor.location.y = target.location.y;
                        }
                        else if (actor.trackTargetAxis == "z") {
                            actor.location.z = target.location.z;
                        }
                    }
                }
            };
            this.frameworks = [];
            this.selectRenderer(renderers);
            this.actors = this.actorManager.getActors;
        }
        GenericRenderer.prototype.selectRenderer = function (renderers) {
            for (var _i = 0, renderers_1 = renderers; _i < renderers_1.length; _i++) {
                var renderer = renderers_1[_i];
                if (renderer == "babylonjs") {
                    this.frameworks.push(new BabylonRenderer_1.BabylonRenderer(this.actorManager));
                    console.log("using babylonJS");
                }
                if (renderer == "threejs") {
                    this.frameworks.push(new ThreeRenderer_1.ThreeRenderer(this.actorManager));
                    console.log("using threeJS");
                }
            }
        };
        GenericRenderer.prototype.do = function (func) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            for (var _a = 0, _b = this.frameworks; _a < _b.length; _a++) {
                var renderer = _b[_a];
                switch (func) {
                    case "createScene":
                        renderer.createScene();
                        break;
                    case "createCamera":
                        renderer.createCamera();
                        break;
                    case "createBackground":
                        renderer.createBackground();
                        break;
                    case "createActor":
                        renderer.createActor(args);
                        break;
                    case "createMaterial":
                        renderer.createMaterial();
                        break;
                    case "createDirectionalLight":
                        renderer.createDirectionalLight();
                        break;
                    case "addEvent":
                        renderer.addEvent();
                        break;
                    case "render":
                        renderer.render();
                        break;
                }
            }
        };
        GenericRenderer.prototype.createScene = function () {
            this.do("createScene");
        };
        ;
        GenericRenderer.prototype.createCamera = function () {
            this.do("createCamera");
        };
        GenericRenderer.prototype.createBackground = function () {
            this.do("createBackground");
        };
        GenericRenderer.prototype.createActor = function (actor) {
            for (var _i = 0, _a = this.frameworks; _i < _a.length; _i++) {
                var framework = _a[_i];
                framework.createActor(actor);
            }
            ;
        };
        ;
        GenericRenderer.prototype.createMaterial = function () {
            this.do("createMaterial");
        };
        ;
        GenericRenderer.prototype.createDirectionalLight = function () {
            this.do("createDirectionalLight");
        };
        ;
        GenericRenderer.prototype.addEvent = function () {
            this.do("addEvent");
        };
        ;
        GenericRenderer.prototype.render = function () {
            this.do("render");
            this.animationLoop();
        };
        ;
        return GenericRenderer;
    }());
    exports.GenericRenderer = GenericRenderer;
});
define("physics/PhysicsWorld", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PhysicsWorld = (function () {
        function PhysicsWorld(actorManager) {
            var _this = this;
            this.actorManager = actorManager;
            this.timeStep = 1.0 / 60.0;
            this.linearDamping = .01;
            this.angularDamping = .01;
            this.angularVelocity = 10;
            this.randomBounceMultiplier = 10;
            this.ballVelocity = -20;
            this.simLoop = function () {
                requestAnimationFrame(_this.simLoop);
                _this.world.step(_this.timeStep);
                if (_this.sphere) {
                    _this.actorManager.changeActorPropertyValue("ball", "location", {
                        x: _this.sphere.position.x,
                        y: _this.sphere.position.z,
                        z: _this.sphere.position.y
                    });
                }
                if (_this.world.contacts.length > 1) {
                    var contactPoint = _this.world.contacts[1].ni;
                    _this.sphere.velocity = contactPoint.mult(_this.ballVelocity);
                }
                var paddle1Loc = _this.actorManager.actorPropertyValue("paddle1", "location");
                if (_this.paddle)
                    _this.paddle.position.set(paddle1Loc.x, paddle1Loc.z, paddle1Loc.y);
                var paddleAILoc = _this.actorManager.actorPropertyValue("paddle2", "location");
                if (_this.aiPaddle)
                    _this.aiPaddle.position.set(paddleAILoc.x, paddleAILoc.z, paddleAILoc.y);
            };
            this.world = new CANNON.World();
            this.world.gravity.set(0, 0, -9.82);
            this.world.broadphase = new CANNON.NaiveBroadphase();
            this.createPlane(1);
            this.createCollisionObjects();
            this.world.solver.iterations = 5;
            this.simLoop();
        }
        PhysicsWorld.prototype.createSphere = function (actor) {
            var mass = actor.mass, radius = actor.scale.x / 2, speedMult = 15;
            var sphereShape = new CANNON.Sphere(radius);
            this.sphere = new CANNON.Body({
                mass: mass,
                shape: sphereShape,
                linearDamping: this.linearDamping,
                angularDamping: this.angularDamping
            });
            this.sphere.position.set(actor.location.x, actor.location.z, actor.location.y);
            this.sphere.velocity.set(speedMult / 2, speedMult, 0);
            this.world.addBody(this.sphere);
        };
        PhysicsWorld.prototype.createBox = function (actor) {
            if (actor.name == "paddle1") {
                this.createPaddle(actor);
            }
            else if (actor.name == "paddle2") {
                this.createPaddle(actor);
            }
            else {
                var boxShape = new CANNON.Box(new CANNON.Vec3(actor.scale.x / 2, actor.scale.z, actor.scale.y));
                var boxBody = new CANNON.Body({
                    mass: actor.mass,
                    shape: boxShape,
                    linearDamping: this.linearDamping,
                    angularDamping: this.angularDamping
                });
                boxBody.position.set(actor.location.x, actor.location.z, actor.location.y);
                this.world.addBody(boxBody);
            }
        };
        PhysicsWorld.prototype.createPaddle = function (actor) {
            var paddleShape = new CANNON.Box(new CANNON.Vec3(actor.scale.x / 2, actor.scale.z, actor.scale.y));
            var paddleBody = new CANNON.Body({
                mass: actor.mass,
                shape: paddleShape,
                linearDamping: this.linearDamping,
                angularDamping: this.angularDamping
            });
            paddleBody.position.set(actor.location.x, actor.location.z, actor.location.y);
            this.world.addBody(paddleBody);
            if (actor.name == "paddle1") {
                this.paddle = paddleBody;
            }
            else if (actor.name == "paddle2") {
                this.aiPaddle = paddleBody;
            }
        };
        PhysicsWorld.prototype.createCollisionObjects = function () {
            var actors = this.actorManager.getActors;
            for (var _i = 0, actors_3 = actors; _i < actors_3.length; _i++) {
                var actor = actors_3[_i];
                if (actor.isRigidBody && actor.type == "box") {
                    this.createBox(actor);
                }
                else if (actor.isRigidBody && actor.type == "sphere") {
                    this.createSphere(actor);
                }
            }
        };
        PhysicsWorld.prototype.createPlane = function (height, rotation) {
            if (rotation === void 0) { rotation = 0; }
            var groundShape = new CANNON.Plane();
            var groundBody = new CANNON.Body({
                mass: 0,
                shape: groundShape,
                linearDamping: this.linearDamping,
                angularDamping: this.angularDamping
            });
            groundBody.position.set(0, height, 0);
            this.world.addBody(groundBody);
        };
        return PhysicsWorld;
    }());
    exports.PhysicsWorld = PhysicsWorld;
});
define("core/start", ["require", "exports", "core/ActorBuilder", "core/GenericRenderer", "core/ActorManager", "physics/PhysicsWorld"], function (require, exports, ActorBuilder_1, GenericRenderer_1, ActorManager_1, PhysicsWorld_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Start = (function () {
        function Start(config) {
            var actorManager = new ActorManager_1.ActorManager();
            var paddle1 = new ActorBuilder_1.ActorBuilder(actorManager, { name: "paddle1", isRigidBody: true, draggable: true, constrainToAxis: "x", color: "#FF0000", location: { x: 0, y: 0.5, z: 12 }, scale: { x: 6, y: 1, z: 1 } });
            var paddle2 = new ActorBuilder_1.ActorBuilder(actorManager, { name: "paddle2", isRigidBody: true, color: "#00FF00", location: { x: 0, y: 0.5, z: -12 }, scale: { x: 6, y: 1, z: 1 }, isTracker: true, trackedTargetName: "ball", trackTargetAxis: "x" });
            var ball = new ActorBuilder_1.ActorBuilder(actorManager, { name: "ball", color: "#49acad", isRigidBody: true, mass: 2, location: { x: 0, y: 0.5, z: 0 }, type: "sphere" });
            var topWall = new ActorBuilder_1.ActorBuilder(actorManager, { name: "topWall", isRigidBody: true, color: "#65aaa4", location: { x: -10, y: 0.5, z: 0 }, scale: { x: 1, y: 1, z: 41 } });
            var bottomWall = new ActorBuilder_1.ActorBuilder(actorManager, { name: "bottomWall", isRigidBody: true, color: "#65aaa4", location: { x: 10, y: 0.5, z: 0 }, scale: { x: 1, y: 1, z: 41 } });
            var rightWall = new ActorBuilder_1.ActorBuilder(actorManager, { name: "rightWall", isRigidBody: true, color: "#65aaa4", location: { x: 0, y: 0.5, z: -20 }, scale: { x: 19, y: 1, z: 1 } });
            var leftWall = new ActorBuilder_1.ActorBuilder(actorManager, { name: "leftWall", isRigidBody: true, color: "#65aaa4", location: { x: 0, y: 0.5, z: 20 }, scale: { x: 19, y: 1, z: 1 } });
            this.renderer = new GenericRenderer_1.GenericRenderer(actorManager, config);
            this.renderer.createScene();
            this.renderer.createCamera();
            this.renderer.createBackground();
            this.renderer.createActor([paddle1, paddle2, ball, topWall, bottomWall, rightWall, leftWall]);
            this.renderer.createDirectionalLight();
            this.renderer.render();
            this.renderer.addEvent();
            var physicsWorld = new PhysicsWorld_1.PhysicsWorld(actorManager);
        }
        return Start;
    }());
    exports.Start = Start;
});
define("main", ["require", "exports", "core/renderer_config", "core/start"], function (require, exports, renderer_config_1, start_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var startGame = new start_1.Start(renderer_config_1.renderers);
});
define("babylon/Pong", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Pong = (function () {
        function Pong(array) {
            this.initGame();
            this.createScene();
            this.createPaddles(array);
            this.animate();
        }
        Pong.prototype.initGame = function () {
            this._canvas = document.getElementById('renderCanvas');
            this._engine = new BABYLON.Engine(this._canvas, true);
        };
        Pong.prototype.createScene = function () {
            this._scene = new BABYLON.Scene(this._engine);
            this._scene.clearColor = BABYLON.Color4.FromHexString("#8bfff8FF");
            this._camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 20, new BABYLON.Vector3(0, 0, 0), this._scene);
            this._camera.setTarget(BABYLON.Vector3.Zero());
            this._camera.attachControl(this._canvas, false);
            this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);
            var ground = BABYLON.MeshBuilder.CreateGround('ground1', {
                width: 20, height: 40, subdivisions: 2
            }, this._scene);
            var probe = new BABYLON.ReflectionProbe('groundProbe', 256, this._scene, true);
            var groundMat = new BABYLON.PBRMaterial('groundMat', this._scene);
            groundMat.reflectivityColor = BABYLON.Color3.White();
            groundMat.microSurface = 0;
            groundMat.reflectionTexture = probe.cubeTexture;
        };
        Pong.prototype.createPaddles = function (actors) {
            for (var _i = 0, actors_4 = actors; _i < actors_4.length; _i++) {
                var actor = actors_4[_i];
                var paddle = BABYLON.MeshBuilder.CreateBox(actor.name, { width: actor.scale.x, height: actor.scale.y, depth: actor.scale.z }, this._scene);
                paddle.position = new BABYLON.Vector3(actor.location.x, actor.location.y, actor.location.z);
                var material = new BABYLON.PBRMaterial('mat', this._scene);
                material.albedoColor = BABYLON.Color3.FromHexString(actor.color);
                material.reflectivityColor = BABYLON.Color3.Gray();
                material.microSurface = .25;
                paddle.material = material;
            }
        };
        Pong.prototype.animate = function () {
            var _this = this;
            this._engine.runRenderLoop(function () {
                _this._scene.render();
            });
            window.addEventListener('resize', function () {
                _this._engine.resize();
            });
        };
        return Pong;
    }());
    exports.Pong = Pong;
});
var SetupNew = (function () {
    function SetupNew() {
    }
    SetupNew.prototype.createScene = function (sceneColor) {
        this.renderer.start(sceneColor);
    };
    return SetupNew;
}());
define("generic/Ball", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Ball = (function () {
        function Ball(context, x, y, radius, startAngle, endAngle, color, stroke, strokeWidth) {
            if (radius === void 0) { radius = 10; }
            if (startAngle === void 0) { startAngle = 0; }
            if (endAngle === void 0) { endAngle = 2 * Math.PI; }
            if (color === void 0) { color = "#FFC197"; }
            if (stroke === void 0) { stroke = "black"; }
            if (strokeWidth === void 0) { strokeWidth = 4; }
            this.context = context;
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.startAngle = startAngle;
            this.endAngle = endAngle;
            this.color = color;
            this.stroke = stroke;
            this.strokeWidth = strokeWidth;
            this.drawBall(context, x, y, radius, startAngle, endAngle, color, stroke, strokeWidth);
        }
        Ball.prototype.drawBall = function (context, x, y, radius, startAngle, endAngle, color, stroke, strokeWidth) {
            var counterClockwise = false;
            context.beginPath();
            context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
            context.lineWidth = strokeWidth;
            context.strokeStyle = stroke;
            context.stroke();
            context.fillStyle = color;
            context.fill();
        };
        Ball.prototype.render = function () {
            console.log("Ball is rendering");
        };
        return Ball;
    }());
    exports.Ball = Ball;
});
define("three/Background", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Background = (function () {
        function Background(scene, radius) {
            if (radius === void 0) { radius = 100; }
            this.scene = scene;
            this.radius = radius;
            var texture = this.loadTexture();
            this.createSphereMap(radius, texture);
        }
        Background.prototype.loadTexture = function () {
            var texture = new THREE.TextureLoader().load("assets/textures/OceanWithClouds.png");
            return texture;
        };
        Background.prototype.createSphereMap = function (radius, texture) {
            var sphere = new THREE.SphereBufferGeometry(radius, 32, 16);
            var mat = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide,
                shading: THREE.SmoothShading
            });
            var skyBox = new THREE.Mesh(sphere, mat);
            this.scene.add(skyBox);
        };
        return Background;
    }());
    exports.Background = Background;
});
define("three/PongLight", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PongLight = (function (_super) {
        __extends(PongLight, _super);
        function PongLight(col, scene, loc, bright) {
            if (loc === void 0) { loc = { x: 0, y: 0, z: 0 }; }
            if (bright === void 0) { bright = 1; }
            var _this = _super.call(this) || this;
            _this.col = col;
            _this.scene = scene;
            _this.loc = loc;
            _this.bright = bright;
            _this.color = new THREE.Color(col);
            _this.intensity = bright;
            _this.positionLight(loc);
            _this.scene.add(_this);
            return _this;
        }
        PongLight.prototype.positionLight = function (loc) {
            this.position.set(loc.x, loc.y, loc.z);
        };
        return PongLight;
    }(THREE.PointLight));
    exports.PongLight = PongLight;
});
define("three/Pong", ["require", "exports", "three/Mesh", "three/Camera", "three/Render"], function (require, exports, Mesh_2, Camera_2, Render_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Pong = (function () {
        function Pong(actor) {
            var scene = new THREE.Scene();
            var camera = new Camera_2.Camera({ x: 0, y: 30, z: 0 }, { x: -Math.PI / 2, y: 0, z: 0 });
            var renderer = new Render_2.Render(scene, camera);
            var centerLight = new THREE.HemisphereLight("white", "brown", 2);
            scene.add(centerLight);
            var paddleDims = { x: 1, y: 0.5, z: 4 };
            var compPaddle = new Mesh_2.Mesh(actor, scene);
            var board = new THREE.Mesh(new THREE.PlaneBufferGeometry(50, 25), new THREE.MeshStandardMaterial({
                color: "white",
                roughness: 1
            }));
            board.rotateX(-Math.PI / 2);
            board.position.setY(-.15);
            scene.add(board);
        }
        return Pong;
    }());
    exports.Pong = Pong;
});
//# sourceMappingURL=main.js.map