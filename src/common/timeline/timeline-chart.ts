/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TimelineViewModel } from './timeline-viewmodel';
import { colors } from './../ui/colors';
import { IChart } from './../base/IChart';

export class TimelineChart implements IChart {

    public graphicsContainer: PIXI.Container;
    private eventGraphics: Array<PIXI.Graphics>;
    private viewModel_: TimelineViewModel;

    private readonly colorMapping = {
        0: colors.DIM_GREY,
        1: colors.LA_RIOJA,
        2: colors.ISLAMIC_GREEN,
        3: colors.MEDIUM_BLUE,
        4: colors.RUBY,
        5: colors.TENNE,
        6: colors.VERY_LIGHT_GREY
    };

    constructor() {
        this.graphicsContainer = new PIXI.Container();
    }

    public draw() {
        this.clear();
        let visibleWindow = this.viewModel_.context;
        for (let event of this.viewModel_.events) {
            let eventGraphic = this.eventGraphics[event.entryID];
            for (let state of event.states) {
                let style = this.colorMapping[state.value];
                if (style !== undefined) {
                    let start = Math.max(state.startTime, visibleWindow.min);
                    let x = Math.round((start - visibleWindow.min) / visibleWindow.count);
                    let y = (event.entryID + 1) * 20;
                    let width = Math.round(state.duration / visibleWindow.count);
                    let height = 15;

                    eventGraphic.beginFill(style, 1);
                    eventGraphic.drawRect(x, y, width, height);
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
