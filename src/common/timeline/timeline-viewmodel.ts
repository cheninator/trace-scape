/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

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
