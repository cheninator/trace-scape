import { IChart } from './../base/IChart';
import { XYViewModel } from './xy-viewmodel';

export class XYLineChart implements IChart {

    private ctx_: CanvasRenderingContext2D;
    private chart_: LinearInstance;
    private viewModel_: XYViewModel;

    constructor(id: string) {
        let element = <HTMLCanvasElement> document.getElementById(id);
        this.ctx_ = element.getContext('2d');
    }

    set viewModel(viewmodel: XYViewModel) {
        if (viewmodel !== undefined) {
            this.viewModel_ = viewmodel;
        }
    }

    public draw() {
        this.clear();

        let lineData: LinearChartData = {
            labels: new Array(),
            datasets: new Array()
        };

        for (let series of this.viewModel_.series) {
            let dataset: ChartDataSet = {
                label: series.name,
                fillColor: 'rgba(220,220,220,0.2)',
                strokeColor: 'rgba(220,220,220,1)',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                borderColor: "#9b0391",
                data: series.y
            };

            lineData.labels = series.x.map(String);
            lineData.datasets.push(dataset);
        }

        this.chart_ = new Chart(this.ctx_).Line(lineData);
    }

    public clear() {
        this.chart_.clear();
        this.chart_.removeData();
        this.chart_.destroy();
    }
}
