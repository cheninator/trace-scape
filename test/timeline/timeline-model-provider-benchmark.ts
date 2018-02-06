/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../../src/common/model/trace';
import { TraceModelProvider, ITraceModelProvider } from './../../src/common/protocol/trace-model-provider';

export abstract class TimelineModelProviderBenchmark {

    protected readonly serverUrl = 'http://localhost:8080/tracecompass';

    protected async testManyThreads() {

        let traceName = 'many-threads';
        let tracePath = `/home/yonni/Documents/traces/${traceName}`;

        let traceModelProvider = new TraceModelProvider(this.serverUrl);
        let trace = await traceModelProvider.putTrace(traceName, tracePath);

        /*
        await this.executeBenchmark(trace, 10, 10);
        await this.executeBenchmark(trace, 10, 100);
        await this.executeBenchmark(trace, 10, 1000);
        await this.executeBenchmark(trace, 10, 10000);
        */
    }
}
