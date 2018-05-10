/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Http } from './../../http';
import { Trace } from './../../model/trace';
import { ModelResponse, Status } from './../model-response';
import { IVirtualTableModelProvider } from './../virtual-table-model-provider';
import { VirtualTableQueryFilter } from './../../filter/virtual-table-query-filter';
import { VirtualTableModel } from './../../model/virtual-table-model';
import { TimeQueryFilter } from '../../filter/time-query-filter';
import { ITreeModel } from '../../model/tree-model';
import { TraceBaseModelProvider } from './../trace-base-model-provider';

export class EventTableModelProvider extends TraceBaseModelProvider implements IVirtualTableModelProvider {

    private readonly serverUrl_: string;
    private readonly providerID_: string;

    constructor(serverUrl: string, trace: Trace, providerId: string) {
        super(trace);
        this.serverUrl_ = serverUrl;
        this.providerID_ = providerId;

        this.listenForTraceChange(this.providerID_);
    }

    get id() {
        return this.providerID_;
    }

    public async fetchTree(filter: TimeQueryFilter): Promise<ModelResponse<ITreeModel[]>> {
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
        return <ModelResponse<ITreeModel[]>> res.response;
    }

    public async fetchLines(filter: VirtualTableQueryFilter): Promise<ModelResponse<VirtualTableModel>> {
        if (this.trace_ == null) {
            let m = <VirtualTableModel> {
                columnIds: new Array(),
                count: 0,
                index: 0,
                data: new Array()
            };

            return <ModelResponse<VirtualTableModel>> {
                status: Status.COMPLETED,
                statusMessage: Status.COMPLETED.toString(),
                model: m
            };
        }

        let url = `${this.serverUrl_}/traces/${this.trace_.UUID}/providers/${this.providerID_}/lines`;
        let params = new URLSearchParams();
        params.set('low', filter.index.toString());
        params.set('size', filter.count.toString());

        for (let item of filter.columns) {
            params.append('columnId', item);
        }

        let result = await Http.get(url, params);

        let data = new Array();
        for (let datum of result.response.model.data) {
            data.push(datum.line);
        }

        let model: VirtualTableModel = {
            index: result.response.model.index,
            count: result.response.model.nbTotalEntries,
            columnIds: result.response.model.columnIds,
            data: data
        };

        return <ModelResponse<VirtualTableModel>> {
            status: result.response.status,
            statusMessage: result.response.statusMessage,
            model: model
        };
    }
}
