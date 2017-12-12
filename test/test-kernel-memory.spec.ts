/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../src/common/model/trace';
import { TraceModelProvider } from './../src/common/protocol/trace-model-provider';
import { KernelMemoryModelProvider } from './../src/common/protocol/xy/kernel-memory-model-provider';
import { XYRequestFilter } from './../src/common/filter/xy-request-filter';
import { BaseRequestFilter } from '../src/common/filter/base-request-filter';
import { Utils } from '../src/common/utils';

describe('Kernel memory usage model provider', () => {

    let serverUrl = 'http://localhost:8080/tracecompass';
    let trace: Trace;

    before(async () => {
        let traceModelProvider = new TraceModelProvider(serverUrl);
        let name = 'kernel_vm';
        let path = `/home/yonni/Documents/traces/ctf/src/main/resources/${name}`;
        trace = await traceModelProvider.putTrace(name, path);
    });

    it('queries 1000 xy points to the kernel memory usage endpoint from trace start to trace end', async (done) => {

        let baseFilter: BaseRequestFilter = {
            start: trace.start,
            end: trace.end,
            count: 10000
        };

        let filter: XYRequestFilter = {
            start: trace.start,
            end: trace.end,
            count: 10000,
            ids: new Array()
        };

        let times = new Array();
        let modelProvider = new KernelMemoryModelProvider(serverUrl, trace);
        for (let i = 0; i < 10; ++i) {
            await modelProvider.fetchEntries(baseFilter);
            let start = performance.now();
            await modelProvider.fetchData(filter);
            let stop = performance.now();
            times.push(stop - start);
            console.log(times[i]);
        }

        let sum = times.reduce((previous, current) => current += previous);
        let avg = sum / times.length;
        console.log("Average time : " + avg + " ms.");
        console.log("Min : " + Math.min.apply(null, times) + " ms.");
        console.log("Max : " + Math.max.apply(null, times) + " ms.");
        done();
    });

    after(async () => {
        // TODO : Clean ressources
        await Utils.wait(100);
    });
});
