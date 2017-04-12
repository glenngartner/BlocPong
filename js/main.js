var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("core/renderer_config", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.graphicsLibs = {
        three: true,
        babylon: false
    };
});
define("babylon/Pong", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Pong = (function () {
        function Pong() {
            this.initGame();
            this.createScene();
            this.createPaddles('paddle1', 4, 1, 1, 0, 0, 10);
            this.createPaddles('paddle2', 4, 1, 1, 0, 0, -10);
            this.animate();
        }
        Pong.prototype.initGame = function () {
            this._canvas = document.getElementById('renderCanvas');
            this._engine = new BABYLON.Engine(this._canvas, true);
        };
        Pong.prototype.createScene = function () {
            this._scene = new BABYLON.Scene(this._engine);
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
        Pong.prototype.createPaddles = function (name, w, h, d, x, y, z) {
            var paddle = BABYLON.MeshBuilder.CreateBox(name, { width: w, height: h, depth: d }, this._scene);
            paddle.position = new BABYLON.Vector3(x, y, z);
            var material = new BABYLON.PBRMaterial('mat', this._scene);
            material.albedoColor = BABYLON.Color3.Red();
            material.reflectivityColor = BABYLON.Color3.Gray();
            material.microSurface = .25;
            paddle.material = material;
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
define("three/Paddle", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Paddle = (function () {
        function Paddle(dims, location, color, scene) {
            this.dims = dims;
            this.location = location;
            this.color = color;
            this.scene = scene;
            this.mesh = this.buildMesh(dims, color);
            this.setPosition(this.mesh, location);
            this.scene.add(this.mesh);
        }
        Paddle.prototype.buildMesh = function (dims, color) {
            var geo = new THREE.BoxGeometry(dims.x, dims.y, dims.z);
            var mat = this.buildMaterial(color);
            var mesh = new THREE.Mesh(geo, mat);
            return mesh;
        };
        Paddle.prototype.buildMaterial = function (color) {
            var mat = new THREE.MeshStandardMaterial();
            mat.color = new THREE.Color(color);
            mat.roughness = 0.25;
            return mat;
        };
        Paddle.prototype.setPosition = function (mesh, loc) {
            mesh.position.set(loc.x, loc.y, loc.z);
        };
        return Paddle;
    }());
    exports.Paddle = Paddle;
});
define("three/Camera", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PongCamera = (function (_super) {
        __extends(PongCamera, _super);
        function PongCamera(loc, rot) {
            if (loc === void 0) { loc = { x: 0, y: 10, z: 0 }; }
            if (rot === void 0) { rot = { x: -Math.PI / 2, y: 0, z: 0 }; }
            var _this = _super.call(this, 35, window.innerWidth / window.innerHeight, 0.1, 1000) || this;
            _this.loc = loc;
            _this.rot = rot;
            _this.setPosition(loc, rot);
            _this.setControls();
            return _this;
        }
        PongCamera.prototype.setPosition = function (loc, rot) {
            this.position.set(loc.x, loc.y, loc.z);
            this.rotateX(rot.x);
        };
        PongCamera.prototype.setControls = function () {
            var controls = new THREE.OrbitControls(this);
        };
        return PongCamera;
    }(THREE.PerspectiveCamera));
    exports.PongCamera = PongCamera;
});
define("three/PongRender", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PongRender = (function (_super) {
        __extends(PongRender, _super);
        function PongRender(scene, camera) {
            var _this = _super.call(this, {
                antialias: true
            }) || this;
            _this.scene = scene;
            _this.camera = camera;
            _this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.render(_this.scene, _this.camera);
            };
            _this.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(_this.domElement);
            _this.animate();
            return _this;
        }
        return PongRender;
    }(THREE.WebGLRenderer));
    exports.PongRender = PongRender;
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
define("three/Pong", ["require", "exports", "three/Paddle", "three/Camera", "three/PongRender", "three/PongLight", "three/Background"], function (require, exports, Paddle_1, Camera_1, PongRender_1, PongLight_1, Background_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Pong = (function () {
        function Pong() {
            var scene = new THREE.Scene();
            var camera = new Camera_1.PongCamera({ x: 0, y: 30, z: 0 }, { x: -Math.PI / 2, y: 0, z: 0 });
            var renderer = new PongRender_1.PongRender(scene, camera);
            var background = new Background_1.Background(scene);
            var centerLight = new PongLight_1.PongLight(0xFFFFFF, scene, { x: 0, y: 10, z: 0 }, 2);
            var paddleDims = { x: 1, y: 0.5, z: 4 };
            var compPaddle = new Paddle_1.Paddle(paddleDims, { x: -14, y: 0, z: 0 }, 0xFF0000, scene);
            var playerPaddle = new Paddle_1.Paddle(paddleDims, { x: 14, y: 0, z: 0 }, 0xFFFF00, scene);
            var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 32, 16), new THREE.MeshStandardMaterial({
                roughness: .25,
                metalness: 1,
                shading: THREE.SmoothShading
            }));
            scene.add(sphere);
            var board = new THREE.Mesh(new THREE.PlaneBufferGeometry(50, 25), new THREE.MeshStandardMaterial({
                roughness: .25,
                metalness: 1
            }));
            board.rotateX(-Math.PI / 2);
            board.position.setY(-.15);
        }
        return Pong;
    }());
    exports.Pong = Pong;
});
define("core/start", ["require", "exports", "babylon/Pong", "three/Pong"], function (require, exports, tsPong, threePong) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Start = (function () {
        function Start(config) {
            this.selectRenderer(config);
        }
        Start.prototype.selectRenderer = function (config) {
            if (config.babylon == true) {
                console.log("BabylonJS is active!");
                var pong = new tsPong.Pong();
            }
            else if (config.three == true) {
                console.log("threeJS is active!");
                var pong = new threePong.Pong();
            }
            else {
                console.log("You have no renderers active!");
            }
        };
        return Start;
    }());
    exports.Start = Start;
});
define("main", ["require", "exports", "core/renderer_config", "core/start"], function (require, exports, renderer_config_1, start_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var startGame = new start_1.Start(renderer_config_1.graphicsLibs);
});
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
//# sourceMappingURL=main.js.map