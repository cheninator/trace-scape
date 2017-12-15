/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../../src/common/model/trace';
import { TraceModelProvider } from './../../src/common/protocol/trace-model-provider';
import { KernelMemoryModelProvider } from './../../src/common/protocol/xy/kernel-memory-model-provider';
import { XYRequestFilter } from './../../src/common/filter/xy-request-filter';
import { BaseRequestFilter } from './../../src/common/filter/base-request-filter';
import { Utils } from './../../src/common/utils';

const DEFAULT_REPETITION = 10;

describe('Kernel memory usage model provider', () => {

    let serverUrl = 'http://localhost:8080/tracecompass';
    let trace: Trace;

    before(async () => {
        let traceModelProvider = new TraceModelProvider(serverUrl);
        let name = 'kernel_vm';
        let path = `/home/yonni/Documents/traces/ctf/src/main/resources/${name}`;
        trace = await traceModelProvider.putTrace(name, path);
    });

    /*
     * Queries only total series for the kernel memory usage endpoint
     */
    it('queries 10 xy points to the kernel memory usage endpoint from trace start to trace end', async (done) => {
        testXYPoints(10, 20);
        done();
    });

    /*
     * Queries only total series for the kernel memory usage endpoint
     */
    it('queries 100 xy points to the kernel memory usage endpoint from trace start to trace end', async (done) => {
        testXYPoints(100, 20);
        done();
    });

    /*
     * Queries only total series for the kernel memory usage endpoint
     */
    it('queries 1000 xy points to the kernel memory usage endpoint from trace start to trace end', async (done) => {
        testXYPoints(1000, 20);
        done();
    });

    it('queries the xy entries to the kernel memory usage endpoint from trace start to trace end', async (done) => {
        testXYEntries(100, 20);
        done();
    });

    after(async () => {
        // TODO : Clean ressources
        await Utils.wait(100);
    });

    /*
     * @param count: The number of XY points to fetch
     * @param repeat: The number of time to query the endpoint. If not specified, 10 is default
     */
    async function testXYPoints(count: number, repeat?: number) {
        let filter: XYRequestFilter = {
            start: trace.start,
            end: trace.end,
            count: count,
            ids: new Array()
        };

        let times = new Array();
        let modelProvider = new KernelMemoryModelProvider(serverUrl, trace);

        let iteration = repeat === undefined ? DEFAULT_REPETITION : repeat;
        for (let i = 0; i < iteration; ++i) {
            let start = performance.now();
            await modelProvider.fetchData(filter);
            let stop = performance.now();
            times.push(stop - start);
        }
        printStats(`testXYPoints: ${count} points`, times);
    }

    /*
     * @param count: The number of XY points to fetch
     * @param repeat: The number of time to query the endpoint. If not specified, 10 is default
     */
    async function testXYEntries(count: number, repeat?: number) {
        let filter: BaseRequestFilter = {
            start: trace.start,
            end: trace.end,
            count: count,
        };

        let times = new Array();
        let modelProvider = new KernelMemoryModelProvider(serverUrl, trace);

        let iteration = repeat === undefined ? DEFAULT_REPETITION : repeat;
        for (let i = 0; i < iteration; ++i) {
            let start = performance.now();
            await modelProvider.fetchEntries(filter);
            let stop = performance.now();
            times.push(stop - start);
        }
        printStats(`testXYEntries`, times);
    }

    function printStats(title: string, times: Array<number>) {
        let sum = times.reduce((previous, current) => current += previous);
        let avg = sum / times.length;
        console.log("----- " + title + " -----");
        console.log("Average time : " + avg + " ms.");
        console.log("Median time : " + median(times) + " ms.");
        console.log("Min : " + Math.min.apply(null, times) + " ms.");
        console.log("Max : " + Math.max.apply(null, times) + " ms.");
        console.log("-------------------------------------------");
    }

    function median(values: Array<number>) {
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
});
