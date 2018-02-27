/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ITimelineModelProvider } from './../core/protocol/timeline-model-provider';
import { TimelineController } from './timeline-controller';
import { TimelineChart } from './timeline-chart';
import { TimelineRuler } from './timeline-ruler';
import { colors } from './../ui/colors';
import { eventType } from './../events';
import { TreeWidget } from '../base/tree-widget';

export class TimelineWidget {

    private application_: PIXI.Application;
    private timelineController_: TimelineController;
    private timelineRuler_: TimelineRuler;
    private timelineChart_: TimelineChart;

    private treeWidget_: TreeWidget;

    constructor(element: HTMLElement, modelProvider: ITimelineModelProvider) {
        let canvas = <HTMLCanvasElement> element;
        let options = {
            width: canvas.width,
            height: canvas.height,
            view: canvas,
            antialias: false,
            backgroundColor : 0xffffff
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

    set treeWidget(tree: TreeWidget) {
        this.treeWidget_ = tree;
    }

    private viewModelChanged(e: Event) {
        if (this.timelineController_.viewModel !== undefined) {
            this.timelineChart_.model = this.timelineController_.viewModel;
            this.timelineChart_.context = this.timelineController_.context;
            this.timelineChart_.draw();

            this.timelineRuler_.context = this.timelineController_.context;
            this.timelineRuler_.draw();

            this.treeWidget_.treeModel = this.timelineController_.viewModel.entries;
        }
    }
}
