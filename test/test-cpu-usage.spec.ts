/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../src/common/model/trace';
import { TraceModelProvider } from './../src/common/protocol/trace-model-provider';
import { CpuUsageModelProvider } from './../src/common/protocol/xy/cpu-usage-model-provider';
import { XYRequestFilter } from './../src/common/filter/xy-request-filter';
import { BaseRequestFilter } from '../src/common/filter/base-request-filter';
import { Utils } from '../src/common/utils';

describe('CPU Usage model provider', () => {

    let serverUrl = 'http://localhost:8080/tracecompass';
    let trace: Trace;

    before(async () => {
        let traceModelProvider = new TraceModelProvider(serverUrl);
        let name = 'many-threads';
        let path = `/home/yonni/Documents/traces/ctf/src/main/resources/${name}`;
        trace = await traceModelProvider.putTrace(name, path);
    });

    it('queries 1000 times the disk io activity endpoint', async () => {
        let times = new Array();
        let modelProvider = new CpuUsageModelProvider(serverUrl, trace);

        let baseFilter: BaseRequestFilter = {
            start: trace.start,
            end: trace.end,
            count: 100
        };

        let filter: XYRequestFilter = {
            start: trace.start,
            end: trace.end,
            count: 100,
            ids: new Array()
        };

        for (let i = 0; i < 20; ++i) {
            await modelProvider.fetchEntries(baseFilter);
            let start = performance.now();
            await modelProvider.fetchData(filter);
            let stop = performance.now();
            times.push(stop - start);
            console.log(times[i]);
            await Utils.wait(100);
        }

        let sum = times.reduce((previous, current) => current += previous);
        let avg = sum / times.length;
        console.log("Average time : " + avg + " ms.");
        console.log("Min : " + Math.min.apply(null, times) + " ms.");
        console.log("Max : " + Math.max.apply(null, times) + " ms.");
    });
});

