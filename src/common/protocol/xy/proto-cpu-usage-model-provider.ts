/*
* Copyright (C) 2017 École Polytechnique de Montréal
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import { grpc, Code, BrowserHeaders } from 'grpc-web-client';

import { IXYModelProvider } from './../xy-model-provider';
import { ModelResponse } from './../model-response';
import { XYEntries, XYSeries } from './../../xy/xy-viewmodel';
import { TimeQueryFilter } from './../../filter/time-query-filter';
import { Trace } from './../../model/trace';
import { ITreeModel } from '../../model/tree-model';
import { CpuUsageService } from './../protobuf/xy_pb_service';
import { TimeRequestFilter, SelectionTimeRequestFilter } from './../protobuf/xy_pb';
import { TreeXYModelResponse, XYModelResponse } from './../protobuf/xy_pb';

export class ProtoCpuUsageModelProvider implements IXYModelProvider {

    private serverUrl_: string;
    private readonly trace_: Trace;

    constructor(serverUrl: string, trace: Trace) {
        this.serverUrl_ = serverUrl;
        this.trace_ = trace;
    }

    get trace() {
        return this.trace_;
    }

    public fetchTree(filter: TimeQueryFilter): Promise<ModelResponse<ITreeModel[]>> {
        return new Promise((resolve, reject) => {
            const request = new TimeRequestFilter();
            grpc.invoke(CpuUsageService.fetchTree, {
                request: request,
                host: this.serverUrl_,
                onMessage: (message: TreeXYModelResponse) => {
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

    public fetchXY(filter: TimeQueryFilter): Promise<ModelResponse<Array<XYSeries>>> {
        return new Promise((resolve, reject) => {
            const request = new SelectionTimeRequestFilter();
            request.setStart(0);
            request.setEnd(1000);
            request.setItemsList(new Array());
            request.setCount(10);
            grpc.invoke(CpuUsageService.fetchXY, {
                request: request,
                debug: true,
                host: this.serverUrl_,
                onMessage: (message: XYModelResponse) => {
                    console.log("Got response: ", message.toObject());
                },
                onHeaders: (header: BrowserHeaders) => {
                    console.log("onHeaders");
                    console.log(header);
                },
                onEnd: (code, msg: string, trailers) => {
                    if (code === Code.OK) {
                        console.log("All ok");
                        resolve();
                    } else {
                        console.log("Hit an error", code, msg, trailers);
                        reject(msg);
                    }
                }
            });
        });
    }
}
