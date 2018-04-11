/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ModelProviders } from './../model-providers';
import { EventTableModelProvider } from './event-table-model-provider';
import { IVirtualTableModelProvider } from './../virtual-table-model-provider';
import { Trace } from './../../model/trace';

export class TableModelProviderFactory {

    public static create(serverUrl: string, trace: Trace, providerName: string): IVirtualTableModelProvider {
        switch (providerName) {
            case ModelProviders.EVENTS_TABLE:
                return new EventTableModelProvider(serverUrl, trace, ModelProviders.EVENTS_TABLE);
            default:
                throw new Error(`${providerName} is not supported`);
        }
    }
}
