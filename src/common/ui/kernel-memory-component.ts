/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { IComponent } from './component';
import { XYWidget } from './../xy/xy-widget';
import { Trace } from './../model/trace';
import { IXYModelProvider } from '../protocol/xy-model-provider';
import { TreeXYModelProvider } from './../protocol/xy/tree-xy-model-provider';

export class KernelMemoryComponent implements IComponent {

    private memoryModelProvider_: IXYModelProvider;
    private readonly id_ = 'mem';

    constructor(serverUrl: string, trace: Trace) {
        let providerId = 'org.eclipse.tracecompass.analysis.os.linux.core.kernelmemoryusage';
        this.memoryModelProvider_ = new TreeXYModelProvider(serverUrl, trace, providerId);
    }

    get html(): string {
        return `
            <div id="${this.id_}"></div>
        `;
    }

    get name(): string {
        return 'mem';
    }

    get title(): string {
        return 'Kernel Memory Usage';
    }

    public show() {
        let kernel = new XYWidget(this.id_, this.memoryModelProvider_);
        kernel.inflate();
    }
}
