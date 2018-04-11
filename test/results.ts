/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { XYLineChart } from './../src/common/xy/xy-line-chart';
import { XYSeries } from './../src/common/core/model/xy-model';

export class Results {

    public static show(series: XYSeries[]) {
        let chart = new XYLineChart(document.createElement('div'));
        chart.redraw(series);
    }
}
