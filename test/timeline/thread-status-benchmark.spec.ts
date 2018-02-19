/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../../src/common/model/trace';
import { suite, test, timeout } from 'mocha-typescript';
import { TreeTimelineModelProvider } from './../../src/common/protocol/timeline/tree-timeline-model-provider';
import { TimelineModelProviderBenchmark } from './timeline-model-provider-benchmark';
import { ITimelineModelProvider } from '../../src/common/protocol/timeline-model-provider';

@suite("Thread Status model provider")
export class ThreadStatusProviderBenchmark extends TimelineModelProviderBenchmark {

    @test("Many-Threads benchmark", timeout(5000000))
    public async runManyThreads() {
        await this.testManyThreads();
    }

    protected getModelProvider(trace: Trace): ITimelineModelProvider {
        const providerId = 'org.eclipse.tracecompass.internal.analysis.os.linux.core.threadstatus.ThreadStatusDataProvider';
        return new TreeTimelineModelProvider(this.serverUrl, trace, providerId);
    }
}
