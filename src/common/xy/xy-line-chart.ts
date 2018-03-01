/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as Highcharts from 'highcharts';

import { TimeFormatter } from './../core/formatter/time-formatter';
import { XYSeries } from './../core/model/xy-model';
import { IXYChart } from './../base/xy-chart';
import { EventType } from './../base/events';

export class XYLineChart implements IXYChart {

    private readonly DEFAULT_TITLE = "XY line chart";
    private readonly DEFAULT_LOADING_MESSAGE = "Loading data...";

    private htmlElement_: HTMLElement;
    private chart_: Highcharts.ChartObject;
    private title_: string;

    constructor(htmlElement: HTMLElement) {
        this.htmlElement_ = htmlElement;
        this.initChart();
    }

    set title(title: string) {
        this.title_ = title;
    }

    public draw(xySeries: XYSeries[]) {
        this.chart_.showLoading(this.DEFAULT_LOADING_MESSAGE);
        for (let series of xySeries) {
            let data = new Array();
            for (let i = 0; i < series.x.length; ++i) {
                data.push([series.x[i], series.y[i]]);
            }
            this.chart_.addSeries(<Highcharts.IndividualSeriesOptions>{
                name: series.name,
                data: data
            });
        }
        this.chart_.redraw();
        this.chart_.hideLoading();
    }

    public redraw(series: XYSeries[]) {
        this.clear();
        this.draw(series);
    }

    public clear() {
        for (let i = 0; i < this.chart_.series.length; i++) {
            this.chart_.series[0].remove();
        }
    }

    private rangeSelected(e: Highcharts.ChartSelectionEvent) {
        e.preventDefault();

        window.dispatchEvent(new CustomEvent(EventType.RANGE_SELECTED, {
            detail: {
                start: e.xAxis[0].min,
                end: e.xAxis[0].max
            }
        }));
    }

    private initChart() {
        let infos = this.htmlElement_.getBoundingClientRect();
        this.chart_ = Highcharts.chart(this.htmlElement_, {
            chart: {
                zoomType: 'x',
                events: {
                    selection: this.rangeSelected
                },
                width: infos.width,
                height: infos.height
            },
            title: {
                text: this.DEFAULT_TITLE
            },
            credits: {
                enabled: false
            },
            xAxis: {
                labels: {
                    formatter: function() {
                        return TimeFormatter.fromNanos(this.value);
                    }
                },
            },
            yAxis: {
                title: {
                    text: ""
                }
            }
        });
    }
}
