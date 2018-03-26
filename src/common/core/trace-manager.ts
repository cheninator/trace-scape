/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ITraceModelProvider } from './protocol/trace-model-provider';
import { Dictionary } from './dictionary';
import { Trace } from './model/trace';

export class TraceManager {

    private modelProvider_: ITraceModelProvider;
    private traces_: Dictionary<Trace>;

    constructor(modelProvider: ITraceModelProvider) {
        this.modelProvider_ = modelProvider;
        this.traces_ = new Dictionary();
    }

    public getTraceById(id: string) {
        return this.traces_.get(id);
    }

    public async getTraceByName(name: string, path: string) {
        let traces = await this.modelProvider_.getTraces();
        for (let trace of traces) {
            if (!this.traces_.contains(trace.UUID)) {
                this.traces_.add(trace.UUID, trace);
            }
        }

        let results = this.traces_.values().filter(x => x.name === name && x.path === path);
        return results[0];
    }

    public async openTrace(name: string, path: string): Promise<Trace> {
        let trace: Trace;
        trace = await this.getTraceByName(name, path);

        if (trace === undefined) {
            trace = await this.modelProvider_.putTrace(name, path);
        }
        return trace;
    }
}
