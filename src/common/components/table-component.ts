/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as GoldenLayout from 'golden-layout';

import { EventTableModelProvider } from './../core/protocol/tables/event-table-model-provider';
import { BaseGoldenLayoutComponent } from './component';
import { ConfigComponent } from './config-component';
import { Trace } from './../core/model/trace';
import { EventType } from './../base/events';
import { Utils } from './../core/utils';
import { TableWidget } from '../table/table-widget';
import { IVirtualTableModelProvider } from '../core/protocol/virtual-table-model-provider';
import { TableModelProviderFactory } from './../core/protocol/tables/table-model-provider-factory';

export class TableComponent extends BaseGoldenLayoutComponent {

    private tableWidget_: TableWidget;
    private modelProvider_: IVirtualTableModelProvider;

    constructor(config: ConfigComponent, trace: Trace) {
        super(config);
        this.modelProvider_ = TableModelProviderFactory.create(this.config_.serverUrl, trace, this.config_.id);
    }

    get html(): string {
        return `
            <div id="${this.config_.id}" style="width: 100%; height: 100%" class="ag-theme-balham"></div>
        `;
    }

    public show() {
        this.tableWidget_ = new TableWidget(document.getElementById(this.config_.id), this.modelProvider_);
        this.tableWidget_.inflate();
    }
}
