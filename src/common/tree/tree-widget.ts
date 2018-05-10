/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Widget } from '../base/widget';
import { ITreeModel } from '../core/model/tree-model';
import { ITreeModelProvider } from '../core/protocol/tree-model-provider';
import { EventType } from './../base/events';
import { VisibleWindow } from './../base/visible-window';
import { TimeQueryFilter } from './../core/filter/time-query-filter';
import { Status } from './../core/protocol/model-response';
import { Utils } from './../core/utils';
import { TreeViewer } from './tree-viewer';

export class TreeWidget extends Widget {

    private modelProvider_: ITreeModelProvider;
    private entries_: ITreeModel[] = new Array();

    private treeViewer_: TreeViewer;

    constructor(element: HTMLElement, modelProvider: ITreeModelProvider) {
        super();
        this.treeViewer_ = new TreeViewer(element);
        this.modelProvider_ = modelProvider;

        let box = element.getBoundingClientRect();
        this.visibleWindow_.max = Utils.ETERNITY;
        this.visibleWindow_.count = Math.floor(box.width);
    }

    set onDoubleClick(onDoubleClick: (node: ITreeModel) => void) {
        this.treeViewer_.onDoubleClick = onDoubleClick;
    }

    public async update() {
        let completed = false;
        let status: Status;

        do {
            status = await this.updateTree();

            // TODO: Handle errors and cancellation
            switch (status) {
                case Status.FAILED:
                case Status.CANCELLED:
                case Status.COMPLETED:
                    completed = true;
                    break;
            }

            let event = `${EventType.TREE_MODEL_CHANGED}-${this.modelProvider_.id}`;
            window.dispatchEvent(new CustomEvent(event, {
                detail: {
                    model: this.entries_
                }
            }));
            this.treeViewer_.update();
            await Utils.wait(this.WAIT_BEFORE_REQUEST);
        } while (!completed);
    }

    public show() {
        this.treeViewer_.show();
    }

    public hide() {
        this.treeViewer_.hide();
    }

    public getNodes(count: number) {
        return this.treeViewer_.getNodes(count);
    }

    public getAllNodes() {
        return this.treeViewer_.getAllNodes();
    }

    public expandAll() {
        this.treeViewer_.expandAll();
    }

    public resetVisibleWindow() {
        this.visibleWindow_.min = this.modelProvider_.visibleRange.start;
        this.visibleWindow_.max = this.modelProvider_.visibleRange.end;
    }

    private async updateTree() {
        let filter: TimeQueryFilter = {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.max,
            count: this.visibleWindow_.count,
        };

        let response = await this.modelProvider_.fetchTree(filter);
        this.entries_ = response.model;
        this.treeViewer_.treeModel = this.entries_;
        return response.status;
    }
}
