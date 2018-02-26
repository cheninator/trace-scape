/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as GoldenLayout from 'golden-layout';

import { IGoldenLayoutComponent } from './component';
import { ITimelineModelProvider } from './../core/protocol/timeline-model-provider';
import { TreeTimelineModelProviderFactory } from './../core/protocol/timeline/tree-timeline-model-provider-factory';
import { TimelineWidget } from './../timeline/timeline-widget';
import { Trace } from './../core/model/trace';

export class TreeTimelineComponent implements IGoldenLayoutComponent {

    private modelProvider_: ITimelineModelProvider;
    private readonly id_: string;

    constructor(id: string, serverUrl: string, trace: Trace) {
        this.id_ = id;
        this.modelProvider_ = TreeTimelineModelProviderFactory.create(serverUrl, trace, this.id_);
    }

    get html(): string {
        return `<canvas id="${this.id_}" width="1650" height="600"></canvas>`;
    }

    get itemConfiguration(): GoldenLayout.ItemConfig {
        return <GoldenLayout.ComponentConfig> {
            title: this.id_,
            type: 'component',
            componentName: this.id_,
            componentState: { text: '' }
        };
    }

    public show(): void {
        let timeline = new TimelineWidget(this.id_, this.modelProvider_);
        timeline.inflate();
    }
}
