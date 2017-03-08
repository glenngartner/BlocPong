define("Background", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by glenn on 2/28/2017.
     */
    var Background = (function () {
        function Background(canvas, context, color) {
            if (color === void 0) { color = "#D0BAAA"; }
            this.canvas = canvas;
            this.context = context;
            this.color = color;
            this.drawBackground(canvas, context, color);
        }
        Background.prototype.drawBackground = function (canvas, context, color) {
            // draw background fill color
            context.fillStyle = color;
            context.fillRect(0, 0, canvas.width, canvas.height);
        };
        return Background;
    }());
    exports.Background = Background;
});
/**
 * Created by glenn on 2/28/2017.
 */
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
/**
 * Created by glenn on 2/28/2017.
 */
define("Paddle", ["require", "exports"], function (require, exports) {
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
/**
 * Created by glenn on 2/28/2017.
 */
define("Pong", ["require", "exports", "Background", "Paddle", "Ball"], function (require, exports, Background_1, Paddle_1, Ball_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Pong = (function () {
        function Pong(canvas, context) {
            this.canvas = canvas;
            this.context = context;
            var background = new Background_1.Background(canvas, context);
            this.createPlayers(this.context);
            this.createBall(context);
            this.render();
        }
        Pong.prototype.createPlayers = function (context) {
            this.computer = new Paddle_1.Paddle(context, 25, 25);
            this.player = new Paddle_1.Paddle(context, this.canvas.width - 75, this.canvas.height - 200);
        };
        Pong.prototype.createBall = function (context) {
            this.ball = new Ball_1.Ball(context, 350, 200);
        };
        Pong.prototype.render = function () {
            this.computer.render();
            this.player.render();
        };
        return Pong;
    }());
    exports.Pong = Pong;
});
define("main", ["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // let canvas = <HTMLCanvasElement>document.getElementById('pongCanvas');
    // configureCanvas(canvas);
    // let context = canvas.getContext('2d');
    // let pong = new Pong(canvas, context);
    //
    // function configureCanvas(canvas){
    //     canvas.width = 1200;
    //     canvas.height = 800;
    // }
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    var render = function () {
        requestAnimationFrame(render);
        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
        renderer.render(scene, camera);
    };
    render();
});
//# sourceMappingURL=main.js.map