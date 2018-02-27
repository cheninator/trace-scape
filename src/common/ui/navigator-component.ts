/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as GoldenLayout from 'golden-layout';
import { IGoldenLayoutComponent } from "./component";
import { TreeWidget } from './../base/tree-widget';

export class NavigatorComponent implements IGoldenLayoutComponent {

    private name_ = "Project explorer";
    private widget_: TreeWidget;

    get html(): string {
        return `
            <h3><img src="https://avatars1.githubusercontent.com/u/7333024?s=200&v=4" width="25" height="25"> trace2</h3>
            <h3><img src="https://avatars1.githubusercontent.com/u/7333024?s=200&v=4" width="25" height="25"> kernel vm</h3>
            <h3><img src="https://avatars1.githubusercontent.com/u/7333024?s=200&v=4" width="25" height="25"> kernel</h3>
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
        this.widget_.init();
    }
}
