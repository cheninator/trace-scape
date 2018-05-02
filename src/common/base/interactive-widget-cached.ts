/*
* Copyright (C) 2018 École Polytechnique de Montréal
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import { InteractiveWidget } from "./interactive-widget";
import { VisibleWindow } from './../base/visible-window';

/*
 * This is used for caching. Instead of always querying the server, the widget keeps more model
 * and panning operation won't need to make call to the server. Only zooming still need to query
 * the server.
 */
export abstract class InteractiveWidgetCached extends InteractiveWidget {

    protected cachedVisibleWindow_: VisibleWindow;
    private readonly CACHE_PERCENT = 0.3;

    constructor() {
        super();
        this.initCache();
    }

    public abstract refresh(): void;

    public zoomIn() {
        let delta = this.visibleWindow_.max - this.visibleWindow_.min;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.min + (delta * (1 - this.ZOOM_PERCENT)));
        this.initCache();
        this.update();
    }

    public zoomOut() {
        let delta = this.visibleWindow_.max - this.visibleWindow_.min;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.min + (delta * (1 + this.ZOOM_PERCENT)));
        this.initCache();
        this.update();
    }

    public panLeft() {
        let delta = (this.visibleWindow_.max - this.visibleWindow_.min) * this.ZOOM_PERCENT;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.max - delta);
        this.visibleWindow_.min = Math.round(this.visibleWindow_.min - delta);
        this.updateOrRefresh();
    }

    public panRight() {
        let delta = (this.visibleWindow_.max - this.visibleWindow_.min) * this.ZOOM_PERCENT;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.max + delta);
        this.visibleWindow_.min = Math.round(this.visibleWindow_.min + delta);
        this.updateOrRefresh();
    }

    protected rangeSelected(e: CustomEvent) {
        this.visibleWindow_.min = e.detail.start;
        this.visibleWindow_.max = e.detail.end;
        this.initCache();
        this.update();
    }

    protected visibleWindowChanged(e: CustomEvent) {
        this.visibleWindow_.min = e.detail.start;
        this.visibleWindow_.max = e.detail.end;
        this.updateOrRefresh();
    }

    protected initCache() {
        let points = (this.visibleWindow_.count - 1);
        let additionalPoints = points * this.CACHE_PERCENT;
        let step = (this.visibleWindow_.max - this.visibleWindow_.min) / points;

        this.cachedVisibleWindow_ = {
            min: Math.round(this.visibleWindow_.min - (additionalPoints / 2 * step)),
            max: Math.round(this.visibleWindow_.max + (additionalPoints / 2 * step)),
            count: Math.round(this.visibleWindow_.count + additionalPoints)
        } as VisibleWindow;
    }

    private updateOrRefresh() {
        if (this.visibleWindow_.min < this.cachedVisibleWindow_.max && this.visibleWindow_.max < this.cachedVisibleWindow_.max) {
            this.refresh();
        } else {
            this.initCache();
            this.update();
        }
    }
}
