/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TimelineRowModel, TimelineEntry, TimelineArrow } from './../../model/timeline-model';
import { SelectionTimeQueryFilter } from './../../filter/selection-time-query-filter';
import { TimeQueryFilter } from './../../filter/time-query-filter';
import { Trace } from './../../model/trace';
import { ITimelineModelProvider } from './../timeline-model-provider';
import { ModelResponse, Status } from './../model-response';
import { ITreeModel } from '../../model/tree-model';
import { Http } from './../../http';
import { TraceBaseModelProvider } from './../trace-base-model-provider';
import { Range } from './../../../core/range';

export class TreeTimelineModelProvider extends TraceBaseModelProvider implements ITimelineModelProvider {

    private serverUrl_: string;
    private readonly providerID_: string;

    constructor(serverUrl: string, trace: Trace, providerId: string) {
        super(trace);
        this.serverUrl_ = serverUrl;
        this.providerID_ = providerId;

        this.listenForTraceChange();
    }

    public async fetchTree(filter: TimeQueryFilter) : Promise<ModelResponse<ITreeModel[]>> {
        if (this.trace_ == null) {
            return <ModelResponse<ITreeModel[]>> {
                status: Status.COMPLETED,
                statusMessage: Status.COMPLETED.toString(),
                model: new Array()
            };
        }

        let url = `${this.serverUrl_}/traces/${this.trace_.UUID}/providers/${this.providerID_}/tree`;
        let params = new URLSearchParams();
        params.set('start', filter.start.toString());
        params.set('end', filter.end.toString());
        params.set('nb', filter.count.toString());

        let res = await Http.get(url, params);
        this.trace_ = <Trace> res.trace;
        return <ModelResponse<TimelineEntry[]>> res.response;
    }

    public async fetchEvents(filter: SelectionTimeQueryFilter) : Promise<ModelResponse<TimelineRowModel[]>> {
        if (this.trace_ == null) {
            return <ModelResponse<TimelineRowModel[]>> {
                status: Status.COMPLETED,
                statusMessage: Status.COMPLETED.toString(),
                model: new Array()
            };
        }

        let url = `${this.serverUrl_}/traces/${this.trace_.UUID}/providers/${this.providerID_}/states`;
        let params = new URLSearchParams();
        params.set('start', filter.start.toString());
        params.set('end', filter.end.toString());
        params.set('nb', filter.count.toString());

        for (let item of filter.items) {
            params.append('ids', item.toString());
        }
        let res = await Http.get(url, params);

        return <ModelResponse<TimelineRowModel[]>> res.response;
    }

    public async fetchArrows(filter: TimeQueryFilter) : Promise<ModelResponse<TimelineArrow[]>> {
        if (this.trace_ == null) {
            return <ModelResponse<TimelineArrow[]>> {
                status: Status.COMPLETED,
                statusMessage: Status.COMPLETED.toString(),
                model: new Array()
            };
        }

        let url = `${this.serverUrl_}/traces/${this.trace_.UUID}/providers/${this.providerID_}/arrows`;
        let params = new URLSearchParams();
        params.set('start', filter.start.toString());
        params.set('end', filter.end.toString());
        params.set('nb', filter.count.toString());

        let res = await Http.get(url, params);
        this.trace_ = <Trace> res.trace;
        return <ModelResponse<TimelineArrow[]>> res.response;
    }
}
