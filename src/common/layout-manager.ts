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
import { TreeTimelineComponent } from './ui/tree-timeline-component';

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
        if (component === undefined) {
            return;
        }

        this.components_.push(component);
        let configuration = component.itemConfiguration;
        this.layout_.registerComponent(configuration.title, function(container: GoldenLayout.Container, componentState: any) {
            container.getElement().html(component.html);
        });

        if (component instanceof TreeTimelineComponent) {
            this.addTimelineComponent(configuration);
        }
        else {
            this.addXYComponent(configuration);
        }
    }

    public init() {
        this.components_.forEach((c) => c.show());
    }

    private addTimelineComponent(configuration: GoldenLayout.ItemConfig) {
        this.layout_.root.contentItems[0].contentItems[1].addChild(configuration, 0);
    }

    private addXYComponent(configuration: GoldenLayout.ItemConfig) {
        let row: GoldenLayout.ContentItem = null;
        for (let item of this.layout_.root.contentItems[0].contentItems[1].contentItems) {
            if (item.isRow) {
                row = item;
            }
        }

        if (row === null) {
            this.layout_.root.contentItems[0].contentItems[1].addChild({
                type: 'row',
                content: new Array()
            });
            let length = this.layout_.root.contentItems[0].contentItems[1].contentItems.length;
            row = this.layout_.root.contentItems[0].contentItems[1].contentItems[length - 1];
        }
        row.addChild(configuration);
    }

    private registerNavigatorComponent() {
        let component = new NavigatorComponent();
        this.components_.push(component);

        let configuration = component.itemConfiguration;
        this.layout_.registerComponent(configuration.title, function(container: GoldenLayout.Container, componentState: any) {
            container.getElement().html(component.html);
        });
        this.layout_.root.contentItems[0].addChild(configuration);

        this.layout_.root.contentItems[0].addChild({
            type: 'column',
            content: new Array()
        });
        this.layout_.root.contentItems[0].contentItems[0].config.width = 7;
    }
}
