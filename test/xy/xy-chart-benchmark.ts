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

export abstract class XYChartBenchmark {

    protected readonly serverUrl = 'http://localhost:8080/tracecompass';

    protected abstract getModelProvider(trace: Trace): IXYModelProvider;

    protected getTraceModelProvider(): ITraceModelProvider {
        return new TraceModelProvider(this.serverUrl);
    }

    protected async testManyThreads() {

        let traceName = 'many-threads';
        let tracePath = `/home/yonni/Documents/traces/${traceName}`;

        let traceModelProvider = this.getTraceModelProvider();
        let trace = await traceModelProvider.putTrace(traceName, tracePath);
        let div = document.createElement('div');
        let modelProvider = this.getModelProvider(trace);

        await this.executeBenchmark(trace, 10, 10);
        await this.executeBenchmark(trace, 10, 100);
        await this.executeBenchmark(trace, 10, 1000);
        await this.executeBenchmark(trace, 10, 10000);
    }

    protected getQueryFilter(trace: Trace, numberOfPoints: number, ids: number[]): TimeQueryFilter {
        return <SelectionTimeQueryFilter> {
            start: trace.start,
            end: trace.end,
            count: numberOfPoints,
            items: ids
        };
    }

    protected async executeBenchmark(series: XYSeries[], repetition: number) {
        let pm = new PerformanceMeter(`XY CHART`);
        for (let i = 0; i < repetition; ++i) {
            pm.start();
            await modelProvider.fetchXY(filter);
            pm.stop();
        }
        pm.commit();
    }
}
