/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { DiskModelProvider } from './../../src/common/protocol/xy/disks-io-model-provider';
import { IXYModelProvider } from '../../src/common/protocol/xy-model-provider';
import { BaseXYModelProviderTest } from './test-xy-model-provider.spec';
import { suite, test, timeout } from 'mocha-typescript';

@suite("Disks IO activity model provider")
export class DisksIOModelProviderTest extends BaseXYModelProviderTest {

    private traceName = 'kernel_vm';
    private baseTracePath = '/home/yonni/Documents/traces/ctf/src/main/resources';
    private testTitle = 'Disks IO activity test';

    public async before() {
        await super.before();
    }

    public async after() {
        await super.after();
    }

    @test("queries the xy entries to the kernel memory usage endpoint from trace start to trace end")
    public async query_entries() {
        await this.queryEntries(100, 20, this.testTitle);
    }

    @test("queries 10 xy points to the Disks IO activity endpoint from trace start to trace end")
    public async query_10_points() {
        await this.queryXY(10, 20, this.testTitle);
    }

    @test("queries 100 xy points to the Disks IO activity endpoint from trace start to trace end", timeout(5000))
    public async query_100_points() {
        await this.queryXY(100, 20, this.testTitle);
    }

    @test("queries 1000 xy points to the Disks IO activity endpoint from trace start to trace end", timeout(50000))
    public async query_1000_points() {
        await this.queryXY(1000, 10, this.testTitle);
    }

    @test("queries 10000 xy points to the Disks IO activity endpoint from trace start to trace end", timeout(500000))
    public async query_10000_points() {
        await this.queryXY(10000, 5, this.testTitle);
    }

    protected getModelProvider(): IXYModelProvider {
        return new DiskModelProvider(this.serverUrl, this.trace);
    }

    protected getTraceName(): string {
        return this.traceName;
    }

    protected getTracePath(): string {
        return `${this.baseTracePath}/${this.traceName}`;
    }
}
