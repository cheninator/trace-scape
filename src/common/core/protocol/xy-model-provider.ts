/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ModelResponse } from './model-response';
import { ITreeModelProvider } from './tree-model-provider';
import { XYSeries } from './../model/xy-model';
import { TimeQueryFilter } from './../filter/time-query-filter';

export interface IXYModelProvider extends ITreeModelProvider {
    fetchXY(filter: TimeQueryFilter): Promise<ModelResponse<XYSeries[]>>;
}
