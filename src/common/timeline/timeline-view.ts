import { Colors } from './../ui/colors';
import { TimelineController } from './timeline-controller';
import { TimelineChart } from './timeline-chart';
import { TimelineRuler } from './timeline-ruler';

export class TimelineView {

    private application: PIXI.Application;
    private timelineController: TimelineController;
    private timelineRuler: TimelineRuler;
    private timelineChart: TimelineChart;

    constructor(id: string) {
        let canvas = <HTMLCanvasElement> document.getElementById(id);
        let options = {
            width: canvas.width,
            height: canvas.height,
            view: canvas,
            antialias: false,
            backgroundColor : Colors.WHITE
        };

        this.application = new PIXI.Application(options);
        
        this.timelineController = new TimelineController(canvas.width);
        this.timelineChart = new TimelineChart();
        this.timelineRuler = new TimelineRuler(0, 0, 0);

        window.addEventListener('visiblewindowchanged', this.visibleWindowChanged);
    }

    private visibleWindowChanged(e: Event): void {
        this.timelineChart.model = this.timelineController.viewModel;
    }
}
