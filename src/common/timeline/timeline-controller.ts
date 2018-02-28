/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TimelineViewModel, TimelineEntry, TimelineArrow } from './../core/model/timeline-model';
import { InteractiveWidget } from './../base/interactive-widget';
import { ITimelineModelProvider } from './../core/protocol/timeline-model-provider';
import { SelectionTimeQueryFilter } from './../core/filter/selection-time-query-filter';
import { TimeQueryFilter } from './../core/filter/time-query-filter';
import { ModelResponse } from './../core/protocol/model-response';
import { Status } from './../core/protocol/model-response';
import { VisibleWindow } from './../visible-window';
import { eventType } from './../events';
import { Utils } from './../core/utils';
import { Key } from './../key';


export class TimelineController extends InteractiveWidget {

    private readonly WAIT_BEFORE_REQUEST = 700;

    private modelProvider_: ITimelineModelProvider;
    private viewModel_: TimelineViewModel;

    /* Key bindings */
    private plus_: Key;
    private minus_: Key;
    private left_: Key;
    private right_: Key;

    constructor(viewWidth: number, modelProvider: ITimelineModelProvider) {
        super();
        this.modelProvider_ = modelProvider;
        this.visibleWindow_ = {
            min: this.modelProvider_.trace.start,
            max: this.modelProvider_.trace.end,
            count: viewWidth
        };
        this.viewModel_ = {
            entries: new Array(),
            events: new Array(),
            arrows: new Array()
        };

        this.initKeys();
        window.addEventListener(eventType.RANGE_SELECTED, this.rangeSelected.bind(this));
        window.addEventListener(eventType.RESET_RANGE, this.resetRange.bind(this));
    }

    public inflate(visibleWindow?: VisibleWindow) {
        if (visibleWindow !== undefined) {
            this.visibleWindow_ = visibleWindow;
        }
        this.update();
    }

    get viewModel() {
        return this.viewModel_;
    }

    get context() {
        return this.visibleWindow_;
    }

    protected async update() {
        let treeComplete = false;
        let eventComplete = false;
        let treeStatus: Status, eventStatus: Status;

        do {
            if (!treeComplete) {
                treeStatus = await this.updateTree();
                treeComplete = (treeStatus === Status.COMPLETED);
            }

            if (!eventComplete) {
                eventStatus = await this.updateEvents();
                eventComplete = (treeStatus === Status.COMPLETED);
            }

            window.dispatchEvent(new Event(eventType.TIMEGRAPH_CHANGED));
            await Utils.wait(this.WAIT_BEFORE_REQUEST);
        } while (!(treeComplete && eventComplete));
    }

    private async updateTree(): Promise<Status> {
        let filter: TimeQueryFilter = {
            start: this.visibleWindow_.min,
            end: Utils.ETERNITY,
            count: this.visibleWindow_.count,
        };

        let response = await this.modelProvider_.fetchTree(filter);
        this.viewModel_.entries = <TimelineEntry[]> response.model;
        return response.status;
    }

    private async updateEvents(): Promise<Status> {
        let filter: SelectionTimeQueryFilter = {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.min === this.visibleWindow_.max ? Utils.ETERNITY : this.visibleWindow_.max,
            count: this.visibleWindow_.count,
            items: this.viewModel_.entries.map((entry) => entry.id)
        };

        let response = await this.modelProvider_.fetchEvents(filter);
        this.viewModel_.events = response.model;
        return response.status;
    }

    private async updateArrows(): Promise<Status> {
        let filter: TimeQueryFilter = {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.max,
            count: this.visibleWindow_.count,
        };

        let response = await this.modelProvider_.fetchArrows(filter);
        this.viewModel_.arrows = <TimelineArrow[]> response.model;
        return response.status;
    }

    private resetRange(e: CustomEvent) {
        this.visibleWindow_.min = this.modelProvider_.trace.start;
        this.visibleWindow_.max = this.modelProvider_.trace.end;
        this.update();
    }

    private rangeSelected(e: CustomEvent) {
        this.visibleWindow_.min = e.detail.start;
        this.visibleWindow_.max = e.detail.end;
        this.update();
    }

    private initKeys() {
        this.plus_ = new Key(107);
        this.plus_.press = this.zoomIn.bind(this);

        this.minus_ = new Key(109);
        this.minus_.press = this.zoomOut.bind(this);

        this.left_ = new Key(37);
        this.left_.press = this.panLeft.bind(this);

        this.right_ = new Key(39);
        this.right_.press = this.panRight.bind(this);
    }
}
