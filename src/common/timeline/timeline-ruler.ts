import { Colors } from './../ui/colors';

export class TimelineRuler {

    readonly lineWidth = 1;
    readonly textStyle = new PIXI.TextStyle({
        fill: Colors.BLACK,
        fontSize: 13
    });

    private rulerContainer_: PIXI.Container;
    private rulerGraphics_: PIXI.Graphics;

    /* Width in pixel of the ruler */
    private width_: number;

    /* X and Y position of the ruler */
    private positionX_: number;
    private positionY_: number;

    /* Heigth of the canvas used to draw the events */
    private heigth_: number;

    constructor(x: number, y: number, heigth: number) {
        this.rulerContainer_ = new PIXI.Container();
        this.rulerGraphics_ = new PIXI.Graphics();
        this.width_ = 1000;

        this.positionX_ = x;
        this.positionY_ = y;
        this.heigth_ = heigth;
    }

    public clear(): void {
        this.rulerGraphics_.clear();
    }

    public drawRuler(): void {
        this.clear();
        this.rulerGraphics_.lineStyle(this.lineWidth, Colors.BLACK);
        this.rulerGraphics_.moveTo(this.positionX_, this.positionY_);
        this.rulerGraphics_.lineTo(this.positionX_ + this.width_, this.positionY_);

        let numberOfDelimitation = 5;
        let delta = this.width_ / numberOfDelimitation;

        this.rulerContainer_.removeChildren();
        for (let i = 0; i < numberOfDelimitation; ++i) {
            this.drawSeparation(this.positionX_ + i * delta, this.heigth_);
        }
    }

    private drawSeparation(start: number, height: number): void {
        this.rulerGraphics_.lineStyle(this.lineWidth, Colors.BLACK);
        this.rulerGraphics_.moveTo(start, 3);
        this.rulerGraphics_.lineTo(start, height);

        //let time = new PIXI.Text(this.formatTime(visibleWindow.min + start * timePerPixel), this.textStyle);
        let time = new PIXI.Text(this.formatTime(start * 10), this.textStyle);
        time.x = start + 5;
        time.y = 0;
        this.rulerContainer_.addChild(time);
    }

    private formatTime(time: number): string {
        let date = new Date(time / 1000000);
        let milliseconds = date.getMilliseconds();
        let millisecondsText = milliseconds < 100 ? "0" + milliseconds : milliseconds;
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}: ${millisecondsText}`;
    }
}
