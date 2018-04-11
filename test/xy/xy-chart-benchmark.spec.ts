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
import { Results } from './../results';

@suite("XY chart benchmark")
export class XYChartBenchmark {

    private readonly DEFAULT_REPETITION = 10;

    protected getXYChart(element: HTMLElement): IXYChart {
        return new XYLineChart(element);
    }

    @test("Fixed number of series, number of points per series increasing", timeout(5000000))
    public testNumberOfPoints() {
        Results.createChart("1", "Fixed number of series, number of points per series increasing");

        const numberOfPoints = [10, 100, 500, 1000, 5000, 10000];
        const numberOfSeries = 1;
        let results = new Array();

        for (let n of numberOfPoints) {
            results.push(this.executeBenchmark(numberOfSeries, n, this.DEFAULT_REPETITION));
        }
        Results.addSeries("1", {
            name: "Rendering time according to the number of points",
            x: numberOfPoints,
            y: results
        });
    }

    @test("Number of series increasing, fixed number of points per series", timeout(5000000))
    public testNumberOfSeries() {
        Results.createChart("2", "Number of series increasing, fixed number of points per series");

        const numberOfSeries = [1, 5, 10, 50, 100];
        const numberOfPoints = 100;
        let results = new Array();

        for (let n of numberOfSeries) {
            results.push(this.executeBenchmark(n, numberOfPoints, this.DEFAULT_REPETITION));
        }

        Results.addSeries("2", {
            name: "Rendering time according to the number of points",
            x: numberOfSeries,
            y: results
        });
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
        return pm.average;
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
