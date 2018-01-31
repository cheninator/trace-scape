/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../../src/common/model/trace';
import { TraceModelProvider, ITraceModelProvider } from './../../src/common/protocol/trace-model-provider';
import { XYRequestFilter } from './../../src/common/filter/xy-request-filter';
import { BaseRequestFilter } from './../../src/common/filter/base-request-filter';
import { IXYModelProvider } from '../../src/common/protocol/xy-model-provider';
import { BaseModelProviderTest } from './../test-model-provider';
import { Utils } from './../../src/common/utils';
import { ModelResponse, Status } from './../../src/common/protocol/model-response';
import { XYSeries } from './../../src/common/xy/xy-viewmodel';

export abstract class BaseXYModelProviderTest extends BaseModelProviderTest {

    private readonly DEFAULT_REPETITION = 10;

    private modelProvider: IXYModelProvider;

    public async before() {
        await super.before();
        this.modelProvider = this.getModelProvider();
    }

    protected abstract getModelProvider(): IXYModelProvider;

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
            let response: ModelResponse<Array<XYSeries>>;
            do {
                response = await this.modelProvider.fetchData(filter)
            } while (response.status !== Status.COMPLETED)
            
            let stop = performance.now();
            times.push(stop - start);
            console.log(response);
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
