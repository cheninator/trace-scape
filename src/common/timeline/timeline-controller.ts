/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TimelineViewModel, TimelineEntry, TimelineArrow } from './../core/model/timeline-model';
import { ITimelineModelProvider } from './../core/protocol/timeline-model-provider';
import { SelectionTimeQueryFilter } from './../core/filter/selection-time-query-filter';
import { TimeQueryFilter } from './../core/filter/time-query-filter';
import { ModelResponse } from './../core/protocol/model-response';
import { Status } from './../core/protocol/model-response';
import { VisibleWindow } from './../base/visible-window';
import { eventType } from './../base/events';
import { Utils } from './../core/utils';
import { Key } from './../base/key';


export class TimelineController {
/*
    private async updateTree(): Promise<Status> {
        let filter: TimeQueryFilter = {
            start: this.visibleWindow_.min,
            end: Utils.ETERNITY,
            count: this.visibleWindow_.count,
        };

        let response = await this.modelProvider_.fetchTree(filter);
        this.viewModel_.entries = <TimelineEntry[]> response.model;
        return response.status;
    }

    private resetRange(e: CustomEvent) {
        this.visibleWindow_.min = this.modelProvider_.trace.start;
        this.visibleWindow_.max = this.modelProvider_.trace.end;
        this.update();
    }*/
}
