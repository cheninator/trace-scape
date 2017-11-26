/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { XYLineChart } from './xy-line-chart';
import { IXYModelProvider } from './../protocol/xy-model-provider';
import { XYController } from './xy-controller';
import { eventType } from './../events';

export class XYWidget {

    private chart_: XYLineChart;
    private controller_: XYController;

    constructor(id: string, modelProvider: IXYModelProvider) {
        let canvas = <HTMLCanvasElement> document.getElementById(id);

        this.chart_ = new XYLineChart(canvas.getContext('2d'));
        this.controller_ = new XYController(canvas.width, modelProvider);

        window.addEventListener(eventType.VIEW_MODEL_CHANGED, this.viewModelChanged.bind(this));
    }

    public inflate() {
        this.controller_.inflate();
    }

    private viewModelChanged(e: Event) {
        this.chart_.viewModel = this.controller_.viewModel;
        this.chart_.draw();
    }
}
