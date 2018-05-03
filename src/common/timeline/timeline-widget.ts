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
import { EventType } from '../base/events';
import { ENGINE_METHOD_DIGESTS } from 'constants';
import { Coordinate } from '../base/position';

export class TimelineWidget extends InteractiveWidgetCached {

    private readonly ROW_MODELS_CACHE_SIZE = 100;
    private readonly ROW_MODELS_VISIBLE_SIZE = 25;

    private timelineChart_: ITimelineChart;
    private modelProvider_: ITimelineModelProvider;

    /* View models */
    private entries_: TimelineEntry[];
    private rowModels_: TimelineRowModel[];
    private arrows_: TimelineArrow[];

    private showArrows: boolean;

    /*
     * Used for virtualizing. The property rowModels_ contains more row models
     * than what is going to be shown. This is useful for vertical panning. No need to make
     * additional request to the server. The property firstVisibleEntry_ and lastVisibleEntry_
     * are indexes for slicing rowModels_ to pass it to the chart.
     */
    private firstCachedEntry: number;
    private lastCachedEntry: number;
    private firstVisibleEntry_: number;
    private lastVisibleEntry_: number;

    constructor(element: HTMLElement, modelProvider: ITimelineModelProvider) {
        super();

        this.timelineChart_ = new PixiTimelineChart(element);
        this.entries_ = new Array();
        this.rowModels_ = new Array();
        this.arrows_ = new Array();

        this.modelProvider_ = modelProvider;
        this.init(element);

        window.addEventListener(EventType.VISIBLE_ENTRIES_CHANGED, Utils.throttle(this.visibleEntriesChanged.bind(this), 100));
    }

    set entries(visibleEntries: TimelineEntry[]) {
        this.entries_ = visibleEntries;
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
        this.timelineChart_.redrawEvents(this.rowModels_.slice(this.firstVisibleEntry_, this.lastVisibleEntry_));
    }

    private async updateEvents(): Promise<Status> {
        let ids = this.entries_.map((entry) => entry.id).slice(this.firstCachedEntry, this.lastCachedEntry);

        let filter: SelectionTimeQueryFilter = {
            start: this.cachedVisibleWindow_.min,
            end: this.cachedVisibleWindow_.min === this.cachedVisibleWindow_.max ? Utils.ETERNITY : this.cachedVisibleWindow_.max,
            count: this.cachedVisibleWindow_.count,
            items: ids
        };

        let response = await this.modelProvider_.fetchEvents(filter);
        this.rowModels_ = response.model;

        // Reorder the row models according to entries
        this.rowModels_.sort((a: TimelineRowModel, b: TimelineRowModel) => {
            return ids.indexOf(a.entryID) - ids.indexOf(b.entryID);
        });

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

        this.firstVisibleEntry_ = 0;
        this.lastVisibleEntry_ = this.ROW_MODELS_VISIBLE_SIZE;
        this.firstCachedEntry = 0;
        this.lastCachedEntry = this.ROW_MODELS_CACHE_SIZE;

        this.listenForRangeSelection();
        this.listenForVisibleWindowChange();
        this.enableZoomByKeyboard();
        this.enablePanByKeyboard();

        this.initCache();
    }

    private visibleEntriesChanged(e: CustomEvent) {
        let position = e.detail.position as number;
        let entryWidth = e.detail.entryWidth as number;

        this.firstVisibleEntry_ = Math.round(position / entryWidth);
        this.lastVisibleEntry_ = this.firstVisibleEntry_ + this.ROW_MODELS_VISIBLE_SIZE;

        /* No need to query the server */
        if (this.firstCachedEntry <= this.firstVisibleEntry_ && this.lastVisibleEntry_ <= this.lastCachedEntry) {
            let offset = {
                x: 0,
                y: -1 * position % entryWidth
            } as Coordinate;
            this.timelineChart_.redrawEvents(this.rowModels_.slice(this.firstVisibleEntry_, this.lastVisibleEntry_), offset);
            this.refresh();
        }
        else {
            // TODO: Update firstVisibleEntry_ and lastVisibleEntry_
            this.update();
        }
    }
}
