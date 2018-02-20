/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TimelineRowModel, TimelineEntry, TimelineArrow } from './../timeline/timeline-viewmodel';
import { SelectionTimeQueryFilter } from './../filter/selection-time-query-filter';
import { TimeQueryFilter } from './../filter/time-query-filter';
import { Trace } from './../model/trace';
import { ModelResponse } from './model-response';
import { ITreeModelProvider } from './tree-model-provider';

export interface ITimelineModelProvider extends ITreeModelProvider {
    readonly trace: Trace;
    fetchEvents(filter: SelectionTimeQueryFilter): Promise<ModelResponse<TimelineRowModel[]>>;
    fetchArrows(filter: TimeQueryFilter): Promise<ModelResponse<TimelineArrow[]>>;
}
