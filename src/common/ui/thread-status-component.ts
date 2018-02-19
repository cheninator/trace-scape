/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { IComponent } from './component';
import { ITimelineModelProvider } from './../protocol/timeline-model-provider';
import { TreeTimelineModelProvider } from './../protocol/timeline/tree-timeline-model-provider';
import { TimelineWidget } from './../timeline/timeline-widget';
import { Trace } from './../model/trace';

export class ThreadStatusComponent implements IComponent {

    private modelProvider_: ITimelineModelProvider;
    private readonly id_ = 'control-flow';

    constructor(serverUrl: string, trace: Trace) {
        let providerId = 'org.eclipse.tracecompass.internal.analysis.os.linux.core.threadstatus.ThreadStatusDataProvider';
        this.modelProvider_ = new TreeTimelineModelProvider(serverUrl, trace, providerId);
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
