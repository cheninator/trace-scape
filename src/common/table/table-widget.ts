/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Widget } from '../base/widget';
import { IVirtualTableModelProvider } from '../core/protocol/virtual-table-model-provider';
import { EventType } from './../base/events';
import { VisibleWindow } from './../base/visible-window';
import { VirtualTableQueryFilter } from './../core/filter/virtual-table-query-filter';
import { Status } from './../core/protocol/model-response';
import { Utils } from './../core/utils';
import { TableViewer } from './table-viewer';
import { VirtualTableModel, TableColumnModel } from '../core/model/virtual-table-model';

export class TableWidget extends Widget {

    private readonly DEFAULT_COUNT = 100;

    private modelProvider_: IVirtualTableModelProvider;
    private tableModel_: VirtualTableModel;
    private columnModel_: TableColumnModel[];

    private tableViewer_: TableViewer;

    constructor(element: HTMLElement, modelProvider: IVirtualTableModelProvider) {
        super();
        this.tableViewer_ = new TableViewer(element);
        this.modelProvider_ = modelProvider;
    }

    public inflate(visibleWindow?: VisibleWindow) {
        this.update();
    }

    public async update() {
        let completed = false;
        let status: Status;

        await this.updateColumns();
        do {
            status = await this.updateTable();

            // TODO: Handle errors and cancellation
            switch (status) {
                case Status.FAILED:
                case Status.CANCELLED:
                case Status.COMPLETED:
                    completed = true;
                    break;
            }

            this.tableViewer_.columnModel = this.columnModel_;
            this.tableViewer_.tableModel = this.tableModel_;
            this.tableViewer_.update();
            await Utils.wait(this.WAIT_BEFORE_REQUEST);
        } while (!completed);
    }

    public show() {
        this.tableViewer_.show();
    }

    public hide() {
        this.tableViewer_.hide();
    }

    private async updateColumns() {
        let response = await this.modelProvider_.fetchTree({
            start: this.modelProvider_.visibleRange.start,
            end: this.modelProvider_.visibleRange.end,
            count: 100
        });

        this.columnModel_ = response.model as TableColumnModel[];
    }

    private async updateTable() {
        let filter: VirtualTableQueryFilter = {
            index: 0,
            columns: new Array(),
            count: this.DEFAULT_COUNT
        };

        let response = await this.modelProvider_.fetchLines(filter);
        this.tableModel_ = response.model;
        return response.status;
    }
}
