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
define("Background", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
define("Camera", ["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PongCamera = (function (_super) {
        __extends(PongCamera, _super);
        function PongCamera() {
            var _this = _super.call(this, 75, window.innerWidth / window.innerHeight, 0.1, 1000) || this;
            _this.setPosition();
            return _this;
        }
        PongCamera.prototype.setPosition = function () {
            this.position.y = -10;
            this.rotateX(Math.PI / 2);
        };
        return PongCamera;
    }(THREE.PerspectiveCamera));
    exports.PongCamera = PongCamera;
});
define("Paddle", ["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Paddle = (function () {
        function Paddle(dimensions, location, scene) {
            this.dimensions = dimensions;
            this.location = location;
            this.scene = scene;
            this.mesh = this.buildMesh(dimensions);
            this.setPosition(this.mesh, location);
            this.scene.add(this.mesh);
        }
        Paddle.prototype.buildMesh = function (dims) {
            var geo = new THREE.BoxGeometry(dims.width, dims.height, dims.depth);
            var mat = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
            var mesh = new THREE.Mesh(geo, mat);
            return mesh;
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
    Object.defineProperty(exports, "__esModule", { value: true });
    var PongRender = (function (_super) {
        __extends(PongRender, _super);
        function PongRender(scene, camera) {
            var _this = _super.call(this) || this;
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
define("Pong", ["require", "exports", "three", "Paddle", "Camera", "PongRender"], function (require, exports, THREE, Paddle_1, Camera_1, PongRender_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Pong = (function () {
        function Pong() {
            var scene = new THREE.Scene();
            var camera = new Camera_1.PongCamera();
            var renderer = new PongRender_1.PongRender(scene, camera);
            var paddleDims = { width: 1, height: 0.5, depth: 4 };
            var compPaddle = new Paddle_1.Paddle(paddleDims, { x: -15, y: 0, z: 0 }, scene);
            var playerPaddle = new Paddle_1.Paddle(paddleDims, { x: 15, y: 0, z: 0 }, scene);
        }
        return Pong;
    }());
    exports.Pong = Pong;
});
define("main", ["require", "exports", "Pong"], function (require, exports, Pong_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var pong = new Pong_1.Pong();
});
define("Paddle_old", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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