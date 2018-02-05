/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../src/common/model/trace';
import { PerformanceMeter } from './performance-meter';
import { IXYModelProvider } from '../src/common/protocol/xy-model-provider';
import { BaseRequestFilter } from './../src/common/filter/base-request-filter';
import { XYRequestFilter } from './../src/common/filter/xy-request-filter';
import { ModelResponse } from './../src/common/protocol/model-response';
import { XYEntries } from './../src/common/xy/xy-viewmodel';

export abstract class ModelProviderBenchmark {

    protected abstract getModelProvider(trace: Trace): IXYModelProvider

    protected getQueryFilter(trace: Trace, numberOfPoints: number, ids: number[]): BaseRequestFilter {
        return <XYRequestFilter> {
            start: trace.start,
            end: trace.end,
            count: numberOfPoints,
            ids: ids
        };
    }

    protected async executeBenchmark(trace: Trace, repetition: number, numberOfPoints: number) {
        /* Entries benchmark */
        let entriesResponse = await this.executeFetchEntriesBenchmark(trace, repetition, numberOfPoints);

        /* XY benchmark. We query for all series */
        let ids = entriesResponse.model.map(x => x.id);
        await this.executeFetchXYBenchmark(trace, repetition, numberOfPoints, ids);
    }

    protected async executeFetchEntriesBenchmark(trace: Trace, repetition: number, numberOfPoints: number): Promise<ModelResponse<XYEntries[]>> {
        let filter = this.getQueryFilter(trace, numberOfPoints, new Array());
        let modelProvider = this.getModelProvider(trace);

        let pm = new PerformanceMeter(`ENTRIES BENCHMARK (${numberOfPoints} points)`);
        let entriesResponse: ModelResponse<XYEntries[]>;
        for (let i = 0; i < repetition; ++i) {
            pm.start();
            entriesResponse = await modelProvider.fetchEntries(filter);
            pm.stop();
        }
        pm.commit();
        return entriesResponse;
    }

    protected async executeFetchXYBenchmark(trace: Trace, repetition: number, numberOfPoints: number, ids: number[]) {
        let filter = this.getQueryFilter(trace, numberOfPoints, ids);
        let modelProvider = this.getModelProvider(trace);
        
        let pm = new PerformanceMeter(`XY BENCHMARK (${numberOfPoints} points)`);
        for (let i = 0; i < repetition; ++i) {
            pm.start();
            await modelProvider.fetchData(filter);
            pm.stop();
        }
        pm.commit();
    }
}
