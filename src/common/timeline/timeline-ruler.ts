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

export class TimelineRuler {

    private readonly entryHeight = 25;
    private readonly lineWidth = 1;
    private readonly textStyle = new PIXI.TextStyle({
        fill: colors.BLACK,
        fontSize: 13
    });

    public rulerContainer_: PIXI.Container;
    private rulerGraphics_: PIXI.Graphics;
    private context_: VisibleWindow;

    /* Width in pixel of the ruler */
    private width_: number;
    /* Heigth in pixel of the canvas used to draw the events */
    private heigth_: number;

    /* X and Y position of the ruler */
    private positionX_: number;
    private positionY_: number;

    constructor(x: number, y: number, width: number, heigth: number) {
        this.rulerContainer_ = new PIXI.Container();
        this.rulerGraphics_ = new PIXI.Graphics();

        this.positionX_ = x;
        this.positionY_ = y;
        this.width_ = width;
        this.heigth_ = heigth;
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
        this.rulerGraphics_.moveTo(this.positionX_, this.positionY_ + this.entryHeight);
        this.rulerGraphics_.lineTo(this.positionX_ + this.width_, this.positionY_ + this.entryHeight);

        let numberOfDelimitation = 5;
        let delta = this.width_ / numberOfDelimitation;

        this.rulerContainer_.removeChildren();
        for (let i = 0; i < numberOfDelimitation; ++i) {
            this.drawSeparation(this.positionX_ + i * delta, this.heigth_);
        }
        this.rulerContainer_.addChild(this.rulerGraphics_);
    }

    private drawSeparation(start: number, height: number) {
        this.rulerGraphics_.lineStyle(this.lineWidth, colors.BLACK);
        this.rulerGraphics_.moveTo(start, this.positionY_);
        this.rulerGraphics_.lineTo(start, height);

        let resolution = (this.context_.max - this.context_.min) / this.context_.count;
        let time = TimeFormatter.fromNanos(this.context_.min + start * resolution);
        let pixiText = new PIXI.Text(time, this.textStyle);
        pixiText.x = start + 5;
        pixiText.y = this.positionY_;
        this.rulerContainer_.addChild(pixiText);
    }
}
