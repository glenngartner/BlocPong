var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("Background", ["require", "exports"], function (require, exports) {
    "use strict";
    var Background = (function () {
        function Background(canvas, context, color) {
            if (color === void 0) { color = "#D0BAAA"; }
            this.canvas = canvas;
            this.context = context;
            this.color = color;
            this.drawBackground(canvas, context, color);
        }
        Background.prototype.drawBackground = function (canvas, context, color) {
            context.fillStyle = color;
            context.fillRect(0, 0, canvas.width, canvas.height);
        };
        return Background;
    }());
    exports.Background = Background;
});
define("Ball", ["require", "exports"], function (require, exports) {
    "use strict";
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
define("Camera", ["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    var PongCamera = (function (_super) {
        __extends(PongCamera, _super);
        function PongCamera() {
            _super.call(this, 75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.setPosition();
        }
        PongCamera.prototype.setPosition = function () {
            this.position.y = 10;
            this.rotateX(-Math.PI / 2);
        };
        return PongCamera;
    }(THREE.PerspectiveCamera));
    exports.PongCamera = PongCamera;
});
define("Paddle", ["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    var Paddle = (function () {
        function Paddle(dimensions, location, color, scene) {
            this.dimensions = dimensions;
            this.location = location;
            this.color = color;
            this.scene = scene;
            this.mesh = this.buildMesh(dimensions, color);
            this.setPosition(this.mesh, location);
            this.scene.add(this.mesh);
        }
        Paddle.prototype.buildMesh = function (dims, color) {
            var geo = new THREE.BoxGeometry(dims.width, dims.height, dims.depth);
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
        Paddle.prototype.setPosition = function (mesh, location) {
            mesh.position.set(location.x, location.y, location.z);
        };
        return Paddle;
    }());
    exports.Paddle = Paddle;
});
define("PongRender", ["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    var PongRender = (function (_super) {
        __extends(PongRender, _super);
        function PongRender(scene, camera) {
            var _this = this;
            _super.call(this);
            this.scene = scene;
            this.camera = camera;
            this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.render(_this.scene, _this.camera);
            };
            this.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(this.domElement);
            this.animate();
        }
        return PongRender;
    }(THREE.WebGLRenderer));
    exports.PongRender = PongRender;
});
define("PongLight", ["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    var PongLight = (function (_super) {
        __extends(PongLight, _super);
        function PongLight(col, scene, loc, bright) {
            if (loc === void 0) { loc = { x: 0, y: 0, z: 0 }; }
            if (bright === void 0) { bright = 1; }
            _super.call(this);
            this.col = col;
            this.scene = scene;
            this.loc = loc;
            this.bright = bright;
            this.color = new THREE.Color(col);
            this.intensity = bright;
            this.positionLight(loc);
            this.scene.add(this);
        }
        PongLight.prototype.positionLight = function (loc) {
            this.position.set(loc.x, loc.y, loc.z);
        };
        return PongLight;
    }(THREE.PointLight));
    exports.PongLight = PongLight;
});
define("Pong", ["require", "exports", "three", "Paddle", "Camera", "PongRender", "PongLight"], function (require, exports, THREE, Paddle_1, Camera_1, PongRender_1, PongLight_1) {
    "use strict";
    var Pong = (function () {
        function Pong() {
            var scene = new THREE.Scene();
            var camera = new Camera_1.PongCamera();
            var renderer = new PongRender_1.PongRender(scene, camera);
            var centerLight = new PongLight_1.PongLight(0xFFFFFF, scene, { x: 0, y: 10, z: 0 }, 2);
            var paddleDims = { width: 1, height: 0.5, depth: 4 };
            var compPaddle = new Paddle_1.Paddle(paddleDims, { x: -14, y: 0, z: 0 }, 0xFF0000, scene);
            var playerPaddle = new Paddle_1.Paddle(paddleDims, { x: 14, y: 0, z: 0 }, 0xFFFF00, scene);
        }
        return Pong;
    }());
    exports.Pong = Pong;
});
define("main", ["require", "exports", "Pong"], function (require, exports, Pong_1) {
    "use strict";
    var pong = new Pong_1.Pong();
});
define("Paddle_old", ["require", "exports"], function (require, exports) {
    "use strict";
    var Paddle = (function () {
        function Paddle(context, x, y, width, height, color, stroke, strokeWidth) {
            if (width === void 0) { width = 20; }
            if (height === void 0) { height = 100; }
            if (color === void 0) { color = "#A2DDFF"; }
            if (stroke === void 0) { stroke = "black"; }
            if (strokeWidth === void 0) { strokeWidth = 3; }
            this.context = context;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.stroke = stroke;
            this.strokeWidth = strokeWidth;
            this.drawPaddle(context, x, y, width, height, color, stroke, strokeWidth);
        }
        Paddle.prototype.drawPaddle = function (context, x, y, width, height, color, stroke, strokeWidth) {
            context.beginPath();
            context.rect(x, y, width, height);
            context.fillStyle = color;
            context.fill();
            context.lineWidth = strokeWidth;
            context.strokeStyle = stroke;
            context.stroke();
        };
        Paddle.prototype.render = function () {
            console.log("Paddle is rendering");
        };
        return Paddle;
    }());
    exports.Paddle = Paddle;
});
//# sourceMappingURL=main.js.map