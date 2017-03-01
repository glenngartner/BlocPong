/**
 * Created by glenn on 2/28/2017.
 */
import {Pong} from "Pong";

let canvas = <HTMLCanvasElement>document.getElementById('pongCanvas');
configureCanvas(canvas);
let context = canvas.getContext('2d');
let pong = new Pong(canvas, context);

function configureCanvas(canvas){
    canvas.width = 1200;
    canvas.height = 800;
}