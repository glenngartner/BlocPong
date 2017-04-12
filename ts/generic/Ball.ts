/**
 * Created by glenn on 2/28/2017.
 */

export class Ball {

    constructor(
        public context: CanvasRenderingContext2D,
        public x: number,
        public y: number,
        public radius: number = 10,
        private startAngle: number = 0,
        private endAngle: number = 2 * Math.PI,
        public color: string = "#FFC197",
        public stroke: string = "black",
        public strokeWidth: number = 4
    ) {
        this.drawBall(context, x, y, radius, startAngle, endAngle, color, stroke, strokeWidth);
    }

    drawBall(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        radius: number,
        startAngle: number,
        endAngle,
        color: string,
        stroke: string,
        strokeWidth: number
    ) {
        let counterClockwise = false;
        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        context.lineWidth = strokeWidth;

        context.strokeStyle = stroke;
        context.stroke();
        context.fillStyle = color;
        context.fill();

    }

    render(){
        console.log("Ball is rendering");
    }

}