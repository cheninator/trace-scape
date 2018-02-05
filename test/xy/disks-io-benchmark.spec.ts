/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { DiskModelProvider } from './../../src/common/protocol/xy/disks-io-model-provider';
import { IXYModelProvider } from '../../src/common/protocol/xy-model-provider';
import { XYModelProviderBenchmark } from './xy-model-provider-benchmark.spec';
import { suite, test, timeout } from 'mocha-typescript';
import { Trace } from './../../src/common/model/trace';

@suite("Disks IO Activity model provider")
export class DisksIOModelProviderBenchmark extends XYModelProviderBenchmark {

    @test("Many-Threads benchmark", timeout(5000000))
    public async runManyThreads() {
        await this.testManyThreads();
    }

    protected getModelProvider(trace: Trace): IXYModelProvider {
        return new DiskModelProvider(this.serverUrl, trace);
    }
}