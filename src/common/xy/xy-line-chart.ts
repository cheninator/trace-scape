/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as Highcharts from 'highcharts';

import { TimeFormatter } from './../formatter/time-formatter';
import { IChart } from './../base/chart';
import { XYViewModel } from './xy-viewmodel';
import { eventType } from './../events';

export class XYLineChart implements IChart {

    private readonly DEFAULT_TITLE = "XY line chart";
    private readonly DEFAULT_LOADING_MESSAGE = "Loading data...";

    private htmlElement_: HTMLElement;
    private chart_: Highcharts.ChartObject;
    private viewModel_: XYViewModel;

    constructor(htmlElement: HTMLElement) {
        this.htmlElement_ = htmlElement;
        this.initChart();
    }

    set viewModel(viewmodel: XYViewModel) {
        if (viewmodel !== undefined) {
            this.viewModel_ = viewmodel;
            this.chart_.setTitle({text: this.viewModel.title});
        }
    }

    public draw() {
        this.clear();
        this.chart_.showLoading(this.DEFAULT_LOADING_MESSAGE);
        for (let series of this.viewModel_.series) {
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

    public clear() {
        this.chart_.series = [];
    }

    private initChart() {
        this.chart_ = Highcharts.chart(this.htmlElement_, {
            title: {
                text: this.DEFAULT_TITLE
            },
            xAxis: {
                labels: {
                    formatter: function() {
                        return TimeFormatter.fromNanos(this.value);
                    }
                }
            },
            yAxis: {
                title: {
                    text: ""
                }
            }
        });
    }
}
