/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as GoldenLayout from 'golden-layout';

import { TreeXYModelProviderFactory } from './../core/protocol/xy/tree-xy-model-provider-factory';
import { IXYModelProvider } from './../core/protocol/xy-model-provider';
import { ModelProviders } from '../core/protocol/model-providers';
import { IGoldenLayoutComponent } from './component';
import { ConfigComponent } from './config-component';
import { XYWidget } from './../xy/xy-widget';
import { Trace } from './../core/model/trace';
import { TreeWidget } from '../tree/tree-widget';

export class TreeXYComponent implements IGoldenLayoutComponent {

    private readonly config_: ConfigComponent;

    private xyWidget_: XYWidget;
    private treeWidget: TreeWidget;
    private modelProvider_: IXYModelProvider;

    constructor(config: ConfigComponent, trace: Trace) {
        this.config_ = config;
        this.modelProvider_ = TreeXYModelProviderFactory.create(config.serverUrl, trace, this.config_.id);
    }

    get html(): string {
        return `
            <div id="${this.config_.id}" style="width: 100%; height: 100%"></div>
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

    public show() {
        this.xyWidget_ = new XYWidget(document.getElementById(this.config_.id), this.modelProvider_);
        this.xyWidget_.inflate({
            min: this.modelProvider_.trace.start,
            max: this.modelProvider_.trace.end,
            count: 500
        });
    }
}
