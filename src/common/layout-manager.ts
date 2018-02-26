/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as GoldenLayout from 'golden-layout';

import { IGoldenLayoutComponent } from './ui/component';
import { NavigatorComponent } from './ui/navigator-component';

export class LayoutManager {

    private components_: IGoldenLayoutComponent[];
    private layout_: GoldenLayout;
    private config = {
        content: [{
            type: 'row',
            content: new Array()
        }]
    };

    constructor() {
        this.layout_ = new GoldenLayout(this.config);
        this.layout_.init();
        this.components_ = new Array();
        this.registerNavigatorComponent();
    }

    public addComponent(component: IGoldenLayoutComponent) {
        if (component !== undefined) {
            this.components_.push(component);
            let configuration = component.itemConfiguration;
            this.layout_.registerComponent(configuration.title, function(container: GoldenLayout.Container, componentState: any) {
                container.getElement().html(component.html);
            });
            this.layout_.root.contentItems[0].contentItems[1].addChild(configuration);
        }
    }

    private registerNavigatorComponent() {
        let component = new NavigatorComponent();
        let configuration = component.itemConfiguration;
        this.layout_.registerComponent(configuration.title, function(container: GoldenLayout.Container, componentState: any) {
            container.getElement().html(component.html);
        });
        this.layout_.root.contentItems[0].addChild(configuration);

        this.layout_.root.contentItems[0].addChild({
            type: 'column',
            content: new Array()
        });
    }

    public init() {
        this.components_.forEach((c) => c.show());
    }
}
