/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { CpuUsageModelProvider } from './../../src/common/protocol/xy/cpu-usage-model-provider';
import { IXYModelProvider } from '../../src/common/protocol/xy-model-provider';
import { XYModelProviderBenchmark } from './xy-model-provider-benchmark';
import { suite, test, timeout } from 'mocha-typescript';
import { Trace } from './../../src/common/model/trace';

@suite("CPU usage model provider")
export class CpuUsageModelProviderBenchmark extends XYModelProviderBenchmark {

    @test("Many-Threads benchmark", timeout(5000000))
    public async runManyThreads() {
        await this.testManyThreads();
    }

    protected getModelProvider(trace: Trace): IXYModelProvider {
        return new CpuUsageModelProvider(this.serverUrl, trace);
    }
}
