/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { colors } from './../components/colors';
import { Dictionary } from '../core/dictionary';

export class TimelinePresentation {

    private readonly colorMapping: Dictionary<number>;

    private readonly thicknessMapping = {
        0: 11,
        1: 11,
        2: 11,
        3: 11,
        4: 11,
        5: 11,
        6: 11
    };

    constructor() {
        this.colorMapping = new Dictionary();
        this.colorMapping.add("0", colors.DIM_GREY);
        this.colorMapping.add("1", colors.LA_RIOJA);
        this.colorMapping.add("2", colors.ISLAMIC_GREEN);
        this.colorMapping.add("3", colors.MEDIUM_BLUE);
        this.colorMapping.add("4", colors.RUBY);
        this.colorMapping.add("5", colors.TENNE);
        this.colorMapping.add("6", colors.VERY_LIGHT_GREY);
        this.colorMapping.add("7", 0x236B2A);
        this.colorMapping.add("8", 0xC896C8);
        this.colorMapping.add("16", 0xC80064);
    }

    public getColorOfState(state: number) {
        return this.colorMapping.get(state.toString());
    }

    public getThicknessOfState(state: number) {
        return this.thicknessMapping[state];
    }
}
