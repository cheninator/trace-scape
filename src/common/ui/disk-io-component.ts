/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { IComponent } from './component';
import { DiskModelProvider } from './../protocol/xy/disks-io-model-provider';
import { XYWidget } from './../xy/xy-widget';
import { Trace } from './../model/trace';

export class DiskIOComponent implements IComponent {
    
    private diskModelProvider_: DiskModelProvider;
    private readonly id_ = 'disk';

    constructor(serverUrl: string, trace: Trace) {
        this.diskModelProvider_ = new DiskModelProvider(serverUrl, trace);
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
        return 'disk';
    }

    get title(): string {
        return 'Disk IO Activity';
    }

    public show() {
        let disk = new XYWidget(this.id_, this.diskModelProvider_);
        disk.inflate();
    }
}