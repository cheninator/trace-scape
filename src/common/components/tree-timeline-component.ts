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
import { Utils } from '../core/utils';
import { TimelineEntry } from '../core/model/timeline-model';

export class TreeTimelineComponent extends BaseGoldenLayoutComponent {

    private timelineWidget_: TimelineWidget;
    private treeWidget_: TreeWidget;
    private modelProvider_: ITimelineModelProvider;

    constructor(config: ConfigComponent, trace: Trace) {
        super(config);
        this.modelProvider_ = TreeTimelineModelProviderFactory.create(this.config_.serverUrl, trace, this.config_.id);
        window.addEventListener(EventType.TREE_MODEL_CHANGED, this.treeModelChanged.bind(this));

        let event = `${EventType.MODEL_PROVIDER_CHANGED}-${this.config_.id}`;
        window.addEventListener(event, async () => {
            await this.treeWidget_.update();

            this.timelineWidget_.resetVisibleWindow();
            this.timelineWidget_.update();
        });
    }

    get html(): string {
        return `
            <div class="row" style="height: inherit">
                <div class="col-md-2">
                    <div id="tree-${this.config_.id}" style="overflow-y: scroll; max-height: 100%"></div>
                </div>
                <div class="col-md-10">
                    <canvas id="${this.config_.id}" style="width: 100%; height: 100%"></canvas>
                </div>
            </div>
        `;
    }

    public show(): void {
        this.timelineWidget_ = new TimelineWidget(document.getElementById(this.config_.id), this.modelProvider_);
        this.treeWidget_ = new TreeWidget(document.getElementById(`tree-${this.config_.id}`), this.modelProvider_);

        this.treeWidget_.inflate();
        Utils.wait(300).then(() => {
            this.timelineWidget_.inflate();
        });
    }

    private treeModelChanged(e: CustomEvent) {
        if (this.timelineWidget_ !== undefined) {
            this.timelineWidget_.entries = this.treeWidget_.getAllNodes() as TimelineEntry[];
            this.treeWidget_.expandAll();
        }
    }
}
