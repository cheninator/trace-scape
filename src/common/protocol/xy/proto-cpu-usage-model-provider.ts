/*
* Copyright (C) 2017 École Polytechnique de Montréal
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import { grpc, Code } from 'grpc-web-client';

import { IXYModelProvider } from './../xy-model-provider';
import { ModelResponse } from './../model-response';
import { XYEntries, XYSeries } from './../../xy/xy-viewmodel';
import { TimeQueryFilter } from './../../filter/time-query-filter';
import { Trace } from './../../model/trace';
import { ITreeModel } from '../../model/tree-model';
import { CpuUsageService } from './../protobuf/xy_pb_service';
import { TimeRequestFilter } from './../protobuf/xy_pb';

export class ProtoCpuUsageModelProvider implements IXYModelProvider {

    private serverUrl_: string;
    private readonly trace_: Trace;
    private readonly providerID_ = 'org.eclipse.tracecompass.analysis.os.linux.core.cpuusage.CpuUsageDataProvider';

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
                host: "http://localhost:8080/tracecompass",
                onMessage: (message) => {
                    console.log("Got response: ", message.toObject());
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
        return null;
    }
}
