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
import { TimelineRequestFilter } from './../../src/common/filter/timeline-request-filter';
import { BaseRequestFilter } from './../../src/common/filter/base-request-filter';
import { ITimelineModelProvider } from '../../src/common/protocol/timeline-model-provider';
import { BaseModelProviderTest } from './../test-model-provider';
import { Utils } from './../../src/common/utils';

export abstract class BaseTimelineModelProviderTest extends BaseModelProviderTest {

    private readonly DEFAULT_REPETITION = 10;

    private modelProvider: ITimelineModelProvider;

    public async before() {
        super.before();
        this.modelProvider = this.getModelProvider();
    }

    protected abstract getModelProvider(): ITimelineModelProvider;

    protected async queryStates(count: number, repeat: number, testDescription: string) {
        let filter: TimelineRequestFilter = {
            start: this.trace.start,
            end: this.trace.end,
            count: count,
            entries: new Array()
        };

        let times = new Array();
        let iteration = repeat === undefined ? this.DEFAULT_REPETITION : repeat;
        for (let i = 0; i < iteration; ++i) {
            let start = performance.now();
            console.log(await this.modelProvider.fetchEvents(filter));
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
}
