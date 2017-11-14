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

        let data = new Array();
        for (let series of this.viewModel_.series) {
            data = series.x.map((value, index) => {
                return {
                    x: value,
                    y: series.y[index]
                }
            });
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
