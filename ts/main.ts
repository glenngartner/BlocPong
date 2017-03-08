/**
 * Created by glenn on 2/28/2017.
 */
// import {Pong} from "Pong";
    import * as THREE from "three";

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
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var render = function () {
    requestAnimationFrame( render );

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);
};

render();