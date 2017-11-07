import { Colors } from './../ui/colors';
import { ITimelineModelProvider } from './../protocol/timeline-model-provider';
import { TimelineController } from './timeline-controller';
import { TimelineChart } from './timeline-chart';
import { TimelineRuler } from './timeline-ruler';

export class TimelineView {

    private application: PIXI.Application;
    private timelineController: TimelineController;
    private timelineRuler: TimelineRuler;
    private timelineChart: TimelineChart;

    constructor(id: string, modelProvider: ITimelineModelProvider) {
        let canvas = <HTMLCanvasElement> document.getElementById(id);
        let options = {
            width: canvas.width,
            height: canvas.height,
            view: canvas,
            antialias: false,
            backgroundColor : Colors.WHITE
        };

        this.application = new PIXI.Application(options);

        this.timelineController = new TimelineController(canvas.width, modelProvider);
        this.timelineChart = new TimelineChart();
        this.timelineRuler = new TimelineRuler(0, 0, canvas.width, canvas.height);

        window.addEventListener('visiblewindowchanged', this.visibleWindowChanged.bind(this));

        this.application.stage.addChild(this.timelineRuler.rulerContainer_);
        this.application.stage.addChild(this.timelineChart.graphicsContainer);
    }

    public inflate(): void {
        this.timelineController.inflate();
    }

    private visibleWindowChanged(e: Event): void {
        this.timelineChart.model = this.timelineController.viewModel;
        this.timelineChart.draw();

        this.timelineRuler.context = this.timelineController.viewModel.context;
        this.timelineRuler.draw();
    }
}
