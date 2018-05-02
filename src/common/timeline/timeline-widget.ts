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
import { InteractiveWidgetCached } from '../base/interactive-widget-cached';
import { Status } from './../core/protocol/model-response';
import { PixiTimelineChart } from './pixi-timeline-chart';
import { VisibleWindow } from './../base/visible-window';
import { Utils } from './../core/utils';
import { ITimelineChart } from '../base/timeline-chart';

export class TimelineWidget extends InteractiveWidgetCached {

    private timelineChart_: ITimelineChart;
    private modelProvider_: ITimelineModelProvider;

    /* View models */
    private visibleEntries_: TimelineEntry[];
    private rowModels_: TimelineRowModel[];
    private arrows_: TimelineArrow[];

    private showArrows: boolean;

    constructor(element: HTMLElement, modelProvider: ITimelineModelProvider) {
        super();

        this.timelineChart_ = new PixiTimelineChart(element);
        this.visibleEntries_ = new Array();
        this.rowModels_ = new Array();
        this.arrows_ = new Array();

        this.modelProvider_ = modelProvider;
        this.init(element);
    }

    set visibleEntries(visibleEntries: TimelineEntry[]) {
        this.visibleEntries_ = visibleEntries;
    }

    public async update() {
        let completed = false;
        let status: Status;

        this.timelineChart_.context = this.visibleWindow_;
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

            if (this.showArrows) {
                let statusArrows = await this.updateArrows();
                this.timelineChart_.redrawArrows(this.arrows_);
            }

            await Utils.wait(this.WAIT_BEFORE_REQUEST);
        } while (!completed);
    }

    public resetVisibleWindow() {
        this.visibleWindow_.min = this.modelProvider_.visibleRange.start;
        this.visibleWindow_.max = this.modelProvider_.visibleRange.end;
    }

    public refresh() {
        this.timelineChart_.context = this.visibleWindow_;
        this.timelineChart_.redrawEvents(this.rowModels_);
    }

    private async updateEvents(): Promise<Status> {
        let filter: SelectionTimeQueryFilter = {
            start: this.cachedVisibleWindow_.min,
            end: this.cachedVisibleWindow_.min === this.cachedVisibleWindow_.max ? Utils.ETERNITY : this.cachedVisibleWindow_.max,
            count: this.cachedVisibleWindow_.count,
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

    private init(element: HTMLElement) {
        let box = element.getBoundingClientRect();
        this.visibleWindow_.min = this.modelProvider_.visibleRange.start;
        this.visibleWindow_.max = this.modelProvider_.visibleRange.end;
        this.visibleWindow_.count = Math.floor(box.width);

        this.listenForRangeSelection();
        this.listenForVisibleWindowChange();
        this.enableZoomByKeyboard();
        this.enablePanByKeyboard();

        this.initCache();
    }
}
