import { Colors } from './../ui/colors';
import { VisibleWindow } from './../visible-window';

export class TimelineRuler {

    private readonly lineWidth = 1;
    private readonly textStyle = new PIXI.TextStyle({
        fill: Colors.BLACK,
        fontSize: 13
    });

    public rulerContainer_: PIXI.Container;
    private rulerGraphics_: PIXI.Graphics;
    private context_: VisibleWindow;

    /* Width in pixel of the ruler */
    private width_: number;
    /* Heigth in pixel of the canvas used to draw the events */
    private heigth_: number;

    /* X and Y position of the ruler */
    private positionX_: number;
    private positionY_: number;

    constructor(x: number, y: number, width: number, heigth: number) {
        this.rulerContainer_ = new PIXI.Container();
        this.rulerGraphics_ = new PIXI.Graphics();

        this.positionX_ = x;
        this.positionY_ = y;
        this.width_ = width;
        this.heigth_ = heigth;
    }

    set context(context: VisibleWindow) {
        this.context_ = context;
    }

    public clear() {
        this.rulerGraphics_.clear();
    }

    public draw() {
        this.clear();
        this.rulerGraphics_.lineStyle(this.lineWidth, Colors.BLACK);
        this.rulerGraphics_.moveTo(this.positionX_, this.positionY_ + 20);
        this.rulerGraphics_.lineTo(this.positionX_ + this.width_, this.positionY_ + 20);

        let numberOfDelimitation = 5;
        let delta = this.width_ / numberOfDelimitation;

        this.rulerContainer_.removeChildren();
        for (let i = 0; i < numberOfDelimitation; ++i) {
            this.drawSeparation(this.positionX_ + i * delta, this.heigth_);
        }
        this.rulerContainer_.addChild(this.rulerGraphics_);
    }

    private drawSeparation(start: number, height: number) {
        this.rulerGraphics_.lineStyle(this.lineWidth, Colors.BLACK);
        this.rulerGraphics_.moveTo(start, this.positionY_);
        this.rulerGraphics_.lineTo(start, height);

        let time = new PIXI.Text(this.formatTime(this.context_.min + start * this.context_.resolution), this.textStyle);
        time.x = start + 5;
        time.y = this.positionY_;
        this.rulerContainer_.addChild(time);
    }

    private formatTime(time: number): string {
        let date = new Date(time / 1000000);
        let milliseconds = date.getMilliseconds();
        let millisecondsText = milliseconds < 100 ? "0" + milliseconds : milliseconds;
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}: ${millisecondsText}`;
    }
}
