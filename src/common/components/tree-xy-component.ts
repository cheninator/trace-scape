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
import { BaseGoldenLayoutComponent } from './component';
import { ConfigComponent } from './config-component';
import { XYWidget } from './../xy/xy-widget';
import { Trace } from './../core/model/trace';
import { TreeWidget } from '../tree/tree-widget';
import { EventType } from './../base/events';
import { Utils } from './../core/utils';

export class TreeXYComponent extends BaseGoldenLayoutComponent {

    private xyWidget_: XYWidget;
    private treeWidget_: TreeWidget;
    private modelProvider_: IXYModelProvider;

    constructor(config: ConfigComponent, trace: Trace) {
        super(config);
        this.modelProvider_ = TreeXYModelProviderFactory.create(config.serverUrl, trace, this.config_.id);

        window.addEventListener(EventType.TREE_MODEL_CHANGED, this.treeModelChanged.bind(this));

        window.addEventListener(EventType.MODEL_PROVIDER_CHANGED, async () => {
            this.treeWidget_.resetVisibleWindow();
            this.treeWidget_.update();

            Utils.wait(300).then(() => {
                this.xyWidget_.resetVisibleWindow();
                this.xyWidget_.update();
            });
        });
    }

    get html(): string {
        return `
            <div id="tree-${this.config_.id}"></div>
            <div id="${this.config_.id}" style="width: 100%; height: 100%"></div>
        `;
    }

    public show() {
        this.treeWidget_ = new TreeWidget(document.getElementById(`tree-${this.config_.id}`), this.modelProvider_);
        this.xyWidget_ = new XYWidget(document.getElementById(this.config_.id), this.modelProvider_);

        this.treeWidget_.hide();
        this.treeWidget_.inflate();
        Utils.wait(300).then(() => {
            this.xyWidget_.inflate();
        });
    }

    private treeModelChanged(e: CustomEvent) {
        if (this.xyWidget_ !== undefined) {
            this.xyWidget_.selectedEntries = e.detail.model;
        }
    }
}
