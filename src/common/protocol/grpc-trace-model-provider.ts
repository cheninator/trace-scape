/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
import { grpc, Code, BrowserHeaders } from 'grpc-web-client';

import { EmptyParameters, TraceParameters } from './gRPC/xy_pb';
import { TraceService } from './gRPC/xy_pb_service';

import { Trace } from './../model/trace';
import { ProtoTrace } from './gRPC/xy_pb';
import { ITraceModelProvider } from './trace-model-provider';

export class GRPCTraceModelProvider implements ITraceModelProvider {

    private serverUrl_: string;

    constructor(serverUrl: string) {
        this.serverUrl_ = serverUrl;
    }

    public getTraces(): Promise<Trace[]> {
        return new Promise((resolve, reject) => {
            const request = new EmptyParameters();
            grpc.invoke(TraceService.getTraces, {
                request: request,
                host: this.serverUrl_,
                onMessage: (message: ProtoTrace) => {
                    console.log("Got response: ");
                    console.log(message.toObject());
                },
                onEnd: (code, msg: string | undefined, trailers) => {
                    if (code === Code.OK) {
                        console.log("All ok");
                        resolve();
                    } else {
                        console.log("Hit an error", code, msg, trailers);
                        reject();
                    }
                }
            });
        });
    }

    public getTrace(traceId: string): Promise<Trace> {
        throw new Error("Method not implemented.");
    }

    public putTrace(name: string, path: string): Promise<Trace> {
        return new Promise((resolve, reject) => {
            const request = new TraceParameters();
            request.setName(name);
            request.setPath(path);
            let trace: Trace;

            grpc.invoke(TraceService.openTrace, {
                request: request,
                host: this.serverUrl_,
                onMessage: (message: ProtoTrace) => {
                    trace = {
                        start: message.getStart(),
                        end: message.getEnd(),
                        UUID: message.getId(),
                        name: message.getName(),
                        nbEvents: 0,
                        path: path
                    };
                },
                onEnd: (code, msg: string | undefined, trailers) => {
                    if (code === Code.OK) {
                        resolve(trace);
                    } else {
                        console.log("Hit an error", code, msg, trailers);
                        reject(null);
                    }
                }
            });
        });
    }

    public removeTrace(name: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    method: 'DELETE',
                    url: `${this.serverUrl_}/traces/${name}`,
                    success: (response, status, xhr) => {
                        resolve(true);
                    },
                    error: (xhr, status, error) => {
                        reject(error);
                    },
                }
            );
        });
    }
}
