/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as InspireTree from 'inspire-tree';
import * as InspireTreeDom from 'inspire-tree-dom';

export class TreeWidget {

    private element_: HTMLElement;

    constructor(element: HTMLElement) {
        this.element_ = element;
    }

    public init() {

        // @ts-ignore: Unreachable code error
        let tree = new InspireTree({
            data: [
                {
                    text: 'A node',
                    children: [
                        {
                            text: 'A child node'
                        },
                        {
                            text: 'A child node'
                        },
                        {
                            text: 'A child node'
                        }
                    ]
                },
                {
                    text: 'A node'
                },
                {
                    text: 'A node'
                },{
                    text: 'A node'
                },
            ]
        });

        // @ts-ignore: Unreachable code error
        let treeDom = new InspireTreeDom(tree, {
            target: this.element_
        });

        tree.on('node.dblclick', (event: MouseEvent, node: any) => {
            console.log("Double click", node);
        });

    }
}
