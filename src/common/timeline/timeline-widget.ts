import { colors } from './../ui/colors';
import { eventType } from './../events';
import { ITimelineModelProvider } from './../protocol/timeline-model-provider';
import { TimelineController } from './timeline-controller';
import { TimelineChart } from './timeline-chart';
import { TimelineRuler } from './timeline-ruler';

export class TimelineWidget {

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
            backgroundColor : 0x222222
        };

        this.application = new PIXI.Application(options);

        this.timelineController = new TimelineController(canvas.width, modelProvider);
        this.timelineChart = new TimelineChart();
        this.timelineRuler = new TimelineRuler(0, 0, canvas.width, canvas.height);

        window.addEventListener(eventType.TIMEGRAPH_CHANGED, this.viewModelChanged.bind(this));

        this.application.stage.addChild(this.timelineRuler.rulerContainer_);
        this.application.stage.addChild(this.timelineChart.graphicsContainer);
    }

    public inflate() {
        this.timelineController.inflate();
    }

    private viewModelChanged(e: Event) {
        if (this.timelineController.viewModel !== undefined) {
            this.timelineChart.model = this.timelineController.viewModel;
            this.timelineChart.draw();

            this.timelineRuler.context = this.timelineController.viewModel.context;
            this.timelineRuler.draw();
        }
    }
}
