import { TimelineController } from './timeline-controller';
import { TimelineRuler } from './timeline-ruler';

export class TimelineView {

    private application: PIXI.Application;
    private graphicsContainer: PIXI.Container;
    private eventGraphics: Array<PIXI.Graphics>;
    private timelineController: TimelineController;
    private timelineRuler: TimelineRuler;

    constructor() {
        let canvas = <HTMLCanvasElement> document.getElementById('canvas');
        let options = {
            width: canvas.width,
            height: canvas.height,
            view: canvas,
            antialias: false,
            backgroundColor : 0xffffff
        };

        this.application = new PIXI.Application(options);
        this.initGraphicsContainer();

        window.addEventListener('ontimelinechange', this.timelineChanged);

        this.timelineController = new TimelineController();
        this.timelineRuler = new TimelineRuler();
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
        for (let eventGraphic of this.eventGraphics) {
            eventGraphic.clear();
        }
    }
}
