/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as GoldenLayout from 'golden-layout';
import { IGoldenLayoutComponent } from "./component";
import { TreeWidget } from './../tree/tree-widget';
import { ITreeModel } from '../core/model/tree-model';

export class NavigatorComponent implements IGoldenLayoutComponent {

    private name_ = "Project explorer";
    private widget_: TreeWidget;
    private treeModel_: ITreeModel[];

    constructor() {
        this.treeModel_ = new Array();
        this.generateStubProject();
    }

    get html(): string {
        return `
            <div id="tree"></div>
        `;
    }

    get itemConfiguration(): GoldenLayout.ItemConfig {
        return <GoldenLayout.ComponentConfig> {
            title: this.name_,
            type: 'component',
            componentName: this.name_,
            componentState: { text: '' },
            isClosable: false,
        };
    }

    public show() {
        let element = document.getElementById("tree");
        this.widget_ = new TreeWidget(element);
        this.widget_.treeModel = this.treeModel_;
    }

    private generateStubProject() {
        this.treeModel_.push({
            id: 0,
            name: "Project",
            parentId: -1
        });

        this.treeModel_.push({
            id: 1,
            name: "kernel",
            parentId: 0
        });

        this.treeModel_.push({
            id: 2,
            name: "many-threads",
            parentId: 0
        });

        this.treeModel_.push({
            id: 3,
            name: "kernel_vm",
            parentId: 0
        });

        this.treeModel_.push({
            id: 4,
            name: "trace2",
            parentId: 0
        });

        this.treeModel_.push({
            id: 5,
            name: "Experiment",
            parentId: 0
        });

        this.treeModel_.push({
            id: 6,
            name: "funky_trace",
            parentId: 5
        });

        this.treeModel_.push({
            id: 7,
            name: "cyg-profile",
            parentId: 5
        });

        this.treeModel_.push({
            id: 8,
            name: "Experiment 2",
            parentId: 0
        });

        this.treeModel_.push({
            id: 9,
            name: "kernel",
            parentId: 8
        });

        this.treeModel_.push({
            id: 10,
            name: "bug446190",
            parentId: 8
        });
    }
}
