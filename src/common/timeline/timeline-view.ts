import { Colors } from './../ui/colors';
import { TimelineController } from './timeline-controller';
import { TimelineRuler } from './timeline-ruler';

export class TimelineView {

    private application: PIXI.Application;
    private graphicsContainer: PIXI.Container;
    private eventGraphics: Array<PIXI.Graphics>;
    private timelineController: TimelineController;
    private timelineRuler: TimelineRuler;

    constructor() {
        let canvas = <HTMLCanvasElement> document.getElementById('control-flow');
        let options = {
            width: canvas.width,
            height: canvas.height,
            view: canvas,
            antialias: false,
            backgroundColor : Colors.WHITE
        };

        this.application = new PIXI.Application(options);
        this.initGraphicsContainer();

        window.addEventListener('ontimelinechange', this.timelineChanged);

        this.timelineController = new TimelineController();
        this.timelineRuler = new TimelineRuler(0, 0, 0);
    }

    private initGraphicsContainer(): void {
        this.graphicsContainer = new PIXI.Container();
        this.graphicsContainer.interactive = true;
        app.stage.addChild(this.graphicsContainer);
    }

    private timelineChanged(e: Event): void {
        console.log("Changed");
    }

    public clear(): void {
        this.eventGraphics.forEach((e: PIXI.Graphics) => e.clear());
    }
}
