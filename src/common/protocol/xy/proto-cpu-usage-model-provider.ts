/*
* Copyright (C) 2017 École Polytechnique de Montréal
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import { grpc, Code, BrowserHeaders } from 'grpc-web-client';

import { IXYModelProvider } from './../xy-model-provider';
import { ModelResponse, Status } from './../model-response';
import { XYEntries, XYSeries } from './../../xy/xy-viewmodel';
import { TimeQueryFilter } from './../../filter/time-query-filter';
import { SelectionTimeQueryFilter } from './../../filter/selection-time-query-filter';
import { Trace } from './../../model/trace';
import { ITreeModel } from '../../model/tree-model';
import { CpuUsageService } from './../gRPC/xy_pb_service';
import { TimeRequestFilter, SelectionTimeRequestFilter } from './../gRPC/xy_pb';
import { TreeXYModelResponse, XYModelResponse } from './../gRPC/xy_pb';

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
            request.setStart(filter.start);
            request.setEnd(filter.end);
            request.setCount(filter.count);

            let modelResponse: ModelResponse<ITreeModel[]>;
            grpc.invoke(CpuUsageService.fetchTree, {
                request: request,
                host: this.serverUrl_,
                onMessage: (message: TreeXYModelResponse) => {
                    let tree: ITreeModel[] = new Array();
                    for (let model of message.getModelList()) {
                        tree.push({
                            id: model.getId(),
                            parentId: model.getParentid()
                        });
                    }

                    modelResponse = {
                        status: Status[message.getStatus()],
                        statusMessage: message.getStatusmessage(),
                        model: tree
                    };
                },
                onEnd: (code, msg: string | undefined, trailers) => {
                    if (code === Code.OK) {
                        resolve(modelResponse);
                    } else {
                        console.log("Hit an error", code, msg, trailers);
                        reject();
                    }
                }
            });
        });
    }

    public fetchXY(filter: TimeQueryFilter): Promise<ModelResponse<XYSeries[]>> {
        return new Promise((resolve, reject) => {
            const request = new SelectionTimeRequestFilter();
            request.setStart(filter.start);
            request.setEnd(filter.end);
            request.setCount(filter.count);
            request.setItemsList((<SelectionTimeQueryFilter> filter).items);

            let modelResponse: ModelResponse<XYSeries[]>;
            grpc.invoke(CpuUsageService.fetchXY, {
                request: request,
                host: this.serverUrl_,
                onMessage: (message: XYModelResponse) => {
                    let series: XYSeries[] = new Array();
                    for (let model of message.getModelList()) {
                        series.push({
                            x: model.getXList(),
                            y: model.getYList(),
                            name: model.getName()
                        });
                    }

                    modelResponse = {
                        status: Status[message.getStatus()],
                        statusMessage: message.getStatusmessage(),
                        model: series
                    };
                },
                onEnd: (code, msg: string, trailers) => {
                    if (code === Code.OK) {
                        resolve(modelResponse);
                    } else {
                        console.log("Hit an error", code, msg, trailers);
                        reject(msg);
                    }
                }
            });
        });
    }
}
