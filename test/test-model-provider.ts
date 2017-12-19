/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../src/common/model/trace';
import { TraceModelProvider, ITraceModelProvider } from './../src/common/protocol/trace-model-provider';

export abstract class BaseModelProviderTest {

    private traceModelProvider: ITraceModelProvider;

    protected trace: Trace;
    protected serverUrl = 'http://localhost:8080/tracecompass';

    public async before() {
        this.traceModelProvider = new TraceModelProvider(this.serverUrl);
        this.trace = await this.traceModelProvider.putTrace(this.getTraceName(), this.getTracePath());
    }

    protected abstract getTraceName(): string;

    protected abstract getTracePath(): string;

    protected printStats(title: string, times: Array<number>) {
        let sum = times.reduce((previous, current) => current += previous);
        let avg = sum / times.length;
        console.log("");
        console.log("");
        console.log("----- " + title + " -----");
        console.log("Average time : " + avg + " ms.");
        console.log("Median time : " + this.median(times) + " ms.");
        console.log("Min : " + Math.min.apply(null, times) + " ms.");
        console.log("Max : " + Math.max.apply(null, times) + " ms.");
        console.log("-------------------------------------------");
    }

    private median(values: Array<number>): number {
        values.sort((a, b) => {
            return a - b;
        });

        let half = Math.floor(values.length / 2);

        if (values.length % 2) {
            return values[half];
        }
        else {
            return (values[half - 1] + values[half]) / 2.0;
        }
    }
}
