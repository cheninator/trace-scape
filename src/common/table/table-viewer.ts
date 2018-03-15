/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Grid } from 'ag-grid';
import { IShowable } from '../base/showable';
import { VirtualTableModel } from '../core/model/virtual-table-model';

export class TableViewer implements IShowable {

    private element_: HTMLElement;
    private tableModel_: VirtualTableModel;
    private grid_: Grid;

    constructor(element: HTMLElement) {
        this.element_ = element;
        this.init();
    }

    set tableModel(tableModel: VirtualTableModel) {
        this.tableModel_ = tableModel;
    }

    public update() {
        this.grid_ = new Grid(this.element_, this.buildGridOptions());
    }

    public show() {
        this.element_.style.display = 'block';
    }

    public hide() {
        this.element_.style.display = 'none';
    }

    private buildGridOptions() {
        let columnDefs = new Array();
        let rowData = new Array();

        /* Build the column definitions */
        for (let column in this.tableModel_.columns) {
            columnDefs.push({ headerName: column, field: column });
        }

        /* Build the row data */
        for (let i = 0; i < this.tableModel_.data.length; ++i) {
            let line = this.tableModel_.data[i];
            let row = {};
            for (let j = 0; j < columnDefs.length; ++j) {
                row[columnDefs[j].field] = line[j];
            }
            rowData.push(row);
        }

        return {
            columnDefs: columnDefs,
            rowData: rowData
        };
    }

    private init() {
        let gridOptions = {
            columnDefs: new Array(),
            rowData: new Array()
        };

        this.grid_ = new Grid(this.element_, gridOptions);
    }
}
