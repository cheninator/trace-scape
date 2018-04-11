/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as GoldenLayout from 'golden-layout';

import { IGoldenLayoutComponent } from './components/component';
import { NavigatorComponent } from './components/navigator-component';
import { TreeTimelineComponent } from './components/tree-timeline-component';
import { EventType } from './base/events';

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

        window.addEventListener(EventType.VIEW_SELECTED, this.viewSelected.bind(this));
    }

    public addComponent(component: IGoldenLayoutComponent) {
        if (component === undefined) {
            return;
        }

        this.components_.push(component);
        let configuration = component.itemConfiguration;

        // @ts-ignore
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
        if (this.layout_.root.contentItems[0].contentItems[1].contentItems.length === 0) {
            this.layout_.root.contentItems[0].contentItems[1].addChild(configuration, 0);
        } else {
            this.layout_.root.contentItems[0].contentItems[1].contentItems[0].addChild(configuration);
        }
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
            row.config.height = 30;
        }
        row.addChild(configuration);
    }

    private registerNavigatorComponent() {
        let component = new NavigatorComponent({
            id: "navigator",
            name: "Project explorer",
            serverUrl: "http://localhost:8080/tracecompass"
        });
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

    private viewSelected(event: CustomEvent) {
        // TODO: Need to figure out if we have to create a Timeline component or XY component
    }
}
