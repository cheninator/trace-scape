/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ModelResponse, Status } from './model-response';
import { ITreeModelProvider } from './tree-model-provider';
import { TimeQueryFilter } from './../filter/time-query-filter';
import { Trace } from './../model/trace';
import { ITreeModel } from '../model/tree-model';


export class ProjectExplorerModelProvider implements ITreeModelProvider {

    private readonly serverUrl_: string;

    constructor(serverUrl: string) {
        this.serverUrl_ = serverUrl;
    }

    public async fetchTree(filter: TimeQueryFilter): Promise<ModelResponse<ITreeModel[]>> {
        return new Promise<ModelResponse<ITreeModel[]>>((resolve, reject) => {
            let treeModel: ITreeModel[] = new Array();
            treeModel.push({
                id: 0,
                name: "Project",
                parentId: -1
            });

            treeModel.push({
                id: 1,
                name: "kernel",
                parentId: 0
            });

            treeModel.push({
                id: 2,
                name: "many-threads",
                parentId: 0
            });

            treeModel.push({
                id: 3,
                name: "kernel_vm",
                parentId: 0
            });

            treeModel.push({
                id: 4,
                name: "trace2",
                parentId: 0
            });

            treeModel.push({
                id: 5,
                name: "Experiment",
                parentId: 0
            });

            treeModel.push({
                id: 6,
                name: "funky_trace",
                parentId: 5
            });

            treeModel.push({
                id: 7,
                name: "cyg-profile",
                parentId: 5
            });

            treeModel.push({
                id: 8,
                name: "Experiment 2",
                parentId: 0
            });

            treeModel.push({
                id: 9,
                name: "kernel",
                parentId: 8
            });

            treeModel.push({
                id: 10,
                name: "bug446190",
                parentId: 8
            });

            let response: ModelResponse<ITreeModel[]> = {
                model: treeModel,
                status: Status.COMPLETED,
                statusMessage: ""
            };

            resolve(response);
        });
    }
}
