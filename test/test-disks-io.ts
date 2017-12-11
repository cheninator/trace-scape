/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../src/common/model/trace';
import { TraceModelProvider } from './../src/common/protocol/trace-model-provider';
import { DiskModelProvider } from './../src/common/protocol/xy/disks-io-model-provider';
import { XYRequestFilter } from './../src/common/filter/xy-request-filter';

describe('Disks IO activity model provider', () => {

    let serverUrl = 'http://localhost:8080/tracecompass';
    let trace: Trace;

    before(async (done) => {
        let traceModelProvider = new TraceModelProvider(serverUrl);
        let name = 'semi_huge';
        let path = `/home/yonni/Documents/traces/ctf/src/main/resources/${name}`;
        trace = await traceModelProvider.putTrace(name, path);
        console.log(trace);
        done();
    });

    it('queries 1000 times the disk io activity endpoint', async (done) => {
        let times = new Array();
        let modelProvider = new DiskModelProvider(serverUrl, trace);
        for (let i = 0; i < 1000; ++i) {
            let start = performance.now();
            modelProvider.fetchData(<XYRequestFilter> {
                start: trace.start,
                end: trace.end,
                count: 1000,
                ids: new Array()
            });
            let stop = performance.now();
            times.push(stop - start);
            console.log(times[i]);
        }
        done();
    });
});
