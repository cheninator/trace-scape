import { XYLineChart } from './xy-line-chart';
import { IXYModelProvider } from './../protocol/xy-model-provider';
import { XYController } from './xy-controller';
import { eventType } from './../events';

export class XYWidget {

    private chart_: XYLineChart;
    private controller_: XYController;

    constructor(id: string, modelProvider: IXYModelProvider) {
        this.chart_ = new XYLineChart(id);
        this.controller_ = new XYController(modelProvider);

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
