/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
import { TraceModelProvider } from './protocol/trace-model-provider';
//import { GRPCTraceModelProvider } from './protocol/grpc-trace-model-provider';
import { LayoutManager } from './layout-manager';
import { CpuUsageComponent } from './ui/cpu-usage-component';
import { DiskIOComponent } from './ui/disk-io-component';
import { KernelMemoryComponent } from './ui/kernel-memory-component';
import { ThreadStatusComponent } from './ui/thread-status-component';
import { Trace } from './model/trace';

import { ProtoCpuUsageModelProvider } from './protocol/xy/grpc-cpu-usage-model-provider';
import { PerformanceMeter } from './../../test/performance-meter';
import { ModelResponse } from './protocol/model-response';
import { ITreeModel } from './model/tree-model';
import { TimeQueryFilter } from './filter/time-query-filter';
import { SelectionTimeQueryFilter } from './filter/selection-time-query-filter';

async function main() {

    let serverUrl = 'http://localhost:8080/tracecompass';

    let traceModelProvider = new TraceModelProvider(serverUrl);
    let traces = await traceModelProvider.getTraces();
    let trace: Trace;

    if (traces.length === 0) {
        let name = 'kernel_vm';
        let path = `/home/yonni/Documents/traces/${name}`;
        trace = await traceModelProvider.putTrace(name, path);
    } else {
        trace = traces[0];
    }

    let layoutManager = new LayoutManager();
    layoutManager.addComponent(new CpuUsageComponent(serverUrl, trace));
    layoutManager.addComponent(new DiskIOComponent(serverUrl, trace));
    layoutManager.addComponent(new KernelMemoryComponent(serverUrl, trace));
    layoutManager.addComponent(new ThreadStatusComponent(serverUrl, trace));

    layoutManager.init();
}

main();

/*
let serverUrl = 'https://localhost:8443';
let allIds: number[];

async function testing() {
    let traceModelProvider = new GRPCTraceModelProvider(serverUrl);

    let name = 'many-threads';
    let path = `/home/yonni/Documents/traces/${name}`;
    let trace = await traceModelProvider.putTrace(name, path);

    await executeFetchEntriesBenchmark(trace, 10, 10);
    await executeFetchXYBenchmark(trace, 10, 10, new Array());
    await executeFetchXYBenchmark(trace, 10, 100, new Array());
    await executeFetchXYBenchmark(trace, 10, 1000, new Array());
    await executeFetchXYBenchmark(trace, 10, 10000, new Array());
}

async function executeFetchEntriesBenchmark(trace: Trace, repetition: number, numberOfPoints: number): Promise<ModelResponse<ITreeModel[]>> {
    let filter = getQueryFilter(trace, numberOfPoints, new Array());
    let modelProvider = new ProtoCpuUsageModelProvider(serverUrl, trace);

    let pm = new PerformanceMeter(`ENTRIES BENCHMARK (${numberOfPoints} points)`);
    let entriesResponse: ModelResponse<ITreeModel[]>;
    for (let i = 0; i < repetition; ++i) {
        pm.start();
        entriesResponse = await modelProvider.fetchTree(filter);
        pm.stop();
    }
    pm.commit();
    allIds = entriesResponse.model.map(x => x.id);
    return entriesResponse;
}

async function executeFetchXYBenchmark(trace: Trace, repetition: number, numberOfPoints: number, ids: number[]) {
    let filter = getQueryFilter(trace, numberOfPoints, ids);
    let modelProvider = new ProtoCpuUsageModelProvider(serverUrl, trace);

    let pm = new PerformanceMeter(`XY BENCHMARK (${numberOfPoints} points)`);
    for (let i = 0; i < repetition; ++i) {
        pm.start();
        await modelProvider.fetchXY(filter);
        pm.stop();
    }
    pm.commit();
}

function getQueryFilter(trace: Trace, numberOfPoints: number, ids: number[]): TimeQueryFilter {
    return <SelectionTimeQueryFilter> {
        start: trace.start,
        end: trace.end,
        count: numberOfPoints,
        items: ids
    };
}

testing();
*/
