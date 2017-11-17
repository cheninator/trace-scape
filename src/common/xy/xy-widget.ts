import { XYLineChart } from './xy-line-chart';
import { IXYModelProvider } from './../protocol/xy-model-provider';
import { XYController } from './xy-controller';
import { eventType } from './../events';

export class XYWidget {

    private chart_: XYLineChart;
    private controller_: XYController;

    constructor(id: string, modelProvider: IXYModelProvider) {
        let canvas = <HTMLCanvasElement> document.getElementById(id);

        this.chart_ = new XYLineChart(canvas.getContext('2d'));
        this.controller_ = new XYController(canvas.width, modelProvider);

        window.addEventListener(eventType.VIEW_MODEL_CHANGED, this.viewModelChanged.bind(this));
    }

    public inflate() {
        this.controller_.inflate();
    }

    private viewModelChanged(e: Event) {
        this.chart_.viewModel = this.controller_.viewModel;
        this.chart_.draw();
    }
}
