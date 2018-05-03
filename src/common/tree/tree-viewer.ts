/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as Tree from 'inspire-tree';
import * as TreeDom from 'inspire-tree-dom';

import { NodeConfig, InspireTree } from 'inspire-tree';
import { ITreeModel } from '../core/model/tree-model';
import { Dictionary } from '../core/dictionary';
import { EventType } from './../base/events';
import { IShowable } from '../base/showable';

export class TreeViewer implements IShowable {

    private element_: HTMLElement;
    private treeModel_: ITreeModel[];
    private tree_: InspireTree;

    private onDoubleClicked_: (node: ITreeModel) => void;

    constructor(element: HTMLElement) {
        this.element_ = element;

        // @ts-ignore: Broken definition type
        this.tree_ = new Tree({});

        this.element_.onscroll = () => {
            window.dispatchEvent(new CustomEvent(EventType.VISIBLE_ENTRIES_CHANGED, {
                detail: {
                    position: this.element_.scrollTop,
                    entryWidth: 25
                }
            }));
        };
    }

    set treeModel(treeModel: ITreeModel[]) {
        if (treeModel === null) {
            return;
        }
        this.treeModel_ = treeModel;
        let nodes = this.buildTreeFromModel(this.treeModel_);
        this.tree_.removeAll();
        this.tree_.addNodes(nodes);

        // @ts-ignore: Broken definition type
        let treeDom = new TreeDom(this.tree_, {
            target: this.element_
        });
    }

    set onDoubleClick(onDoubleClick: (node: ITreeModel) => void) {
        this.onDoubleClicked_ = onDoubleClick;
        this.tree_.on('node.dblclick', (event: MouseEvent, node: any) => {
            let clicked = this.treeModel_.filter(x => x.id.toString() === node.id)[0];
            this.onDoubleClicked_(clicked);
        });
    }

    public update() {
        // @ts-ignore
        let treeDom = new TreeDom(this.tree_, {
            target: this.element_
        });
    }

    public show() {
        this.element_.style.display = 'block';
    }

    public hide() {
        this.element_.style.display = 'none';
    }

    public getNodes(count: number): ITreeModel[] {
        if (this.treeModel_ !== undefined) {
            let flatten = this.tree_.flatten((node) => node).map(t => t["id"]);
            let treeNodes = flatten.slice(0, count);

            return this.treeModel_.filter((model) => treeNodes.indexOf(model.id.toString()) !== -1);
        }
        return new Array();
    }

    public getAllNodes() {
        if (this.treeModel_ !== undefined) {
            let flatten = this.tree_.flatten((node) => node).map(t => t["id"]);
            return this.treeModel_.filter((model) => flatten.indexOf(model.id.toString()) !== -1);
        }
        return new Array();
    }

    public expandAll() {
        this.tree_.expandDeep();
    }

    private buildTreeFromModel(models: ITreeModel[]) {
        models.sort((a, b) => {
            if (a.parentId < b.parentId) {
                return -1;
            }
            return 1;
        });

        let dictionary = new Dictionary<NodeConfig>();
        for (let model of models) {
            dictionary.add(model.id.toString(), {
                id: model.id.toString(),
                text: model.name,
                children: new Array()
            });
        }

        let roots: NodeConfig[] = new Array();
        for (let model of models) {
            let node = dictionary.get(model.id.toString());
            if (model.parentId !== -1) {
                let parentNode = dictionary.get(model.parentId.toString());
                // @ts-ignore: Broken definition type
                parentNode.children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    }
}
