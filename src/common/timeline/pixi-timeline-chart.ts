/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { EventType } from './../base/events';
import { TimelineRowModel, TimelineArrow, TimelineEntry } from './../core/model/timeline-model';
import { TimelinePresentation } from './timeline-presentation';
import { colors } from './../components/colors';
import { IDictionary, Dictionary } from './../core/dictionary';
import { VisibleWindow } from '../base/visible-window';
import { ITimelineChart } from '../base/timeline-chart';
import { PixiTimelineRuler } from './pixi-timeline-ruler';
import { Coordinate, ORIGIN } from '../base/position';

export class PixiTimelineChart implements ITimelineChart {

    private readonly entryHeight = 25;
    private context_: VisibleWindow;

    /* Used for mouse paning */
    private isDragging_: boolean;
    private oldPosition_: PIXI.Point;
    private originalPosition_: PIXI.Point;
    private data_: PIXI.interaction.InteractionData;

    private timelinePresentation_: TimelinePresentation;
    private timelineRuler_: PixiTimelineRuler;

    private application_: PIXI.Application;
    private htmlElement_: HTMLElement;
    private chartContainer_: PIXI.Container;

    private eventsGraphics_: PIXI.Graphics[];
    private arrowsGraphics_: PIXI.Graphics[];

    constructor(element: HTMLElement) {
        this.htmlElement_ = element;

        this.timelinePresentation_ = new TimelinePresentation();
        this.eventsGraphics_ = new Array();
        this.arrowsGraphics_ = new Array();

        this.init();
    }

    /*
     * This methods will draw row events in the same order as they appear in the array.
     */
    public drawEvents(events: TimelineRowModel[], offset?: Coordinate) {
        let yOffset = 0;
        if (offset !== undefined) {
            yOffset = offset.y;
        }

        while (this.eventsGraphics_.length < events.length) {
            let graphics = new PIXI.Graphics();
            this.eventsGraphics_.push(graphics);
            this.chartContainer_.addChild(graphics);
        }

        for (let i = 0; i < events.length; ++i) {
            let eventGraphic = this.eventsGraphics_[i];

            for (let state of events[i].states) {
                let color = this.timelinePresentation_.getColorOfState(state.value);
                if (color === undefined) {
                    continue;
                }
                let resolution = (this.context_.max - this.context_.min) / this.context_.count;
                let start = Math.max(state.startTime, this.context_.min);
                let rectHeight = this.timelinePresentation_.getThicknessOfState(state.value);

                let x = Math.round((start - this.context_.min) / resolution);
                let y = ((i + 1) * this.entryHeight) + ((this.entryHeight - rectHeight) / 2) + yOffset;
                let width = Math.round(state.duration / resolution);

                eventGraphic.beginFill(color, 1);
                eventGraphic.drawRect(x, y, width, rectHeight);
                eventGraphic.endFill();
            }
        }

        this.redrawRuler();
    }

    public redrawEvents(events: TimelineRowModel[], offset?: Coordinate) {
        this.clearEvents();
        this.drawEvents(events, offset);
    }

    public clear() {
        this.clearEvents();
        this.clearArrows();
    }

    public redrawArrows(arrows?: TimelineArrow[]): void {
        this.clearArrows();
        this.drawArrows();
    }

    public drawArrows(arrows?: TimelineArrow[]): void {
        throw new Error("Method not implemented.");
    }

    public clearEvents(): void {
        this.eventsGraphics_.forEach(e => e.clear());
    }

    public clearArrows(): void {
        this.arrowsGraphics_.forEach(e => e.clear());
    }

    private redrawRuler(): void {
        this.timelineRuler_.clear();
        this.timelineRuler_.draw();
    }

    set context(context: VisibleWindow) {
        this.context_ = context;
        this.timelineRuler_.context = context;
    }

    public show() {
        return;
    }

    public hide() {
        return;
    }

    private init() {
        let infos = this.htmlElement_.getBoundingClientRect();
        let options = {
            width: infos.width,
            height: infos.height,
            view: <HTMLCanvasElement> this.htmlElement_,
            antialias: false,
            backgroundColor : 0xffffff
        };

        this.application_ = new PIXI.Application(options);
        this.chartContainer_ = new PIXI.Container();
        this.chartContainer_.interactive = true;
        this.chartContainer_.on('pointerdown', this.onDragStart.bind(this))
                            .on('pointerup', this.onDragEnd.bind(this))
                            .on('pointerupoutside', this.onDragEnd.bind(this))
                            .on('pointermove', this.onDragMove.bind(this));

        this.timelineRuler_ = new PixiTimelineRuler(ORIGIN, options.width, options.height);

        this.application_.stage.addChild(this.timelineRuler_.container);
        this.application_.stage.addChild(this.chartContainer_);
    }

    private onDragStart(event: PIXI.interaction.InteractionEvent) {
        this.isDragging_ = true;
        this.data_ = event.data;
        this.oldPosition_ = this.data_.getLocalPosition(this.chartContainer_.parent);
        this.originalPosition_ = this.oldPosition_;
    }

    private onDragEnd(event: PIXI.interaction.InteractionEvent) {
        this.isDragging_ = false;
        this.data_ = null;

        let deltaX = this.oldPosition_.x - this.originalPosition_.x;
        this.oldPosition_ = null;

        let resolution = (this.context_.max - this.context_.min) / this.context_.count;
        let start = this.context_.min + (-1 * deltaX * resolution);
        let end = this.context_.max + (-1 * deltaX * resolution);

        this.chartContainer_.x -= deltaX;
        this.timelineRuler_.container.x -= deltaX;

        window.dispatchEvent(new CustomEvent(EventType.VISIBLE_WINDOW_CHANGED, {
            detail: {
                start: Math.round(start),
                end: Math.round(end)
            }
        }));
    }

    private onDragMove(event: PIXI.interaction.InteractionEvent) {
        if (this.isDragging_) {
            let newPosition = this.data_.getLocalPosition(event.currentTarget.parent);
            let deltaX = newPosition.x - this.oldPosition_.x;

            this.chartContainer_.x += deltaX;
            this.timelineRuler_.container.x += deltaX;
            this.oldPosition_ = newPosition;
        }
    }
}
