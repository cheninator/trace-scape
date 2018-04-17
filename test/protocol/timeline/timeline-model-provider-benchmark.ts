/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ITimelineModelProvider } from '../../../src/common/core/protocol/timeline-model-provider';
import { SelectionTimeQueryFilter } from './../../../src/common/core/filter/selection-time-query-filter';
import { TimeQueryFilter } from './../../../src/common/core/filter/time-query-filter';
import { Trace } from './../../../src/common/core/model/trace';
import { ITreeModel } from './../../../src/common/core/model/tree-model';
import { ModelResponse } from './../../../src/common/core/protocol/model-response';
import { PerformanceMeter } from './../../performance-meter';
import { TraceManager } from './../../../src/common/core/trace-manager';

export abstract class TimelineModelProviderBenchmark {

    protected readonly serverUrl = 'http://localhost:8080/tracecompass';

    protected abstract getModelProvider(trace: Trace): ITimelineModelProvider;

    protected async testManyThreads() {

        let traceName = 'many-threads';
        let tracePath = `/home/yonni/Documents/traces/${traceName}`;

        let trace = await TraceManager.getInstance().openTrace(traceName, tracePath);

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
        let ids = entriesResponse.model.map(x => x.id);
        await this.executeFetchEventsBenchmark(trace, repetition, numberOfPoints, ids);
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

    private async executeFetchEventsBenchmark(trace: Trace, repetition: number, numberOfPoints: number, ids: number[]) {
        let filter = <SelectionTimeQueryFilter> this.getQueryFilter(trace, numberOfPoints, ids);
        let modelProvider = this.getModelProvider(trace);

        let pm = new PerformanceMeter(`EVENTS BENCHMARK (${numberOfPoints} points)`);
        for (let i = 0; i < repetition; ++i) {
            pm.start();
            await modelProvider.fetchEvents(filter);
            pm.stop();
        }
        pm.commit();
    }
}
