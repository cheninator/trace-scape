/*
 * Copyright (C) 2018 École Polytechnique de Montréal
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
import { SelectionTimeQueryFilter } from '../../filter/selection-time-query-filter';

export class TreeXYModelProvider implements IXYModelProvider {

    private readonly serverUrl_: string;
    private trace_: Trace;
    private readonly providerID_: string;

    constructor(serverUrl: string, trace: Trace, providerId: string) {
        this.serverUrl_ = serverUrl;
        this.trace_ = trace;
        this.providerID_ = providerId;
    }

    get trace() {
        return this.trace_;
    }

    public async fetchTree(filter: TimeQueryFilter): Promise<ModelResponse<ITreeModel[]>> {
        let url = `${this.serverUrl_}/traces/${this.trace_.UUID}/providers/${this.providerID_}/tree`;
        let params = new URLSearchParams();
        params.set('start', filter.start.toString());
        params.set('end', filter.end.toString());
        params.set('nb', filter.count.toString());

        let res = await Http.get(url, params);
        this.trace_ = <Trace> res.trace;
        return <ModelResponse<ITreeModel[]>> res.response;
    }

    public async fetchXY(filter: SelectionTimeQueryFilter): Promise<ModelResponse<XYSeries[]>> {
        let url = `${this.serverUrl_}/traces/${this.trace_.UUID}/providers/${this.providerID_}/xy`;
        let params = new URLSearchParams();
        params.set('start', filter.start.toString());
        params.set('end', filter.start < filter.end ? filter.end.toString() : (filter.start + 10).toString());
        params.set('nb', filter.count.toString());

        for (let item of filter.items) {
            params.append('ids', item.toString());
        }
        let res = await Http.get(url, params);

        let model: XYSeries[] = new Array();
        for (let datum in res.response.model.data) {
            model.push(<XYSeries> {
                name: res.response.model.data[datum].name,
                x: res.response.model.data[datum].xaxis,
                y: res.response.model.data[datum].data
            });
        }

        return <ModelResponse<XYSeries[]>> {
            model: model,
            status: res.response.status,
            statusMessage: res.response.statusMessage
        };
    }
}
