/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TimelineViewModel, TimelineEntry } from './timeline-viewmodel';
import { ITimelineModelProvider } from './../protocol/timeline-model-provider';
import { TimelineRequestFilter } from './../filter/timeline-request-filter';
import { BaseRequestFilter } from './../filter/base-request-filter';
import { VisibleWindow } from './../visible-window';
import { eventType } from './../events';
import { Utils } from './../utils';
import { Key } from './../key';
import { ModelResponse } from '../protocol/model-response';

export class TimelineController {

    private modelProvider_: ITimelineModelProvider;
    private visibleWindow_: VisibleWindow;
    private viewModel_: TimelineViewModel;

    /* Key bindings */
    private plus_: Key;
    private minus_: Key;
    private left_: Key;
    private right_: Key;

    constructor(viewWidth: number, modelProvider: ITimelineModelProvider) {
        this.modelProvider_ = modelProvider;
        this.visibleWindow_ = {
            min: this.modelProvider_.trace.start,
            max: this.modelProvider_.trace.end,
            count: viewWidth
        };

        this.initKeys();
        window.addEventListener(eventType.RANGE_SELECTED, this.rangeSelected.bind(this));
        window.addEventListener(eventType.RESET_RANGE, this.resetRange.bind(this));
    }

    public async inflate(visibleWindow?: VisibleWindow) {
        if (visibleWindow !== undefined) {
            this.visibleWindow_ = visibleWindow;
        }

        await this.updateTree();

        let events = await this.modelProvider_.fetchEvents(<TimelineRequestFilter> {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.max,
            count: this.visibleWindow_.count,
            entries: this.viewModel_.entries.map((entry) => entry.id)
        });

        this.viewModel_.events = events.model;
        window.dispatchEvent(new Event(eventType.TIMEGRAPH_CHANGED));
    }
    
    get viewModel() {
        return this.viewModel_;
    }

    private async updateTree() {
        let filter: BaseRequestFilter = {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.max,
            count: this.visibleWindow_.count,
        };

        let response = await this.modelProvider_.fetchEntries(filter);
        if (this.viewModel_ === undefined) {
            this.viewModel_ = {
                entries: response.model,
                events: new Array(),
                arrows: new Array(),
                context: this.visibleWindow_
            };
        } else {
            this.viewModel_.entries = response.model;
        }
    }

    private async updateViewModelEvents() {
        let filter: TimelineRequestFilter = {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.max,
            count: this.visibleWindow_.count,
            entries: this.viewModel_.entries.map((entry) => entry.id)
        };

        let response = await this.modelProvider_.fetchEvents(filter);
        this.viewModel_.events = response.model;
        window.dispatchEvent(new Event(eventType.TIMEGRAPH_CHANGED));
    }

    private resetRange(e: CustomEvent) {
        this.visibleWindow_.min = this.modelProvider_.trace.start;
        this.visibleWindow_.max = this.modelProvider_.trace.end;
        this.updateViewModelEvents();
    }

    private rangeSelected(e: CustomEvent) {
        this.visibleWindow_.min = e.detail.start.x;
        this.visibleWindow_.max = e.detail.end.x;
        this.updateViewModelEvents();
    }

    public zoomIn() {
        let delta = this.visibleWindow_.max - this.visibleWindow_.min;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.min + (delta * 0.95));
        this.updateViewModelEvents();
    }

    public zoomOut() {
        let delta = this.visibleWindow_.max - this.visibleWindow_.min;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.min + (delta * 1.05));
        this.updateViewModelEvents();
    }

    public panLeft() {
        let delta = (this.visibleWindow_.max - this.visibleWindow_.min) * 0.05;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.max - delta);
        this.visibleWindow_.min = Math.round(this.visibleWindow_.min - delta);
        this.updateViewModelEvents();
    }

    public panRight() {
        let delta = (this.visibleWindow_.max - this.visibleWindow_.min) * 0.05;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.max + delta);
        this.visibleWindow_.min = Math.round(this.visibleWindow_.min + delta);
        this.updateViewModelEvents();
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
