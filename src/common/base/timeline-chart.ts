/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TimelineRowModel, TimelineArrow } from './../core/model/timeline-model';
import { VisibleWindow } from './visible-window';
import { IShowable } from './showable';

export interface ITimelineChart extends IShowable {
    context: VisibleWindow;
    redrawEvents(row: TimelineRowModel[]): void;
    drawEvents(row: TimelineRowModel[]): void;
    redrawArrows(arrows: TimelineArrow[]): void;
    drawArrows(arrows: TimelineArrow[]): void;
    clearEvents(): void;
    clearArrows(): void;
    clear(): void;
}
