import { IChart } from './../base/IChart';
import { XYViewModel } from './xy-viewmodel';
declare var Chart: any;

export class XYLineChart implements IChart {

    private ctx_: CanvasRenderingContext2D;
    private chart_: any;
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

        let data = new Array();
        for (let series of this.viewModel_.series) {
            for (let i = 0; i < series.x.length; ++i) {
                data.push({
                    x: series.x[i],
                    y: series.y[i]
                });
            }
        }

        this.chart_ = new Chart(this.ctx_, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: "Test",
                    data: data
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                },
                elements: {
                    point: { radius: 0 }
                },
                borderWidth: 1,
                borderColor: [
                    'rgba(0, 0, 0 , 1)'
                ],
            }
        });
    }

    public clear() {
        if (this.chart_ !== undefined) {
            this.chart_.clear();
            this.chart_.destroy();
        }
    }
}
