/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Http } from './../../http';
import { Trace } from './../../model/trace';
import { ModelResponse } from './../model-response';
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
        let url = `${this.serverUrl_}/traces/${this.trace_.UUID}/eventTable`;
        let params = new URLSearchParams();
        params.set('low', filter.index.toString());
        params.set('size', filter.count.toString());

        let res = await Http.get(url, params);
        return <ModelResponse<VirtualTableModel>> res.response;
    }
}
