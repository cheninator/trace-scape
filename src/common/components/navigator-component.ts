/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as GoldenLayout from 'golden-layout';

import { ITreeModelProvider } from '../core/protocol/tree-model-provider';
import { ProjectExplorerModelProvider } from './../core/protocol/project-explorer-model-provider';
import { TreeWidget } from './../tree/tree-widget';
import { BaseGoldenLayoutComponent } from './component';
import { ConfigComponent } from './config-component';

export class NavigatorComponent extends BaseGoldenLayoutComponent {

    private static readonly configuration: ConfigComponent = {
        id: "navigator",
        name: "Project explorer",
        serverUrl: ""
    };

    private treeWidget_: TreeWidget;
    private modelProvider_: ITreeModelProvider;

    constructor() {
        super(NavigatorComponent.configuration);
        this.modelProvider_ = new ProjectExplorerModelProvider(this.config_.serverUrl);
    }

    get html(): string {
        return `
            <div id="${this.config_.id}"></div>
        `;
    }

    get itemConfiguration(): GoldenLayout.ItemConfig {
        return <GoldenLayout.ComponentConfig> {
            id: this.config_.id,
            title: this.config_.name,
            type: 'component',
            componentName: this.config_.name,
            isClosable: false,
        };
    }

    public show() {
        this.treeWidget_ = new TreeWidget(document.getElementById(this.config_.id), this.modelProvider_);
        this.treeWidget_.inflate({
            min: 0,
            max: 100,
            count: 10
        });
    }
}
