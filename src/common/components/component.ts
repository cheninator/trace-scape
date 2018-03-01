/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as GoldenLayout from 'golden-layout';

import { ConfigComponent } from './config-component';

export interface IGoldenLayoutComponent {
    html: string;
    itemConfiguration: GoldenLayout.ItemConfig;
    show(): void;
}

export abstract class BaseGoldenLayoutComponent implements IGoldenLayoutComponent {

    protected readonly config_: ConfigComponent;

    constructor(config: ConfigComponent) {
        this.config_ = config;
    }

    get itemConfiguration(): GoldenLayout.ItemConfig {
        return <GoldenLayout.ComponentConfig> {
            id: this.config_.id,
            title: this.config_.name,
            type: 'component',
            componentName: this.config_.name
        };
    }

    public abstract html: string;

    public abstract show(): void;
}
