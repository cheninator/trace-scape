/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { XYLineChart } from './../src/common/xy/xy-line-chart';
import { XYSeries } from './../src/common/core/model/xy-model';
import { IXYChart } from '../src/common/base/xy-chart';
import { Dictionary } from './../src/common/core/dictionary';

export class Results {

    private static charts_: Dictionary<IXYChart> = new Dictionary();

    public static createChart(id: string, title: string) {
        if (!Results.charts_.contains(id)) {
            let element = document.createElement('div');
            document.body.appendChild(element);

            let chart = new XYLineChart(element);
            chart.title = title;
            Results.charts_.add(id, chart);
        }
    }

    public static addSeries(id: string, series: XYSeries) {
        if (Results.charts_.contains(id)) {
            let s = new Array();
            s.push(series);
            Results.charts_.get(id).draw(s);
        }
    }
}
