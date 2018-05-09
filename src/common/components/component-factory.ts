/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../core/model/trace';
import { ModelProviders } from './../core/protocol/model-providers';
import { IGoldenLayoutComponent } from './component';
import { NavigatorComponent } from './navigator-component';
import { TreeTimelineComponent } from './tree-timeline-component';
import { TreeXYComponent } from './tree-xy-component';
import { TableComponent } from './table-component';

export class ComponentFactory {

    private serverUrl_: string;
    private trace_: Trace;

    constructor(serverUrl: string, trace: Trace) {
        this.serverUrl_ = serverUrl;
        this.trace_ = trace;
    }

    public create(component: Components): IGoldenLayoutComponent {
        switch (component) {
            case Components.PROJECT_EXPLORER:
                return new NavigatorComponent({
                    id: "Project explorer",
                    serverUrl: this.serverUrl_,
                    name: "Project explorer"
                });
            case Components.THREAD_STATUS:
                return new TreeTimelineComponent({
                    id: ModelProviders.THREAD_STATUS,
                    serverUrl: this.serverUrl_,
                    name: "Thread Status"
                }, this.trace_);
            case Components.RESSOURCES:
            return new TreeTimelineComponent({
                id: ModelProviders.RESOURCES_STATUS,
                serverUrl: this.serverUrl_,
                name: "Resources"
            }, this.trace_);
            case Components.CPU_USAGE:
                return new TreeXYComponent({
                    id: ModelProviders.CPU,
                    serverUrl: this.serverUrl_,
                    name: "CPU Usage"
                }, this.trace_);
            case Components.DISK_IO_ACTIVITY:
                return new TreeXYComponent({
                    id: ModelProviders.DISK,
                    serverUrl: this.serverUrl_,
                    name: "Disk I/O activiy"
                }, this.trace_);
            case Components.KERNEL_MEMORY:
                return new TreeXYComponent({
                    id: ModelProviders.KERNEL_MEMORY,
                    serverUrl: this.serverUrl_,
                    name: "Kernel memory usage"
                }, this.trace_);
            case Components.EVENTS_TABLE:
                return new TableComponent({
                    id: ModelProviders.EVENTS_TABLE,
                    serverUrl: this.serverUrl_,
                    name: 'Events table'
                }, this.trace_);
            default:
                throw new Error(`${component} is not supported`);
        }
    }
}

export enum Components {
    PROJECT_EXPLORER,
    THREAD_STATUS,
    RESSOURCES,
    DISK_IO_ACTIVITY,
    CPU_USAGE,
    KERNEL_MEMORY,
    EVENTS_TABLE
}
