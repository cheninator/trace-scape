/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TimelineRowModel, TimelineEntry, TimelineArrow, TimelineState } from './../../timeline/timeline-viewmodel';
import { TimelineRequestFilter } from './../../filter/timeline-request-filter';
import { BaseRequestFilter } from './../../filter/base-request-filter';
import { Trace } from './../../model/trace';
import { ITimelineModelProvider } from './../timeline-model-provider';
import { ModelResponse } from './../model-response';

declare var proto: any;

export class ProtoControlFlowModelProvider implements ITimelineModelProvider {

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
            let req = new XMLHttpRequest();
            req.open("POST", `${this.serverUrl_}/tracecompass/traces/${this.trace.name}/ControlFlowView/events`, true);
            req.setRequestHeader("Content-type", "application/json");
            req.responseType = "arraybuffer";

            req.onload = (oEvent) => {
                let arrayBuffer = req.response; // Note: not oReq.responseText
                if (arrayBuffer) {
                    let byteArray = new Uint8Array(arrayBuffer);
                    let t = proto.timegraph.ControlFlowEvents.deserializeBinary(byteArray);
                    let modelList = t.getModelList();

                    let timeline: Array<TimelineRowModel> = new Array();
                    for (let event of modelList) {
                        let states: Array<TimelineState> = new Array();
                        for (let state of event.getStatesList()) {
                            states.push(<TimelineState> {
                                startTime: state.getStarttime(),
                                duration: state.getDuration(),
                                value: state.getValue(),
                                label: state.getLabel()
                            });
                        }
                        timeline.push(<TimelineRowModel> {
                            entryID: event.getEntryid(),
                            states: states
                        });
                    }
                    return timeline;
                }
            };

            req.send(JSON.stringify(filter));
        });
    }

    public fetchArrows() : Promise<TimelineArrow> {
        return null;
    }
}
