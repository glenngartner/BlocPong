/**
 * Created by glenn on 2/28/2017.
 */
export class Background {

    constructor(
        public canvas: HTMLCanvasElement,
        public context:CanvasRenderingContext2D,
        public color: string = "#D0BAAA"
    ){
        this.drawBackground(canvas, context, color);
    }

    drawBackground(canvas: HTMLCanvasElement, context:CanvasRenderingContext2D, color:string){
        // draw background fill color
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}