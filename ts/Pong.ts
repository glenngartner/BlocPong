/**
 * Created by glenn on 2/28/2017.
 */

import {Background} from "Background";
import {Paddle} from "Paddle";
import {Ball} from "Ball";

export class Pong {
    computer: Paddle;
    player: Paddle;
    ball: Ball;

    constructor(public canvas:HTMLCanvasElement, public context: CanvasRenderingContext2D){
        let background = new Background(canvas, context);
        this.createPlayers(this.context);
        this.createBall(context);
        this.render();
    }

    createPlayers(context){
        this.computer = new Paddle(context, 25, 25);
        this.player = new Paddle(context, this.canvas.width - 75, this.canvas.height-200);
    }

    createBall(context){
        this.ball = new Ball(context, 350, 200);
    }

    render(){
        this.computer.render();
        this.player.render();
    }
}