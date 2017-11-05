import { VisibleWindow } from './../visible-window';

export class TimelineViewModel {

    private entries_: Array<TimelineEntry>;
    private events_: Array<TimelineRowModel>;
    private arrows_: Array<TimelineArrow>;

    constructor() {

    }

    set entries(e: Array<TimelineEntry>) {
        this.entries_ = e;
    }

    get entries(): Array<TimelineEntry> {
        return null;
    }

    set events(e: Array<TimelineRowModel>) {
        this.events_ = e;
    }

    get events(): Array<TimelineRowModel> {
        return this.events_;
    }

    set arrows(e: Array<TimelineArrow>) {
        this.arrows_ = e;
    }

    get arrows(): Array<TimelineArrow> {
        return this.arrows_;
    }

    get viewModelContext(): VisibleWindow {
        return null;
    }
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