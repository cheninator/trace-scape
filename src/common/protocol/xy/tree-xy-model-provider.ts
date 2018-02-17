/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { IXYModelProvider } from './../xy-model-provider';
import { ModelResponse } from './../model-response';
import { XYEntries, XYSeries } from './../../xy/xy-viewmodel';
import { TimeQueryFilter } from './../../filter/time-query-filter';
import { Trace } from './../../model/trace';
import { ITreeModel } from '../../model/tree-model';
import { Http } from './../../base/http';

export class TreeXYModelProvider implements IXYModelProvider {

    private readonly serverUrl_: string;
    private readonly trace_: Trace;
    private readonly providerID_: string;

    constructor(serverUrl: string, trace: Trace, providerId) {
        this.serverUrl_ = serverUrl;
        this.trace_ = trace;
        this.providerID_ = providerId;
    }

    get trace() {
        return this.trace_;
    }

    public async fetchTree(filter: TimeQueryFilter): Promise<ModelResponse<ITreeModel[]>> {
        let url = `${this.serverUrl_}/traces/${this.trace_.name}/providers/${this.providerID_}/tree`;
        return <ModelResponse<ITreeModel[]>> await Http.get(url);
    }

    public fetchXY(filter: TimeQueryFilter): Promise<ModelResponse<XYSeries[]>> {
        let url = `${this.serverUrl_}/traces/${this.trace_.name}/${this.providerID_}/xy`;


        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'POST',
                    url: `${this.serverUrl_}/traces/${this.trace_.name}/${this.providerID_}/xy`,
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(filter),
                    success: (response: any) => {
                        let series = new Array();
                        for (let i in response.model.ydata) {
                            series.push({
                                name: response.model.ydata[i].name,
                                x: response.model.xaxis,
                                y: response.model.ydata[i].data
                            });
                        }

                        let obj: ModelResponse<Array<XYSeries>> = {
                            status: response.status,
                            statusMessage: response.statusMessage,
                            model: series
                        };
                        resolve(obj);
                    },
                    error: (xhr, status, error) => {
                        reject(error);
                    },
                }
            );
        });
    }
}
