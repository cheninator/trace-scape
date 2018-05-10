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
import { Http } from './../http';
import { ProjectExplorerModel } from './../model/project-explorer-model';
import { Utils } from './../utils';

export class ProjectExplorerModelProvider implements ITreeModelProvider {

    private readonly serverUrl_: string;
    private readonly providerID_ = "Project explorer";

    constructor(serverUrl: string) {
        this.serverUrl_ = serverUrl;
    }

    get visibleRange() {
        return {
            start: 0,
            end: Utils.ETERNITY
        };
    }

    get id() {
        return this.providerID_;
    }

    public async fetchTree(filter: TimeQueryFilter): Promise<ModelResponse<ITreeModel[]>> {
        let traces: Trace[] = await Http.get(`${this.serverUrl_}/traces`);
        let projectExplorer: ITreeModel[] = new Array();

        // Root node
        projectExplorer.push(<ProjectExplorerModel> {
            id: 0,
            name: "Trace Project",
            parentId: -1,
            path: ""
        });

        let i = 1;
        for (let trace of traces) {
            projectExplorer.push(<ProjectExplorerModel> {
                id: i,
                name: trace.name,
                parentId: 0,
                path: trace.path
            });
            ++i;
        }

        return <ModelResponse<ITreeModel[]>> {
            model: projectExplorer,
            status: Status.COMPLETED,
            statusMessage: Status.COMPLETED.toString()
        };
    }
}
