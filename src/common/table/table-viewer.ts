/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Grid, GridOptions, Column } from 'ag-grid';
import { IShowable } from './../base/showable';
import { VirtualTableModel, TableColumnModel } from './../core/model/virtual-table-model';

export class TableViewer implements IShowable {

    private element_: HTMLElement;
    private tableModel_: VirtualTableModel;
    private columnModel_: TableColumnModel[];

    private grid_: Grid;
    private gridOptions_: GridOptions;

    constructor(element: HTMLElement) {
        this.element_ = element;
        this.init();
    }

    set columnModel(columnModel: TableColumnModel[]) {
        this.columnModel_ = columnModel;
    }

    set tableModel(tableModel: VirtualTableModel) {
        this.tableModel_ = tableModel;
    }

    public update() {
        let columnDefs = new Array();
        let rowData = new Array();

        /* Build the column definitions */
        for (let column of this.tableModel_.columnIds) {
            const col = this.columnModel_.filter(x => x.id === column)[0];
            if (col !== undefined) {
                columnDefs.push({ headerName: col.name, field: col.name });
            }
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

        this.gridOptions_.api.setColumnDefs(columnDefs);
        this.gridOptions_.api.setRowData(rowData);

        let columnsId = new Array();
        this.gridOptions_.columnApi.getAllColumns().forEach((column: Column) => {
            columnsId.push(column.getId());
        });
        this.gridOptions_.columnApi.autoSizeColumns(columnsId);

        this.gridOptions_.api.refreshCells();
    }

    public show() {
        this.element_.style.display = 'block';
    }

    public hide() {
        this.element_.style.display = 'none';
    }

    private init() {
        this.gridOptions_ = {
            enableColResize: true,
            columnDefs: new Array(),
            rowData: new Array()
        };

        this.grid_ = new Grid(this.element_, this.gridOptions_);
    }
}
