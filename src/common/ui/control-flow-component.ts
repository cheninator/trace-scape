/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { IComponent } from './component';
import { ControlFlowModelProvider } from './../protocol/timeline/control-flow-model-provider';
import { TimelineWidget } from './../timeline/timeline-widget';
import { Trace } from './../model/trace';

export class ControlFlowComponent implements IComponent {

    private modelProvider_: ControlFlowModelProvider;
    private readonly id_ = 'control-flow';

    constructor(serverUrl: string, trace: Trace) {
        this.modelProvider_ = new ControlFlowModelProvider(serverUrl, trace);
    }

    get html(): string {
        return `
        <canvas id="${this.id_}" width="1650" height="600"></canvas>
        `;
    }

    get name(): string {
        return 'control-flow';
    }

    get title(): string {
        return 'Control Flow';
    }

    public show(): void {
        let timeline = new TimelineWidget(this.id_, this.modelProvider_);
        timeline.inflate();
    }
}
