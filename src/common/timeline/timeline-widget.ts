/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { SelectionTimeQueryFilter } from './../core/filter/selection-time-query-filter';
import { ITimelineModelProvider } from './../core/protocol/timeline-model-provider';
import { TimelineRowModel, TimelineArrow, TimelineEntry } from '../core/model/timeline-model';
import { TimeQueryFilter } from './../core/filter/time-query-filter';
import { InteractiveWidget } from '../base/interactive-widget';
import { Status } from './../core/protocol/model-response';
import { PixiTimelineChart } from './pixi-timeline-chart';
import { VisibleWindow } from './../base/visible-window';
import { Utils } from './../core/utils';
import { ITimelineChart } from '../base/timeline-chart';

export class TimelineWidget extends InteractiveWidget {

    private timelineChart_: ITimelineChart;
    private modelProvider_: ITimelineModelProvider;

    private visibleEntries_: TimelineEntry[];
    private rowModels_: TimelineRowModel[];
    private arrows_: TimelineArrow[];

    constructor(element: HTMLElement, modelProvider: ITimelineModelProvider) {
        super();
        this.timelineChart_ = new PixiTimelineChart(element);
        this.modelProvider_ = modelProvider;
        this.init();
    }

    set visibleEntries(visibleEntries: TimelineEntry[]) {
        this.visibleEntries_ = visibleEntries;
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
            status = await this.updateEvents();

            // TODO: Handle errors and cancellation
            switch (status) {
                case Status.FAILED:
                case Status.CANCELLED:
                case Status.COMPLETED:
                    completed = true;
                    break;
            }

            this.timelineChart_.redrawEvents(this.rowModels_);
            await Utils.wait(this.WAIT_BEFORE_REQUEST);
        } while (!completed);
    }


    private async updateEvents(): Promise<Status> {
        let filter: SelectionTimeQueryFilter = {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.min === this.visibleWindow_.max ? Utils.ETERNITY : this.visibleWindow_.max,
            count: this.visibleWindow_.count,
            items: this.visibleEntries_.map((entry) => entry.id)
        };

        let response = await this.modelProvider_.fetchEvents(filter);
        this.rowModels_ = response.model;
        return response.status;
    }

    private async updateArrows(): Promise<Status> {
        let filter: TimeQueryFilter = {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.max,
            count: this.visibleWindow_.count,
        };

        let response = await this.modelProvider_.fetchArrows(filter);
        this.arrows_ = <TimelineArrow[]> response.model;
        return response.status;
    }

    private init() {
        this.listenForRangeSelection();
        this.enableZoomByKeyboard();
        this.enablePanByKeyboard();
    }
}
