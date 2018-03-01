/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as GoldenLayout from 'golden-layout';

import { Trace } from './../core/model/trace';
import { ITimelineModelProvider } from './../core/protocol/timeline-model-provider';
import { TreeTimelineModelProviderFactory } from './../core/protocol/timeline/tree-timeline-model-provider-factory';
import { TimelineWidget } from './../timeline/timeline-widget';
import { TreeWidget } from './../tree/tree-widget';
import { BaseGoldenLayoutComponent } from './component';
import { ConfigComponent } from './config-component';
import { EventType } from '../base/events';

export class TreeTimelineComponent extends BaseGoldenLayoutComponent {

    private timelineWidget_: TimelineWidget;
    private treeWidget_: TreeWidget;
    private modelProvider_: ITimelineModelProvider;

    constructor(config: ConfigComponent, trace: Trace) {
        super(config);
        this.modelProvider_ = TreeTimelineModelProviderFactory.create(this.config_.serverUrl, trace, this.config_.serverUrl);

        this.treeWidget_ = new TreeWidget(document.getElementById(`tree-${this.config_.id}`), this.modelProvider_);
        this.timelineWidget_ = new TimelineWidget(document.getElementById(this.config_.id), this.modelProvider_);

        window.addEventListener(EventType.TREE_MODEL_CHANGED, this.treeModelChanged.bind(this));
    }

    get html(): string {
        return `
            <div class="row">
                <div class="col-md-2">
                    <div id="tree-${this.config_.id}"></div>
                </div>
                <div class="col-md-10">
                    <canvas id="${this.config_.id}"></canvas>
                </div>
            </div>
        `;
    }

    public show(): void {
        this.treeWidget_.inflate();
        this.timelineWidget_.inflate();
    }

    private treeModelChanged(e: CustomEvent) {
        this.timelineWidget_.visibleEntries = e.detail.model;
    }
}
