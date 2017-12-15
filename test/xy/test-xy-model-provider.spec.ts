/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { suite } from 'mocha-typescript';
import { Trace } from './../../src/common/model/trace';
import { TraceModelProvider, ITraceModelProvider } from './../../src/common/protocol/trace-model-provider';
import { XYRequestFilter } from './../../src/common/filter/xy-request-filter';
import { BaseRequestFilter } from './../../src/common/filter/base-request-filter';
import { IXYModelProvider } from '../../src/common/protocol/xy-model-provider';
import { Utils } from './../../src/common/utils';

export abstract class BaseXYModelProviderTest {

    private readonly DEFAULT_REPETITION = 10;

    private traceModelProvider: ITraceModelProvider;
    private modelProvider: IXYModelProvider;

    protected trace: Trace;
    protected serverUrl = 'http://localhost:8080/tracecompass';

    public async before() {
        this.traceModelProvider = new TraceModelProvider(this.serverUrl);
        this.trace = await this.traceModelProvider.putTrace(this.getTraceName(), this.getTracePath());

        this.modelProvider = this.getModelProvider();
    }

    protected abstract getModelProvider(): IXYModelProvider;

    protected abstract getTraceName(): string;

    protected abstract getTracePath(): string;

    protected async queryXY(count: number, repeat: number, testDescription: string) {
        let filter: XYRequestFilter = {
            start: this.trace.start,
            end: this.trace.end,
            count: count,
            ids: new Array()
        };

        let times = new Array();
        let iteration = repeat === undefined ? this.DEFAULT_REPETITION : repeat;
        for (let i = 0; i < iteration; ++i) {
            let start = performance.now();
            console.log(await this.modelProvider.fetchData(filter));
            let stop = performance.now();
            times.push(stop - start);
            Utils.wait(500);
        }
        this.printStats(`${testDescription}: ${count} points`, times);
    }

    protected async queryEntries(count: number, repeat: number, testDescription: string) {
        let filter: BaseRequestFilter = {
            start: this.trace.start,
            end: this.trace.end,
            count: count,
        };

        let times = new Array();
        let iteration = repeat === undefined ? this.DEFAULT_REPETITION : repeat;
        for (let i = 0; i < iteration; ++i) {
            let start = performance.now();
            console.log(await this.modelProvider.fetchEntries(filter));
            let stop = performance.now();
            times.push(stop - start);
            Utils.wait(500);
        }
        this.printStats(`${testDescription}: ${count} entries`, times);
    }

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
