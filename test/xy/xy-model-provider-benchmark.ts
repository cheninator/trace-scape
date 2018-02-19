/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../../src/common/model/trace';
import { TraceModelProvider, ITraceModelProvider } from './../../src/common/protocol/trace-model-provider';
import { SelectionTimeQueryFilter } from './../../src/common/filter/selection-time-query-filter';
import { IXYModelProvider } from './../../src/common/protocol/xy-model-provider';
import { TimeQueryFilter } from './../../src/common/filter/time-query-filter';
import { ModelResponse } from './../../src/common/protocol/model-response';
import { ITreeModel } from './../../src/common/model/tree-model';
import { PerformanceMeter } from './../performance-meter';

export abstract class XYModelProviderBenchmark {

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

    protected async executeBenchmark(trace: Trace, repetition: number, numberOfPoints: number) {
        /* Entries benchmark */
        let entriesResponse = await this.executeFetchEntriesBenchmark(trace, repetition, numberOfPoints);

        /* XY benchmark. We query for all series */
        //let ids = entriesResponse.model.map(x => x.id);
        await this.executeFetchXYBenchmark(trace, repetition, numberOfPoints, new Array());
    }

    private async executeFetchEntriesBenchmark(trace: Trace, repetition: number, numberOfPoints: number)
                    : Promise<ModelResponse<ITreeModel[]>> {
        let filter = this.getQueryFilter(trace, numberOfPoints, new Array());
        let modelProvider = this.getModelProvider(trace);

        let pm = new PerformanceMeter(`ENTRIES BENCHMARK (${numberOfPoints} points)`);
        let entriesResponse: ModelResponse<ITreeModel[]>;
        for (let i = 0; i < repetition; ++i) {
            pm.start();
            entriesResponse = await modelProvider.fetchTree(filter);
            pm.stop();
        }
        pm.commit();
        return entriesResponse;
    }

    private async executeFetchXYBenchmark(trace: Trace, repetition: number, numberOfPoints: number, ids: number[]) {
        let filter = this.getQueryFilter(trace, numberOfPoints, ids);
        let modelProvider = this.getModelProvider(trace);

        let pm = new PerformanceMeter(`XY BENCHMARK (${numberOfPoints} points)`);
        for (let i = 0; i < repetition; ++i) {
            pm.start();
            await modelProvider.fetchXY(filter);
            pm.stop();
        }
        pm.commit();
    }
}
