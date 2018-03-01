/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { VisibleWindow } from './../base/visible-window';

export abstract class Widget {
    protected readonly WAIT_BEFORE_REQUEST = 700;
    protected visibleWindow_: VisibleWindow;

    public abstract inflate(visibleWindow?: VisibleWindow): void;
    public abstract update(): void;
}
