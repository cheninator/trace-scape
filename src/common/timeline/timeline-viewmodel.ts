import { VisibleWindow } from './../visible-window';

export interface TimelineViewModel {
    entries: Array<TimelineEntry>;
    events: Array<TimelineRowModel>;
    arrows: Array<TimelineArrow>;
    context: VisibleWindow;
}

export interface TimelineEntry {
    id: number;
    parentId: number;
    startTime: number;
    endTime: number;
    name: string;
}

// TODO
export interface TimelineArrow {

}

export interface TimelineRowModel {
    entryID: number;
    states: Array<TimelineState>;
}

export interface TimelineState {
    startTime: number;
    duration: number;
    value: number;
    label: string;
}
