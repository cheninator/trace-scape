/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ITreeModel } from './../model/tree-model';

export interface XYViewModel {
    title: string;
    entries: XYEntries[];
    series: XYSeries[];
}

export interface XYSeries {
    name: string;
    x: number[];
    y: number[];
}

// TO COMPLETE
export interface XYEntries extends ITreeModel {
}
