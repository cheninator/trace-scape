import { XYLineChart } from './xy-line-chart';
import { IXYModelProvider } from './../protocol/xy-model-provider';

export class XYView {

    private chart_: XYLineChart;
    private modelProvider_: IXYModelProvider;

    constructor(id: string, modelProvider: IXYModelProvider) {
        this.chart_ = new XYLineChart(id);
        this.modelProvider_ = modelProvider;
    }

    public inflate(): void {
        console.log("TODO");
    }
}
