/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TreeXYModelProvider } from './../../../src/common/core/protocol/xy/tree-xy-model-provider';
import { IXYModelProvider } from '../../../src/common/core/protocol/xy-model-provider';
import { XYModelProviderBenchmark } from './xy-model-provider-benchmark';
import { Trace } from './../../../src/common/core/model/trace';
import { ModelProviders } from './../../../src/common/core/protocol/model-providers';
import { TreeXYModelProviderFactory } from './../../../src/common/core/protocol/xy/tree-xy-model-provider-factory';
import { suite, test, timeout } from 'mocha-typescript';

@suite("Kernel memory usage model provider")
export class KernelMemoryModelProviderBenchmark extends XYModelProviderBenchmark {

    @test("Many-Threads benchmark", timeout(5000000))
    public async runManyThreads() {
        await this.testManyThreads();
    }

    protected getModelProvider(trace: Trace): IXYModelProvider {
        return TreeXYModelProviderFactory.create(this.serverUrl, trace, ModelProviders.KERNEL_MEMORY);
    }
}
