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
