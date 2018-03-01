/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ITreeModelProvider } from '../core/protocol/tree-model-provider';
import { TimeQueryFilter } from './../core/filter/time-query-filter';
import { Status } from './../core/protocol/model-response';
import { VisibleWindow } from './../base/visible-window';
import { ITreeModel } from '../core/model/tree-model';
import { Widget } from '../base/widget';
import { Utils } from './../core/utils';

export class TreeWidget extends Widget {

    private element_: HTMLElement;
    private modelProvider_: ITreeModelProvider;
    private entries_: ITreeModel[] = new Array();

    constructor(element: HTMLElement, modelProvider: ITreeModelProvider) {
        super();
        this.element_ = element;
        this.modelProvider_ = modelProvider;
    }

    public inflate(visibleWindow?: VisibleWindow) {
        if (visibleWindow !== undefined) {
            this.visibleWindow_ = visibleWindow;
        }
        this.update();
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
            await Utils.wait(this.WAIT_BEFORE_REQUEST);
        } while (!completed);
    }

    private async updateTree() {
        let filter: TimeQueryFilter = {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.max,
            count: this.visibleWindow_.count,
        };

        let response = await this.modelProvider_.fetchTree(filter);
        this.entries_ = response.model;
        return response.status;
    }
}
