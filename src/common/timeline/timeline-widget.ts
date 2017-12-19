/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ITimelineModelProvider } from './../protocol/timeline-model-provider';
import { TimelineController } from './timeline-controller';
import { TimelineChart } from './timeline-chart';
import { TimelineRuler } from './timeline-ruler';
import { colors } from './../ui/colors';
import { eventType } from './../events';

export class TimelineWidget {

    private application_: PIXI.Application;
    private timelineController_: TimelineController;
    private timelineRuler_: TimelineRuler;
    private timelineChart_: TimelineChart;

    constructor(id: string, modelProvider: ITimelineModelProvider) {
        let canvas = <HTMLCanvasElement> document.getElementById(id);
        let options = {
            width: canvas.width,
            height: canvas.height,
            view: canvas,
            antialias: false,
            backgroundColor : 0x222222
        };

        this.application_ = new PIXI.Application(options);

        this.timelineController_ = new TimelineController(canvas.width, modelProvider);
        this.timelineChart_ = new TimelineChart(canvas.height);
        this.timelineRuler_ = new TimelineRuler(0, 0, canvas.width, canvas.height);

        window.addEventListener(eventType.TIMEGRAPH_CHANGED, this.viewModelChanged.bind(this));

        this.application_.stage.addChild(this.timelineRuler_.rulerContainer_);
        this.application_.stage.addChild(this.timelineChart_.graphicsContainer);
    }

    public inflate() {
        this.timelineController_.inflate();
    }

    private viewModelChanged(e: Event) {
        if (this.timelineController_.viewModel !== undefined) {
            this.timelineChart_.model = this.timelineController_.viewModel;
            this.timelineChart_.draw();

            this.timelineRuler_.context = this.timelineController_.viewModel.context;
            this.timelineRuler_.draw();
        }
    }
}
