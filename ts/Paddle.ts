/**
 * Created by glenn on 2/28/2017.
 */

export class Paddle {

    constructor(
        public context: CanvasRenderingContext2D,
        public x: number,
        public y: number,
        public width: number = 20,
        public height: number = 100,
        public color: string = "#A2DDFF",
        public stroke: string = "black",
        public strokeWidth: number = 3
    ) {
        this.drawPaddle(context, x, y, width, height, color, stroke, strokeWidth);
    }

    drawPaddle(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        color: string,
        stroke: string,
        strokeWidth: number
    ) {
        context.beginPath();
        context.rect(x, y, width, height);
        context.fillStyle = color;
        context.fill();
        context.lineWidth = strokeWidth;
        context.strokeStyle = stroke;
        context.stroke();
    }

    render(){
        console.log("Paddle is rendering");
    }

}