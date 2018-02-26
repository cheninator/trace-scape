/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { InspireTree } from 'inspire-tree';
import InspireTreeDom from 'inspire-tree-dom';

export class TreeWidget {

    private element_: HTMLElement;

    constructor(element: HTMLElement) {
        this.element_ = element;
    }

    public init() {
        let tree = new InspireTree({
            data: [{
                text: 'A node'
            }]
        });

        let treeDom = new InspireTreeDom(tree, {
            target: this.element_
        });
    }
}
