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
import { XYRequestFilter } from './../../filter/xy-request-filter';
import { Trace } from './../../model/trace';

export class DiskModelProvider implements IXYModelProvider {

    private serverUrl_: string;
    private readonly trace_: Trace;
    private readonly providerID_ = 'org.eclipse.tracecompass.analysis.os.linux.core.inputoutput.DisksIODataProvider';

    constructor(serverUrl: string, trace: Trace) {
        this.serverUrl_ = serverUrl;
        this.trace_ = trace;
    }

    get trace() {
        return this.trace_;
    }

    public fetchEntries(filter: TimeQueryFilter): Promise<ModelResponse<Array<XYEntries>>> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'GET',
                    url: `${this.serverUrl_}/traces/${this.trace_.name}/${this.providerID_}`,
                    contentType: 'application/x-www-form-urlencoded',
                    data: filter,
                    success: (response: any) => {
                        let obj = <ModelResponse<Array<XYEntries>>> response;
                        resolve(obj);
                    },
                    error: (xhr, status, error) => {
                        reject(error);
                    },
                }
            );
        });
    }

    public fetchData(filter: XYRequestFilter): Promise<ModelResponse<Array<XYSeries>>> {
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
