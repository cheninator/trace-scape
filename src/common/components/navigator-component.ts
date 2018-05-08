/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as GoldenLayout from 'golden-layout';

import { ITreeModelProvider } from '../core/protocol/tree-model-provider';
import { TraceManager } from '../core/trace-manager';
import { EventType } from './../base/events';
import { ProjectExplorerModel } from './../core/model/project-explorer-model';
import { ITreeModel } from './../core/model/tree-model';
import { ProjectExplorerModelProvider } from './../core/protocol/project-explorer-model-provider';
import { TraceUploaderWidget } from './../trace-uploader-widget';
import { TreeWidget } from './../tree/tree-widget';
import { BaseGoldenLayoutComponent } from './component';
import { ConfigComponent } from './config-component';

export class NavigatorComponent extends BaseGoldenLayoutComponent {

    private treeWidget_: TreeWidget;
    private traceUploaderWidget_: TraceUploaderWidget;
    private modelProvider_: ITreeModelProvider;

    constructor(config: ConfigComponent) {
        super(config);
        this.modelProvider_ = new ProjectExplorerModelProvider(this.config_.serverUrl);

        window.addEventListener(EventType.TRACE_UPLOADED, this.traceUploaded.bind(this));
    }

    get html(): string {
        return `
            <div>
                <label>Upload a trace</label>
                <input id="file" type="file">
                <button id="submit" class="btn btn-outline-secondary btn-sm">Upload</button>
            </div>
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
        this.treeWidget_.inflate();
        this.enableDoubleClick();

        let fileElement = document.getElementById("file");
        let button = document.getElementById("submit");
        this.traceUploaderWidget_ = new TraceUploaderWidget(fileElement, button);
    }

    private traceUploaded() {
        this.treeWidget_.update();
    }

    private enableDoubleClick() {
        this.treeWidget_.onDoubleClick = async (treeModel: ITreeModel) => {
            let model = treeModel as ProjectExplorerModel;

            // This is a view
            if (model.viewer !== undefined) {
                window.dispatchEvent(new CustomEvent(EventType.VIEW_SELECTED, {
                    detail: {
                        model: model.viewer
                    }
                }));
            }
            else {
                let trace = await TraceManager.getInstance().openTrace(model.name, model.path);

                window.dispatchEvent(new CustomEvent(EventType.TRACE_CHANGED, {
                    detail: {
                        model: trace
                    }
                }));
            }
        };
    }
}
