/**
 * Created by glenn on 2/28/2017.
 */
import * as THREE from "three";
// import {Background} from "Background";
// import {Paddle} from "Paddle";
// import {Ball} from "Ball";

export class Pong {
    // computer: Paddle;
    // player: Paddle;
    // ball: Ball;

    // constructor(public canvas:HTMLCanvasElement, public context: CanvasRenderingContext2D){
    //     let background = new Background(canvas, context);
    //     this.createPlayers(this.context);
    //     this.createBall(context);
    //     this.render();
    // }

    // createPlayers(context){
    //     this.computer = new Paddle(context, 25, 25);
    //     this.player = new Paddle(context, this.canvas.width - 75, this.canvas.height-200);
    // } 

    // createBall(context){
    //     this.ball = new Ball(context, 350, 200);
    // }

    // render(){
    //     this.computer.render();
    //     this.player.render();
    // }

    constructor() {
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
    }
}
