/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ModelResponse } from './model-response';
import { XYEntries, XYSeries } from './../xy/xy-viewmodel';
import { TimeQueryFilter } from './../filter/time-query-filter';
import { XYRequestFilter } from './../filter/xy-request-filter';
import { Trace } from './../model/trace';

export interface IXYModelProvider {
    readonly trace: Trace;
    fetchEntries(filter: TimeQueryFilter): Promise<ModelResponse<Array<XYEntries>>>;
    fetchData(filter: TimeQueryFilter): Promise<ModelResponse<Array<XYSeries>>>;
}
