/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

/// <reference path="./../../node_modules/golden-layout/index.d.ts" />

import { IComponent } from './ui/component';
import { DockComponent } from './ui/dock-component';
import * as GoldenLayout from 'golden-layout';

export class LayoutManager {

    private components_: Array<IComponent>;

    private layout_: GoldenLayout;
    private config = {
        content: [
        {
            type: 'row',
            content: [
                {
                    type: 'component',
                    componentName: 'dock',
                    componentState: { label: 'Dock' },
                    width: 10,
                    isClosable: false,
                    title: 'Project explorer'
                },
                {
                    type: 'column',
                    content: [
                        {
                            type: 'component',
                            componentName: 'control-flow',
                            componentState: { label: 'B' },
                            height: 60
                        },
                        {
                            type: 'row',
                            content:
                            [
                                {
                                    type: 'component',
                                    componentName: 'disk',
                                    componentState: { label: 'B' }
                                },
                                {
                                    type: 'component',
                                    componentName: 'cpu',
                                    componentState: { label: 'B' }
                                },
                                {
                                    type: 'component',
                                    componentName: 'mem',
                                    componentState: { label: 'B' }
                                }
                            ]
                        }
                    ]
                }
            ]
        }]
    };

    constructor() {
        this.layout_ = new GoldenLayout(this.config);

        this.components_ = new Array();
        this.components_.push(new DockComponent());
    }

    public addComponent(component: IComponent) {
        if (component !== undefined) {
            this.components_.push(component);
        }
    }

    public init() {
        this.registerComponents();
        this.layout_.init();
        this.components_.forEach((c) => c.show());
    }

    private registerComponents() {
        for (let component of this.components_) {
            this.layout_.registerComponent(component.name, function(container: GoldenLayout.Container, componentState: any) {
                container.getElement().html(component.html);
            });
        }
    }
}
