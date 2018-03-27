/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { SelectionTimeQueryFilter } from '../../filter/selection-time-query-filter';
import { ITreeModel } from '../../model/tree-model';
import { TimeQueryFilter } from './../../filter/time-query-filter';
import { Http } from './../../http';
import { Trace } from './../../model/trace';
import { XYSeries } from './../../model/xy-model';
import { ModelResponse } from './../model-response';
import { TraceBaseModelProvider } from './../trace-base-model-provider';
import { IXYModelProvider } from './../xy-model-provider';

export class TreeXYModelProvider extends TraceBaseModelProvider implements IXYModelProvider {

    private readonly serverUrl_: string;
    private readonly providerID_: string;

    constructor(serverUrl: string, trace: Trace, providerId: string) {
        super(trace);
        this.serverUrl_ = serverUrl;
        this.providerID_ = providerId;

        this.listenForTraceChange();
    }

    get visibleRange() {
        return {
            start: this.trace_.start,
            end: this.trace_.end
        };
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

    public async fetchXY(filter: TimeQueryFilter): Promise<ModelResponse<XYSeries[]>> {
        let url = `${this.serverUrl_}/traces/${this.trace_.UUID}/providers/${this.providerID_}/xy`;
        let params = new URLSearchParams();
        params.set('start', filter.start.toString());
        params.set('end', filter.end.toString());
        params.set('nb', filter.count.toString());

        let castFilter = <SelectionTimeQueryFilter> filter;
        if (castFilter.items) {
            for (let item of castFilter.items) {
                params.append('ids', item.toString());
            }
        }

        let res = await Http.get(url, params);

        let model: XYSeries[] = new Array();
        if (res.response.model) {
            for (let datum in res.response.model.data) {
                model.push(<XYSeries> {
                    name: res.response.model.data[datum].name,
                    x: res.response.model.data[datum].xaxis,
                    y: res.response.model.data[datum].data
                });
            }
        }

        return <ModelResponse<XYSeries[]>> {
            model: model,
            status: res.response.status,
            statusMessage: res.response.statusMessage
        };
    }
}
