import { IChart } from './../base/IChart';
import { XYViewModel } from './xy-viewmodel';
import { TimeFormatter } from './../formatter/time-formatter';

// Type definitions are not working for ChartJS
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

        let datasets = new Array();
        for (let series of this.viewModel_.series) {
            datasets.push({
                label: series.name,
                data: series.x.map((value, index) => {
                    return {
                        x: value,
                        y: series.y[index]
                    }
                }),
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 1
            });
        }

        this.chart_ = new Chart(this.ctx_, {
            type: 'scatter',
            data: {
                datasets: datasets
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom',
                        ticks: {
                            callback: (value: any, index: any, values: any) => {
                                return TimeFormatter.fromNanos(value);
                            }
                        }
                    }]
                },
                elements: {
                    point: { radius: 0 }
                }
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
