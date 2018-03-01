/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as GoldenLayout from 'golden-layout';

import { TreeTimelineModelProviderFactory } from './../core/protocol/timeline/tree-timeline-model-provider-factory';
import { ITimelineModelProvider } from './../core/protocol/timeline-model-provider';
import { TimelineWidget } from './../timeline/timeline-widget';
import { IGoldenLayoutComponent } from './component';
import { ConfigComponent } from './config-component';
import { TreeWidget } from './../tree/tree-widget';
import { Trace } from './../core/model/trace';

export class TreeTimelineComponent implements IGoldenLayoutComponent {

    private readonly config_: ConfigComponent;

    private modelProvider_: ITimelineModelProvider;

    constructor(config: ConfigComponent, trace: Trace) {
        this.config_ = config;
        this.modelProvider_ = TreeTimelineModelProviderFactory.create(this.config_.serverUrl, trace, this.config_.serverUrl);
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

    get itemConfiguration(): GoldenLayout.ItemConfig {
        return <GoldenLayout.ComponentConfig> {
            id: this.config_.id,
            title: this.config_.name,
            type: 'component',
            componentName: this.config_.name
        };
    }

    public show(): void {
        let tree = new TreeWidget(document.getElementById(`tree-${this.config_.id}`), this.modelProvider_);
        /*
        let timeline = new TimelineWidget(document.getElementById(this.config_.id), this.modelProvider_);
        timeline.inflate();
        */
        //tree.init();
        //timeline.treeWidget = tree;
    }
}
