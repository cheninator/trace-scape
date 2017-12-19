/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { suite, test, timeout } from 'mocha-typescript';
import { ThreadStatusModelProvider } from './../../src/common/protocol/timeline/thread-status-model-provider';
import { BaseTimelineModelProviderTest } from './test-timeline-model-provider';
import { ITimelineModelProvider } from '../../src/common/protocol/timeline-model-provider';

@suite("Thread Status model provider")
export class ThreadStatusProviderTest extends BaseTimelineModelProviderTest {

    private traceName = 'huge_trace';
    private baseTracePath = '/home/yonni/Documents/traces/ctf/src/main/resources';
    private testTitle = 'Thread Status test';

    public async before() {
        await super.before();
    }

    @test("queries the thread status entries to the trace server from trace start to trace end", timeout(50000))
    public async query_entries() {
        await this.queryEntries(100, 20, this.testTitle);
    }

    @test("queries the thread status states to the trace server from trace start to trace end", timeout(50000))
    public async query_10_points() {
        await this.queryStates(10, 20, this.testTitle);
    }

    @test("queries the thread status states to the trace server from trace start to trace end", timeout(50000))
    public async query_100_points() {
        await this.queryStates(100, 20, this.testTitle);
    }

    @test("queries the thread status states to the trace server from trace start to trace end", timeout(500000))
    public async query_1000_points() {
        await this.queryStates(1000, 10, this.testTitle);
    }

    @test("queries the thread status states to the trace server from trace start to trace end", timeout(5000000))
    public async query_10000_points() {
        await this.queryStates(10000, 5, this.testTitle);
    }

    protected getModelProvider(): ITimelineModelProvider {
        return new ThreadStatusModelProvider(this.serverUrl, this.trace);
    }

    protected getTraceName(): string {
        return this.traceName;
    }

    protected getTracePath(): string {
        return `${this.baseTracePath}/${this.traceName}`;
    }
}
