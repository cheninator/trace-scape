/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TimelineRowModel, TimelineEntry, TimelineArrow } from './../timeline/timeline-viewmodel';
import { TimelineRequestFilter } from './../filter/timeline-request-filter';
import { BaseRequestFilter } from './../filter/base-request-filter';
import { Trace } from './../model/trace';
import { ModelResponse } from './model-response';

export interface ITimelineModelProvider {
    readonly trace: Trace;
    fetchEntries(filter: BaseRequestFilter): Promise<ModelResponse<Array<TimelineEntry>>>;
    fetchEvents(filter: TimelineRequestFilter): Promise<ModelResponse<Array<TimelineRowModel>>>;
    fetchArrows(): Promise<TimelineArrow>;
}
