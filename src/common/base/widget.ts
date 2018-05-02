/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { VisibleWindow } from './../base/visible-window';
import { IShowable } from './showable';

export abstract class Widget implements IShowable {
    protected readonly WAIT_BEFORE_REQUEST = 700;
    protected visibleWindow_: VisibleWindow;

    constructor() {
        this.visibleWindow_ = {
            min: 0,
            max: Number.MAX_SAFE_INTEGER,
            count: 1
        };
    }

    public inflate(visibleWindow?: VisibleWindow) {
        if (visibleWindow !== undefined) {
            this.visibleWindow_ = visibleWindow;
        }
        this.update();
    }

    public abstract update(): void;
    public abstract show(): void;
    public abstract hide(): void;
}
