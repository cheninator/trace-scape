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

export class EventTableModelProvider implements IVirtualTableModelProvider {

    private readonly serverUrl_: string;
    private trace_: Trace;
    private readonly providerID_: string;

    constructor(serverUrl: string, trace: Trace, providerId: string) {
        this.serverUrl_ = serverUrl;
        this.trace_ = trace;
        this.providerID_ = providerId;
    }

    public async fetch(filter: VirtualTableQueryFilter): Promise<ModelResponse<VirtualTableModel>> {
        let url = `${this.serverUrl_}/traces/${this.trace_.UUID}/providers/${this.providerID_}/lines`;
        let params = new URLSearchParams();
        params.set('low', filter.index.toString());
        params.set('size', filter.count.toString());

        for (let item of filter.columns) {
            params.append('columnId', item);
        }

        let result = await Http.get(url, params);
        let model: VirtualTableModel = {
            index: result.response.model.index,
            count: result.response.model.nbTotalEntries,
            columns: result.response.model.columnIds,
            data: result.response.model.data
        };

        return <ModelResponse<VirtualTableModel>> {
            status: result.response.status,
            statusMessage: result.response.statusMessage,
            model: model
        };
    }
}
