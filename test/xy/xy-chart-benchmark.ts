/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../../src/common/core/model/trace';
import { TraceModelProvider, ITraceModelProvider } from './../../src/common/core/protocol/trace-model-provider';
import { SelectionTimeQueryFilter } from './../../src/common/core/filter/selection-time-query-filter';
import { IXYModelProvider } from './../../src/common/core/protocol/xy-model-provider';
import { TimeQueryFilter } from './../../src/common/core/filter/time-query-filter';
import { ModelResponse } from './../../src/common/core/protocol/model-response';
import { XYLineChart } from './../../src/common/xy/xy-line-chart';
import { PerformanceMeter } from './../performance-meter';
import { XYSeries } from '../../src/common/core/model/xy-model';
import { IXYChart } from '../../src/common/base/xy-chart';
import { TraceManager } from './../../src/common/core/trace-manager';

export abstract class XYChartBenchmark {

    protected readonly serverUrl = 'http://localhost:8080/tracecompass';

    protected abstract getModelProvider(trace: Trace): IXYModelProvider;

    protected getXYChart(element: HTMLElement): IXYChart {
        return new XYLineChart(element);
    }

    protected getTraceModelProvider(): ITraceModelProvider {
        return new TraceModelProvider(this.serverUrl);
    }

    protected async testManyThreads() {
        let traceManager = TraceManager.getInstance();
        let name = 'many-threads';
        let path = `/home/yonni/Documents/traces/${name}`;
        let trace = await traceManager.openTrace(name, path);

        let chart = this.getXYChart(document.createElement('div'));
        let modelProvider = this.getModelProvider(trace);
        let tree = await modelProvider.fetchTree(this.getQueryFilter(trace, 100, new Array()));
        let ids = tree.model.map(x => x.id);
        let response = await modelProvider.fetchXY(this.getQueryFilter(trace, 100, ids));

        await this.executeBenchmark(chart, response.model, 10);
        await this.executeBenchmark(chart, response.model, 100);
        await this.executeBenchmark(chart, response.model, 1000);
        await this.executeBenchmark(chart, response.model, 10000);
    }

    protected getQueryFilter(trace: Trace, numberOfPoints: number, ids: number[]): TimeQueryFilter {
        return <SelectionTimeQueryFilter> {
            start: trace.start,
            end: trace.end,
            count: numberOfPoints,
            items: ids
        };
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
}
