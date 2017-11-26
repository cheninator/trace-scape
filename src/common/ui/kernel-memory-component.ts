/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { IComponent } from './component';
import { KernelMemoryModelProvider } from './../protocol/xy/kernel-memory-model-provider';
import { XYWidget } from './../xy/xy-widget';
import { Trace } from './../model/trace';

export class KernelMemoryComponent implements IComponent {
    
    private memoryModelProvider_: KernelMemoryModelProvider;
    private readonly id_ = 'mem';

    constructor(serverUrl: string, trace: Trace) {
        this.memoryModelProvider_ = new KernelMemoryModelProvider(serverUrl, trace);
    }

    get html(): string {
        return `
        <div class="row">
            <div class="col-md-12">
                <canvas id="${this.id_}-overlay" style="position:absolute; pointer-events:none; z-index: 0;"></canvas>
                <canvas id="${this.id_}" style="z-index: 1;"></canvas>
            </div>
        </div>
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