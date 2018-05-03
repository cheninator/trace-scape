/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { colors } from './../components/colors';
import { VisibleWindow } from './../base/visible-window';
import { TimeFormatter } from './../core/formatter/time-formatter';
import { Coordinate } from '../base/position';

export class PixiTimelineRuler {

    private readonly entryHeight = 25;
    private readonly lineWidth = 1;
    private readonly textStyle = new PIXI.TextStyle({
        fill: colors.BLACK,
        fontSize: 13
    });

    private rulerContainer_: PIXI.Container;
    private rulerGraphics_: PIXI.Graphics;
    private context_: VisibleWindow;

    /* Width in pixel of the ruler */
    private width_: number;
    /* Heigth in pixel of the canvas used to draw the events */
    private heigth_: number;

    /* X and Y offset of the ruler */
    private offset_: Coordinate;

    constructor(offset: Coordinate, width: number, heigth: number) {
        this.rulerContainer_ = new PIXI.Container();
        this.rulerGraphics_ = new PIXI.Graphics();

        this.offset_ = offset;
        this.width_ = width;
        this.heigth_ = heigth;
    }

    get container() {
        return this.rulerContainer_;
    }

    set context(context: VisibleWindow) {
        this.context_ = context;
    }

    public clear() {
        this.rulerGraphics_.clear();
    }

    public draw() {
        this.clear();
        this.rulerGraphics_.lineStyle(this.lineWidth, colors.BLACK);
        this.rulerGraphics_.moveTo(this.offset_.x, this.offset_.y + (this.entryHeight * 0.75));
        this.rulerGraphics_.lineTo(this.offset_.x + this.width_, this.offset_.y + (this.entryHeight * 0.75));

        let numberOfDelimitation = 5;
        let delta = this.width_ / numberOfDelimitation;

        this.rulerContainer_.removeChildren();
        for (let i = 0; i < numberOfDelimitation; ++i) {
            this.drawSeparation(this.offset_.x + i * delta, this.heigth_);
        }
        this.rulerContainer_.addChild(this.rulerGraphics_);
    }

    private drawSeparation(start: number, height: number) {
        this.rulerGraphics_.lineStyle(this.lineWidth, colors.BLACK);
        this.rulerGraphics_.moveTo(start, this.offset_.y);
        this.rulerGraphics_.lineTo(start, height);

        let resolution = (this.context_.max - this.context_.min) / this.context_.count;
        let time = TimeFormatter.fromNanos(this.context_.min + start * resolution);
        let pixiText = new PIXI.Text(time, this.textStyle);
        pixiText.x = start + 5;
        pixiText.y = this.offset_.y;
        this.rulerContainer_.addChild(pixiText);
    }
}
