/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { colors } from './../ui/colors';

export class TimelinePresentation {

    private readonly colorMapping = [
        colors.DIM_GREY,
        colors.LA_RIOJA,
        colors.ISLAMIC_GREEN,
        colors.MEDIUM_BLUE,
        colors.RUBY,
        colors.TENNE,
        colors.VERY_LIGHT_GREY
    ]

    private readonly thicknessMapping = {
        0: 15,
        1: 15,
        2: 15,
        3: 15,
        4: 15,
        5: 15,
        6: 15
    };

    public getColorOfState(state: number) {
        return this.colorMapping[state];
    }

    public getThicknessOfState(state: number) {
        return this.thicknessMapping[state];
    }
}