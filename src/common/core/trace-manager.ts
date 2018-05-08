/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ITraceModelProvider, TraceModelProvider } from './protocol/trace-model-provider';
import { Dictionary } from './dictionary';
import { Trace } from './model/trace';
import { EventType } from './../base/events';
import { TreeXYComponent } from '../components/tree-xy-component';

export class TraceManager {

    private static intance_: TraceManager;
    private static serverUrl_ = "http://localhost:8080/tracecompass";

    static set DefaultServerUrl(serverUrl: string) {
        TraceManager.serverUrl_ = serverUrl;
    }

    public static getInstance() {
        if (TraceManager.intance_ === undefined) {
            TraceManager.intance_ = new TraceManager(new TraceModelProvider(TraceManager.serverUrl_));
        }
        return TraceManager.intance_;
    }

    private modelProvider_: ITraceModelProvider;
    private traces_: Dictionary<Trace>;

    private constructor(modelProvider: ITraceModelProvider) {
        this.modelProvider_ = modelProvider;
        this.traces_ = new Dictionary();

        window.addEventListener(EventType.TRACE_CHANGED, this.traceUpdated.bind(this));
    }

    public async getTraceById(id: string) {
        let result = this.traces_.get(id);
        if (result !== undefined) {
            return result;
        }

        let traces = await this.modelProvider_.getTraces();
        this.updateTraces(traces);
        let results = this.traces_.values().filter(x => x.UUID === id);
    }

    public async openTrace(name: string, path: string): Promise<Trace> {
        let trace: Trace;
        trace = await this.getTraceByName(name, path);

        if (trace === undefined) {
            trace = await this.modelProvider_.putTrace(name, path);
            this.traces_.add(trace.UUID, trace);
        }
        return trace;
    }

    public async uploadTraceFile(file: File) {
        return this.modelProvider_.uploadTrace(file);
    }

    private async getTraceByName(name: string, path: string) {
        /* Search if we have it locally */
        let results = this.traces_.values().filter(x => x.name === name && x.path === path);
        if (results.length !== 0) {
            return results[0];
        }

        /* Query the server if the corresponding trace is opened */
        let traces = await this.modelProvider_.getTraces();
        this.updateTraces(traces);
        results = this.traces_.values().filter(x => x.name === name && x.path === path);
        return results[0];
    }

    private updateTraces(traces: Trace[]) {
        for (let trace of traces) {
            if (!this.traces_.contains(trace.UUID)) {
                this.traces_.add(trace.UUID, trace);
            }
        }
    }

    private traceUpdated(e: CustomEvent) {
        let trace = e.detail.model as Trace;
        if (this.traces_.contains(trace.UUID)) {
            this.traces_.set(trace.UUID, trace);
        }
    }
}
