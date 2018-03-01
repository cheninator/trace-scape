/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { VisibleWindow } from './../base/visible-window';
import { EventType } from './../base/events';
import { Key } from './../base/key';
import { Widget } from './widget';

export abstract class InteractiveWidget extends Widget {

    private readonly ZOOM_PERCENT = 0.1;

    /* Key bindings */
    private plus_: Key;
    private minus_: Key;
    private left_: Key;
    private right_: Key;

    constructor() {
        super();
        this.visibleWindow_ = {
            min: Number.MIN_SAFE_INTEGER,
            max: Number.MAX_SAFE_INTEGER,
            count: 1
        };
    }

    public zoomIn() {
        let delta = this.visibleWindow_.max - this.visibleWindow_.min;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.min + (delta * (1 - this.ZOOM_PERCENT)));
        this.update();
    }

    public zoomOut() {
        let delta = this.visibleWindow_.max - this.visibleWindow_.min;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.min + (delta * (1 + this.ZOOM_PERCENT)));
        this.update();
    }

    public panLeft() {
        let delta = (this.visibleWindow_.max - this.visibleWindow_.min) * this.ZOOM_PERCENT;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.max - delta);
        this.visibleWindow_.min = Math.round(this.visibleWindow_.min - delta);
        this.update();
    }

    public panRight() {
        let delta = (this.visibleWindow_.max - this.visibleWindow_.min) * this.ZOOM_PERCENT;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.max + delta);
        this.visibleWindow_.min = Math.round(this.visibleWindow_.min + delta);
        this.update();
    }

    protected enableZoomByKeyboard(plus?: number, minus?: number) {
        this.plus_ = new Key(107);
        this.plus_.press = this.zoomIn.bind(this);

        this.minus_ = new Key(109);
        this.minus_.press = this.zoomOut.bind(this);
    }

    protected enablePanByKeyboard(left?: number, right?: number) {
        this.left_ = new Key(37);
        this.left_.press = this.panLeft.bind(this);

        this.right_ = new Key(39);
        this.right_.press = this.panRight.bind(this);
    }

    protected listenForRangeSelection() {
        window.addEventListener(EventType.RANGE_SELECTED, this.rangeSelected.bind(this));
    }

    private rangeSelected(e: CustomEvent) {
        this.visibleWindow_.min = e.detail.start;
        this.visibleWindow_.max = e.detail.end;
        this.update();
    }
}
