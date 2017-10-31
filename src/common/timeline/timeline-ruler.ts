import { Colors } from './../ui/colors';

export class TimelineRuler {

    readonly lineWidth = 1;

    private rulerContainer_: PIXI.Container;
    private rulerGraphics_: PIXI.Graphics;

    /* Width in pixel of the ruler */
    private width_: number;

    constructor() {
        this.rulerContainer_ = new PIXI.Container();
        this.rulerGraphics_ = new PIXI.Graphics();
        this.width_ = 1000;
    }

    public clear(): void {
        this.rulerGraphics_.clear();
    }

    public drawRuler(): void {
        this.clear();
        this.rulerGraphics_.lineStyle(this.lineWidth, Colors.BLACK);
        this.rulerGraphics_.moveTo(treeOffset, 19);
        this.rulerGraphics_.lineTo(this.width_, 19);

        let numberOfDelimitation = 5;
        let delta = this.width_ / numberOfDelimitation;

        this.rulerContainer_.removeChildren();
        for (let i = 0; i < numberOfDelimitation; ++i) {
            this.drawSeparation(treeOffset + i * delta, canvas.height - 3);
        }
    }

    private drawSeparation(start: number, height: number): void {
        this.rulerGraphics_.lineStyle(this.lineWidth, Colors.BLACK);
        this.rulerGraphics_.moveTo(start, 3);
        this.rulerGraphics_.lineTo(start, height);

        let time = new PIXI.Text(this.formatTime(visibleWindow.min + start * timePerPixel), STYLE);
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
