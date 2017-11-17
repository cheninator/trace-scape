import { IChart } from './../base/IChart';
import { colorPalette } from './../ui/colors';
import { XYViewModel } from './xy-viewmodel';
import { TimeFormatter } from './../formatter/time-formatter';

// Type definitions are not working for ChartJS
declare var Chart: any;

export class XYLineChart implements IChart {

    private ctx_: CanvasRenderingContext2D;
    private chart_: any;
    private viewModel_: XYViewModel;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx_ = ctx;
        this.initChart();
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
                    };
                }),
                fill: false,
                borderColor: colorPalette[datasets.length % colorPalette.length],
                borderWidth: 1
            });
        }
        this.chart_.data.datasets = datasets;
        this.chart_.update();
    }

    public clear() {
        if (this.chart_ !== undefined) {
            this.chart_.clear();
        }
    }

    private initChart() {
        this.chart_ = new Chart(this.ctx_, {
            type: 'scatter',
            data: {
                datasets: new Array()
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
                    point: { radius: 0 },
                    line: { tension: 0 }
                },
                animation: {
                    duration: 0, // general animation time
                },
                hover: {
                    animationDuration: 0, // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 0, // animation duration after a resize
            }
        });
    }
}
