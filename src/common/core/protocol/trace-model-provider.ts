/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../model/trace';
import { Http } from './../http';

export interface ITraceModelProvider {
    getTraces(): Promise<Trace[]>;
    getTrace(traceId: string): Promise<Trace>;
    putTrace(name: string, path: string): Promise<Trace>;
    removeTrace(traceId: string): Promise<boolean>;
}

export class TraceModelProvider implements ITraceModelProvider {

    private serverUrl_: string;

    constructor(serverUrl: string) {
        this.serverUrl_ = serverUrl;
    }

    public async getTraces(): Promise<Trace[]> {
        return <Trace[]> await Http.get(`${this.serverUrl_}/traces`);
    }

    public async getTrace(traceId: string): Promise<Trace> {
        return <Trace> await Http.get(`${this.serverUrl_}/traces/${traceId}`);
    }

    public async putTrace(name: string, path: string): Promise<Trace> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('name', name);
        params.set('path', path);

        return <Trace> await Http.post(`${this.serverUrl_}/traces`, params);
    }

    public async removeTrace(traceId: string): Promise<boolean> {
        return <boolean> await Http.delete(`${this.serverUrl_}/traces/${traceId}`);
    }
}
