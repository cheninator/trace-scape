/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ModelProviders } from './../model-providers';
import { TreeTimelineModelProvider } from './tree-timeline-model-provider';
import { ITimelineModelProvider } from '../timeline-model-provider';
import { Trace } from './../../model/trace';

export class TreeTimelineModelProviderFactory {

    public static create(serverUrl: string, trace: Trace, providerName: string): ITimelineModelProvider {
        switch (providerName) {
            case ModelProviders.THREAD_STATUS:
                return new TreeTimelineModelProvider(serverUrl, trace, ModelProviders.THREAD_STATUS);
            case ModelProviders.RESOURCES_STATUS:
                return new TreeTimelineModelProvider(serverUrl, trace, ModelProviders.RESOURCES_STATUS);
            case ModelProviders.CALLSTACK:
                return new TreeTimelineModelProvider(serverUrl, trace, ModelProviders.CALLSTACK);
            default:
                throw new Error(`${providerName} is not supported`);
        }
    }
}
