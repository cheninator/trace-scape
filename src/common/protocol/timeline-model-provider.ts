import { TimelineRowModel, TimelineEntry, TimelineArrow } from './../timeline/timeline-viewmodel';
import { TimelineRequestFilter } from './../filter/timeline-request-filter';
import { Trace } from './../model/trace';
import { ModelResponse } from './model-response';

export interface ITimelineModelProvider {
    readonly trace: Trace;
    fetchEntries(): Promise<ModelResponse<Array<TimelineEntry>>>;
    fetchEvents(filter: TimelineRequestFilter): Promise<ModelResponse<Array<TimelineRowModel>>>;
    fetchArrows(): Promise<TimelineArrow>;
}

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

    public fetchEntries() : Promise<ModelResponse<Array<TimelineEntry>>> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'GET',
                    url: `${this.serverUrl_}/traces/${this.trace_.id}/ControlFlowView`,
                    contentType: 'application/x-www-form-urlencoded',
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
                    url: `${this.serverUrl_}/traces/${this.trace_.id}/ControlFlowView/events`,
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
