/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TreeXYModelProvider } from './../../src/common/protocol/xy/tree-xy-model-provider';
import { IXYModelProvider } from '../../src/common/protocol/xy-model-provider';
import { XYModelProviderBenchmark } from './xy-model-provider-benchmark';
import { suite, test, timeout } from 'mocha-typescript';
import { Trace } from './../../src/common/model/trace';

@suite("Kernel memory usage model provider")
export class KernelMemoryModelProviderBenchmark extends XYModelProviderBenchmark {

    @test("Many-Threads benchmark", timeout(5000000))
    public async runManyThreads() {
        await this.testManyThreads();
    }

    protected getModelProvider(trace: Trace): IXYModelProvider {
        let providerId = 'org.eclipse.tracecompass.analysis.os.linux.core.kernelmemoryusage';
        return new TreeXYModelProvider(this.serverUrl, trace, providerId);
    }
}
