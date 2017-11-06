import { VisibleWindow } from './../visible-window';

export interface TimelineViewModel {
    entries: Array<TimelineEntry>;
    events: Array<TimelineRowModel>;
    arrows: Array<TimelineArrow>;
    context: VisibleWindow;
}

// TODO
export interface TimelineEntry {

}

// TODO
export interface TimelineArrow {

}

export interface TimelineRowModel {
    id: number;
    states: Array<TimelineState>;
}

export interface TimelineState {
    startTime: number;
    duration: number;
    value: number;
    label: string;
}
