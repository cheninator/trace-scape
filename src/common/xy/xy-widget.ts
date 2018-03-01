/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { SelectionTimeQueryFilter } from './../core/filter/selection-time-query-filter';
import { IXYModelProvider } from './../core/protocol/xy-model-provider';
import { InteractiveWidget } from './../base/interactive-widget';
import { XYEntries, XYSeries } from './../core/model/xy-model';
import { Status } from './../core/protocol/model-response';
import { VisibleWindow } from './../base/visible-window';
import { XYLineChart } from './xy-line-chart';
import { IXYChart } from './../base/xy-chart';
import { Utils } from './../core/utils';

export class XYWidget extends InteractiveWidget {

    private xyChart_: IXYChart;
    private modelProvider_: IXYModelProvider;

    private xySeries: XYSeries[];
    private selectedEntries_: XYEntries[] = new Array();

    constructor(element: HTMLElement, modelProvider: IXYModelProvider) {
        super();

        this.xyChart_ = new XYLineChart(element);
        this.modelProvider_ = modelProvider;
        this.init();
    }

    set selectedEntries(selectedEntries: XYEntries[]) {
        this.selectedEntries_ = selectedEntries;
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
            status = await this.updateXY();

            // TODO: Handle errors and cancellation
            switch (status) {
                case Status.FAILED:
                case Status.CANCELLED:
                case Status.COMPLETED:
                    completed = true;
                    break;
            }

            this.xyChart_.redraw(this.xySeries);
            await Utils.wait(this.WAIT_BEFORE_REQUEST);
        } while (!completed);
    }

    private async updateXY(): Promise<Status> {
        let filter: SelectionTimeQueryFilter = {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.min === this.visibleWindow_.max ? Utils.ETERNITY : this.visibleWindow_.max,
            count: this.visibleWindow_.count,
            items: this.selectedEntries_.map((entry) => entry.id)
        };

        let response = await this.modelProvider_.fetchXY(filter);
        this.xySeries = response.model;
        return response.status;
    }

    private init() {
        this.listenForRangeSelection();
        this.enableZoomByKeyboard();
        this.enablePanByKeyboard();
    }
}
