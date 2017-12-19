/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TimeFormatter } from './../formatter/time-formatter';
import { IChart } from './../base/chart';
import { colorPalette } from './../ui/colors';
import { XYViewModel } from './xy-viewmodel';
import { eventType } from './../events';

// Type definitions are not working for ChartJS
declare var Chart: any;

export class XYLineChart implements IChart {

    private ctx_: CanvasRenderingContext2D;
    private chart_: any;
    private viewModel_: XYViewModel;

    private overlayContext_: CanvasRenderingContext2D;
    private startIndex: any;
    private drag: boolean;
    private selectionRect = {
        w: 0,
        startX: 0,
        startY: 0
    };

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx_ = ctx;
        this.initChart();
        this.initSelectionControls();
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

    /* Idea taken from
     *    https://stackoverflow.com/questions/42855738/how-do-i-selecting-a-date-range-like-onclick-but-drag-select
     **/
    private initSelectionControls() {
        let canvas = <HTMLCanvasElement> document.getElementById(`${this.ctx_.canvas.id}-overlay`);
        canvas.width = this.ctx_.canvas.width;
        canvas.height = this.ctx_.canvas.height;
        this.overlayContext_ = canvas.getContext('2d');

        this.ctx_.canvas.addEventListener('pointerdown', this.pointerDown.bind(this));
        this.ctx_.canvas.addEventListener('pointermove', this.pointerMove.bind(this));
        this.ctx_.canvas.addEventListener('pointerup', this.pointerUp.bind(this));
    }

    private pointerDown(e: MouseEvent) {
        const points = this.chart_.getElementsAtEventForMode(e, 'index', {
            intersect: false
        });
        this.startIndex = points[0];
        const rect = this.ctx_.canvas.getBoundingClientRect();
        this.selectionRect.startX = e.clientX - rect.left;
        this.selectionRect.startY = this.chart_.chartArea.top;
        this.drag = true;
    }

    private pointerMove(e: MouseEvent) {
        const rect = this.ctx_.canvas.getBoundingClientRect();
        if (this.drag) {
            this.selectionRect.w = (e.clientX - rect.left) - this.selectionRect.startX;
            this.overlayContext_.globalAlpha = 0.25;
            this.overlayContext_.clearRect(0, 0, this.ctx_.canvas.width, this.ctx_.canvas.height);
            this.overlayContext_.fillRect(this.selectionRect.startX,
            this.selectionRect.startY,
            this.selectionRect.w,
            this.chart_.chartArea.bottom - this.chart_.chartArea.top);
        } else {
            this.overlayContext_.clearRect(0, 0, this.ctx_.canvas.width, this.ctx_.canvas.height);
            let x = e.clientX - rect.left;
            if (x > this.chart_.chartArea.left) {
                this.overlayContext_.fillRect(x,
                    this.chart_.chartArea.top,
                    1,
                    this.chart_.chartArea.bottom - this.chart_.chartArea.top);
            }
        }
    }

    private pointerUp(e: MouseEvent) {
        const points = this.chart_.getElementsAtEventForMode(e, 'index', {
            intersect: false
        });
        this.drag = false;
        let start = this.chart_.data.datasets[this.startIndex._datasetIndex].data[this.startIndex._index];
        let end = this.chart_.data.datasets[points[0]._datasetIndex].data[points[0]._index];

        window.dispatchEvent(new CustomEvent(eventType.RANGE_SELECTED, {
            detail: {
                start: start,
                end: end
            }
        }));
    }
}
