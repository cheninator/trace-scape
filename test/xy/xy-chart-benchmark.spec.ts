/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { suite, test, timeout } from 'mocha-typescript';
import { XYLineChart } from './../../src/common/xy/xy-line-chart';
import { PerformanceMeter } from './../performance-meter';
import { XYSeries } from '../../src/common/core/model/xy-model';
import { IXYChart } from '../../src/common/base/xy-chart';

@suite("XY chart benchmark")
export class XYChartBenchmark {

    protected getXYChart(element: HTMLElement): IXYChart {
        return new XYLineChart(element);
    }

    @test("Fixed number of series, number of points per series increasing", timeout(5000000))
    public testNumberOfPoints() {
        this.executeBenchmark(1, 10, 10);
        this.executeBenchmark(1, 100, 10);
        this.executeBenchmark(1, 500, 10);
        this.executeBenchmark(1, 1000, 10);
        this.executeBenchmark(1, 5000, 10);
        this.executeBenchmark(1, 10000, 10);
    }

    @test("Number of series increasing, fixed number of points per series", timeout(5000000))
    public testNumberOfSeries() {
        this.executeBenchmark(1, 100, 10);
        this.executeBenchmark(5, 100, 10);
        this.executeBenchmark(10, 100, 10);
        this.executeBenchmark(50, 100, 10);
        this.executeBenchmark(100, 100, 10);
    }

    protected executeBenchmark(nbSeries: number, nbPoints: number, repetition: number) {
        let chart = this.getXYChart(document.createElement('div'));
        let pm = new PerformanceMeter(`XY CHART for ${nbSeries} series with ${nbPoints} points`);
        for (let i = 0; i < repetition; ++i) {
            let series = this.generateSeries(nbSeries, nbPoints);
            pm.start();
            chart.redraw(series);
            pm.stop();
        }
        pm.commit();
    }

    protected generateSeries(nbSeries: number, nbPoints: number) {
        let series = new Array<XYSeries>();

        for (let i = 0; i < nbSeries; ++i) {
            let x = Array.apply(null, {length: nbPoints}).map(Number.call, Number);
            let y = Array.apply(null, {length: nbPoints}).map(Function.call, Math.random);
            series.push({
                name: `Series-${i}`,
                x: x,
                y: y
            });
        }
        return series;
    }
}
