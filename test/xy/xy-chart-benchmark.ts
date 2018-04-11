/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { XYLineChart } from './../../src/common/xy/xy-line-chart';
import { PerformanceMeter } from './../performance-meter';
import { XYSeries } from '../../src/common/core/model/xy-model';
import { IXYChart } from '../../src/common/base/xy-chart';

export abstract class XYChartBenchmark {

    protected getXYChart(element: HTMLElement): IXYChart {
        return new XYLineChart(element);
    }

    public async testManyThreads() {
        let chart = this.getXYChart(document.createElement('div'));

        await this.executeBenchmark(chart, this.generateSeries(1, 10), 10);
        await this.executeBenchmark(chart, this.generateSeries(1, 100), 100);
        await this.executeBenchmark(chart, this.generateSeries(1, 1000), 1000);
        await this.executeBenchmark(chart, this.generateSeries(1, 10000), 10000);
    }

    protected async executeBenchmark(chart: IXYChart, series: XYSeries[], repetition: number) {
        let pm = new PerformanceMeter(`XY CHART for ${series.length} series`);
        for (let i = 0; i < repetition; ++i) {
            pm.start();
            chart.redraw(series);
            pm.stop();
        }
        pm.commit();
    }

    protected generateSeries(nbSeries: number, nbPoints: number) {
        let series = new Array<XYSeries>();

        for (let i = 0; i < nbSeries; ++i) {
            let x = new Array();
            let y = new Array();
            for (let j = 0; j < nbPoints; ++j) {
                x.push(x);
                y.push(Math.floor((Math.random() * 100)));
            }
            let s = {
                name: `Series-${i}`,
                x: x,
                y: y
            } as XYSeries;
        }
        return series;
    }
}
