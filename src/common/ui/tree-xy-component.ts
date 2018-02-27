/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as GoldenLayout from 'golden-layout';

import { IGoldenLayoutComponent } from './component';
import { XYWidget } from './../xy/xy-widget';
import { Trace } from './../core/model/trace';
import { IXYModelProvider } from './../core/protocol/xy-model-provider';
import { TreeXYModelProviderFactory } from './../core/protocol/xy/tree-xy-model-provider-factory';
import { ModelProviders } from '../core/protocol/model-providers';

export class TreeXYComponent implements IGoldenLayoutComponent {

    private modelProvider_: IXYModelProvider;
    private readonly id_: string;

    constructor(id: string, serverUrl: string, trace: Trace) {
        this.id_ = id;
        this.modelProvider_ = TreeXYModelProviderFactory.create(serverUrl, trace, this.id_);
    }

    get html(): string {
        return `
            <div id="${this.id_}" style="width: 100%; height: 100%"></div>
        `;
    }

    get itemConfiguration(): GoldenLayout.ItemConfig {
        return <GoldenLayout.ComponentConfig> {
            title: this.id_,
            type: 'component',
            componentName: this.id_,
            componentState: { text: '' }
        };
    }

    public show() {
        let widget = new XYWidget(document.getElementById(this.id_), this.modelProvider_);
        widget.inflate();
    }
}
