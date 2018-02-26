/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { VisibleWindow } from './../visible-window';

export abstract class InteractiveController {

    private readonly ZOOM_PERCENT = 0.1;
    protected visibleWindow_: VisibleWindow;

    constructor() {
        this.visibleWindow_ = {
            min: Number.MIN_SAFE_INTEGER,
            max: Number.MAX_SAFE_INTEGER,
            count: 1
        };
    }

    public abstract inflate(visibleWindow?: VisibleWindow): void;

    protected abstract update(): void;

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
}
