/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TimelineViewModel } from './timeline-viewmodel';
import { TimelinePresentation } from './timeline-presentation';
import { colors } from './../ui/colors';
import { IChart } from './../base/IChart';

export class TimelineChart implements IChart {

    public graphicsContainer: PIXI.Container;
    private eventGraphics: Array<PIXI.Graphics>;

    private viewModel_: TimelineViewModel;
    private timelinePresentation_: TimelinePresentation;

    constructor() {
        this.graphicsContainer = new PIXI.Container();
        this.timelinePresentation_ = new TimelinePresentation();
    }

    public draw() {
        this.clear();
        let visibleWindow = this.viewModel_.context;
        for (let event of this.viewModel_.events) {
            let eventGraphic = this.eventGraphics[event.entryID];
            
            for (let state of event.states) {
                let color = this.timelinePresentation_.getColorOfState(state.value);
                if (color !== undefined) {
                    let resolution = (visibleWindow.max - visibleWindow.min) / visibleWindow.count;
                    let start = Math.max(state.startTime, visibleWindow.min);
                    let x = Math.round((start - visibleWindow.min) / resolution);
                    let y = (event.entryID + 1) * 20;
                    let width = Math.round(state.duration / resolution);

                    eventGraphic.beginFill(color, 1);
                    eventGraphic.drawRect(x, y, width, this.timelinePresentation_.getThicknessOfState(state.value));
                    eventGraphic.endFill();
                }
            }
        }
    }

    public clear() {
        if (this.eventGraphics !== undefined) {
            this.eventGraphics.forEach((e: PIXI.Graphics) => e.clear());
        }
    }

    set model(model: TimelineViewModel) {
        if (model !== undefined) {
            this.viewModel_ = model;

            this.eventGraphics = new Array(this.viewModel_.entries.length);
            this.graphicsContainer.removeChildren();
            for (let i = 0; i < model.entries.length; ++i) {
                this.eventGraphics[i] = new PIXI.Graphics();
                this.graphicsContainer.addChild(this.eventGraphics[i]);
            }
        }
    }
}
