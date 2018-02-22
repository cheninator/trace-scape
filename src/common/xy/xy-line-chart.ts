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
import * as Highcharts from 'highcharts';

export class XYLineChart implements IChart {

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
        }
    }

    public draw() {
        this.clear();
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
    }

    public clear() {
        if (this.chart_ !== undefined) {
            this.chart_.series = [];
        }
    }

    private initChart() {
        this.chart_ = Highcharts.chart(this.htmlElement_, {
            title: {
                text: 'This is a test'
            }
        });
    }
}
