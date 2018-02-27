/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as InspireTree from 'inspire-tree';
import * as InspireTreeDom from 'inspire-tree-dom';

import { NodeConfig } from 'inspire-tree';
import { ITreeModel } from '../core/model/tree-model';
import { Dictionary } from '../core/dictionary';
import { eventType } from './../events';

export class TreeWidget {

    private element_: HTMLElement;
    private treeModel_: ITreeModel[];
    private tree_: any;

    constructor(element: HTMLElement) {
        this.element_ = element;
        this.init();
    }

    set treeModel(treeModel: ITreeModel[]) {
        this.treeModel_ = treeModel;
        let nodes = this.buildTreeFromModel(this.treeModel_);
        this.tree_.removeAll();
        this.tree_.addNodes(nodes);

        // @ts-ignore: Unreachable code error
        let treeDom = new InspireTreeDom(this.tree_, {
            target: this.element_
        });
    }

    private buildTreeFromModel(models: ITreeModel[]) {
        models.sort((a, b) => {
            if (a.parentId < b.parentId) {
                return -1;
            }
            return 1;
        });

        let dictionary = new Dictionary<NodeConfig>();
        for (let i = 0; i < models.length; ++i) {
            let model = models[i];
            dictionary.add(model.id.toString(), {
                id: model.id.toString(),
                text: model.name,
                children: new Array()
            });
        }

        let roots: NodeConfig[] = new Array();
        for (let i = 0; i < models.length; ++i) {
            let model = models[i];
            let node = dictionary.get(model.id.toString());
            if (model.parentId !== -1) {
                let parentNode = dictionary.get(model.parentId.toString());
                // @ts-ignore: Unreachable code error
                parentNode.children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    }

    public init() {
        // @ts-ignore: Unreachable code error
        this.tree_ = new InspireTree({});

        this.tree_.on('node.dblclick', (event: MouseEvent, node: any) => {
            console.log("Double click", node);
        });
    }
}
