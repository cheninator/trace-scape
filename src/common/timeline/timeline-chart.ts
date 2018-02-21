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
import { IChart } from './../base/chart';
import { IDictionary, Dictionary } from './../base/dictionary';

import * as BigInteger from 'big-integer';

export class TimelineChart implements IChart {

    public graphicsContainer: PIXI.Container;

    private viewModel_: TimelineViewModel;
    private timelinePresentation_: TimelinePresentation;
    private rows_: IDictionary<PIXI.Graphics>;

    private nbRows_: number;

    constructor(height: number) {
        this.graphicsContainer = new PIXI.Container();
        this.timelinePresentation_ = new TimelinePresentation();
        this.rows_ = new Dictionary();

        /* This is arbitrary for the moment */
        this.nbRows_ = height / 10;
    }

    public draw() {
        this.clear();
        let visibleWindow = this.viewModel_.context;

        let i = 1;
        for (let event of this.viewModel_.events) {
            let eventGraphic = this.rows_.get(event.entryID.toString());
            if (eventGraphic === undefined) {
                continue;
            }
            console.log(event);
            for (let state of event.states) {
                let color = this.timelinePresentation_.getColorOfState(state.value);
                if (color !== undefined) {
                    let max = BigInteger(visibleWindow.max);
                    let min = BigInteger(visibleWindow.min);
                    let resolution = max.minus(min).divide(visibleWindow.count);

                    let start = BigInteger.max(min, BigInteger(state.startTime));
                    let x = start.minus(min).divide(resolution);
                    let y = (i + 1) * 20;
                    let duration = BigInteger(state.duration);
                    let width = duration.divide(resolution);

                    eventGraphic.beginFill(color, 1);
                    eventGraphic.drawRect(x.toJSNumber(), y, width.toJSNumber(), this.timelinePresentation_.getThicknessOfState(state.value));
                    eventGraphic.endFill();
                }
            }
            ++i;
        }
    }

    public clear() {
        this.rows_.values().forEach(e => e.clear());
    }

    set model(model: TimelineViewModel) {
        if (model === undefined) {
            return;
        }

        this.viewModel_ = model;
        this.rows_.clear();
        console.log(this.viewModel_.entries);
        console.log(this.viewModel_.events);

        let max = this.viewModel_.entries.reduce((prev, curr) => {
            return prev.id > curr.id ? prev : curr;
        });

        let sorted: number[][] = new Array(max.id + 1);
        for (let i = 0; i < sorted.length; ++i) {
            sorted[i] = new Array();
        }

        for (let tree of this.viewModel_.entries) {
            if (tree.parentId !== -1) {
                sorted[tree.parentId].push(tree.id);
            }
        }

        for (let j = 0; j < sorted.length; ++j) {
            if (sorted[j].length !== 0) {
                if (this.rows_.count() < this.nbRows_) {
                    this.buildTree(j, sorted);
                }
            }
        }
        console.log(sorted);
        console.log(this.rows_);
    }

    private buildTree(nodeId: number, sorted: number[][]) {
        if (this.rows_.count() < this.nbRows_) {
            let graphics = new PIXI.Graphics();
            this.rows_.add(nodeId.toString(), graphics);
            this.graphicsContainer.addChild(graphics);

            for (let child of sorted[nodeId]) {
                if (this.rows_.count() < this.nbRows_) {
                    this.buildTree(child, sorted);
                }
                return;
            }
        }
    }
}
