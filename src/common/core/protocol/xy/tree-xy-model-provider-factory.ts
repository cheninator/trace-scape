/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { IXYModelProvider } from './../xy-model-provider';
import { ModelProviders } from './../model-providers';
import { TreeXYModelProvider } from './tree-xy-model-provider';
import { Trace } from './../../model/trace';

export class TreeXYModelProviderFactory {

    public static create(serverUrl: string, trace: Trace, providerName: string): IXYModelProvider {
        switch (providerName) {
            case ModelProviders.CPU:
                return new TreeXYModelProvider(serverUrl, trace, ModelProviders.CPU);
            case ModelProviders.DISK:
                return new TreeXYModelProvider(serverUrl, trace, ModelProviders.DISK);
            case ModelProviders.KERNEL_MEMORY:
                return new TreeXYModelProvider(serverUrl, trace, ModelProviders.KERNEL_MEMORY);
            default:
                throw new Error(`${providerName} is not supported`);
        }
    }
}
