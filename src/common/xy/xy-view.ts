import { XYLineChart } from './xy-line-chart';
import { IXYModelProvider, DiskModelProvider } from './../protocol/xy-model-provider';

export class XYView {

    private chart_: XYLineChart;
    private modelProvider_: IXYModelProvider;

    constructor(id: string) {
        this.chart_ = new XYLineChart(id);
        this.modelProvider_ = new DiskModelProvider();
    }

    public inflate(): void {

    }
}
