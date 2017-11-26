/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TimelineRowModel, TimelineEntry, TimelineArrow } from './../../timeline/timeline-viewmodel';
import { TimelineRequestFilter } from './../../filter/timeline-request-filter';
import { BaseRequestFilter } from './../../filter/base-request-filter';
import { Trace } from './../../model/trace';
import { ITimelineModelProvider } from './../timeline-model-provider';
import { ModelResponse } from './../model-response';

export class ControlFlowModelProvider implements ITimelineModelProvider {

    private serverUrl_: string;
    private readonly trace_: Trace;

    constructor(serverUrl: string, trace: Trace) {
        this.serverUrl_ = serverUrl;
        this.trace_ = trace;
    }

    get trace() {
        return this.trace_;
    }

    public fetchEntries(filter: BaseRequestFilter) : Promise<ModelResponse<Array<TimelineEntry>>> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'GET',
                    url: `${this.serverUrl_}/traces/${this.trace_.name}/ControlFlowView`,
                    contentType: 'application/x-www-form-urlencoded',
                    data: filter,
                    success: (response) => {
                        let obj = <ModelResponse<Array<TimelineEntry>>> response;
                        resolve(obj);
                    },
                    error: (xhr, status, error) => {
                        reject(error);
                    },
                }
            );
        });
    }

    public fetchEvents(filter: TimelineRequestFilter) : Promise<ModelResponse<Array<TimelineRowModel>>> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: "POST",
                    url: `${this.serverUrl_}/traces/${this.trace_.name}/ControlFlowView/events`,
                    data: JSON.stringify(filter),
                    contentType: "application/json; charset=utf-8",
                    success: (response) => {
                        let obj = <ModelResponse<Array<TimelineRowModel>>> response;
                        resolve(obj);
                    },
                    error: (xhr, status, error) => {
                        reject(error);
                    },
                }
            );
        });
    }

    public fetchArrows() : Promise<TimelineArrow> {
        return null;
    }
}
