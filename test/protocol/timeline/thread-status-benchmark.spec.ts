/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { suite, test, timeout } from 'mocha-typescript';

import { ITimelineModelProvider } from '../../../src/common/core/protocol/timeline-model-provider';
import { Trace } from './../../../src/common/core/model/trace';
import { ModelProviders } from './../../../src/common/core/protocol/model-providers';
import { TreeTimelineModelProviderFactory } from './../../../src/common/core/protocol/timeline/tree-timeline-model-provider-factory';
import { TimelineModelProviderBenchmark } from './timeline-model-provider-benchmark';

@suite("Thread Status model provider")
export class ThreadStatusProviderBenchmark extends TimelineModelProviderBenchmark {

    @test("Many-Threads benchmark", timeout(5000000))
    public async runManyThreads() {
        await this.testManyThreads();
    }

    protected getModelProvider(trace: Trace): ITimelineModelProvider {
        return TreeTimelineModelProviderFactory.create(this.serverUrl, trace, ModelProviders.THREAD_STATUS);
    }
}
