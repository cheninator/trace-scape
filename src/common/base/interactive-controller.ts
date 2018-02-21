/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as BigInteger from 'big-integer';
import { VisibleWindow } from './../visible-window';

export abstract class InteractiveController {

    private readonly ZOOM_PERCENT = 0.1;
    protected visibleWindow_: VisibleWindow;

    public abstract inflate(visibleWindow?: VisibleWindow): void;

    protected abstract update(): void;

    public zoomIn() {
        let max = BigInteger(this.visibleWindow_.max);
        let min = BigInteger(this.visibleWindow_.min);
        let delta = max.minus(min);

        this.visibleWindow_.max = min.plus(delta.times(1 - this.ZOOM_PERCENT)).toString();
        this.update();
    }

    public zoomOut() {
        let max = BigInteger(this.visibleWindow_.max);
        let min = BigInteger(this.visibleWindow_.min);
        let delta = max.minus(min);

        this.visibleWindow_.max = min.plus(delta.times(1 + this.ZOOM_PERCENT)).toString();
        this.update();
    }

    public panLeft() {
        let max = BigInteger(this.visibleWindow_.max);
        let min = BigInteger(this.visibleWindow_.min);
        let delta = max.minus(min).times(this.ZOOM_PERCENT);

        this.visibleWindow_.max = max.minus(delta).toString();
        this.visibleWindow_.max = min.minus(delta).toString();
        this.update();
    }

    public panRight() {
        let max = BigInteger(this.visibleWindow_.max);
        let min = BigInteger(this.visibleWindow_.min);
        let delta = max.minus(min).times(this.ZOOM_PERCENT);

        this.visibleWindow_.max = max.plus(delta).toString();
        this.visibleWindow_.max = min.plus(delta).toString();
        this.update();
    }
}
