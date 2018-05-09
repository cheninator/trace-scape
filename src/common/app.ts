/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TraceModelProvider } from './core/protocol/trace-model-provider';
import { LayoutManager } from './layout-manager';
import { TreeXYComponent } from './components/tree-xy-component';
import { TableComponent } from './components/table-component';
import { ModelProviders } from './core/protocol/model-providers';
import { TreeTimelineComponent } from './components/tree-timeline-component';
import { Trace } from './core/model/trace';
import { TraceManager } from './core/trace-manager';
import { Utils } from './core/utils';

let serverUrl = 'http://localhost:8080/tracecompass';
let trace: Trace;

async function openTestTrace() {
    let traceManager = TraceManager.getInstance();
    let name = 'kernel';
    let path = `/home/yonni/Documents/traces/${name}`;
    trace = await traceManager.openTrace(name, path);
}

async function main() {

    /* Strangely, everything fails with I remove this line... Need more investigation */
    await Utils.wait(200);
    let layoutManager = new LayoutManager();

    layoutManager.addComponent(new TreeTimelineComponent({
        id: ModelProviders.THREAD_STATUS,
        serverUrl: serverUrl,
        name: "Thread Status"
    }, trace));
/*
    layoutManager.addComponent(new TreeTimelineComponent({
        id: ModelProviders.RESOURCES_STATUS,
        serverUrl: serverUrl,
        name: "Resources"
    }, trace));
*/
    layoutManager.addComponent(new TreeXYComponent({
        id: ModelProviders.CPU,
        serverUrl: serverUrl,
        name: "CPU Usage"
    }, trace));
/*
    layoutManager.addComponent(new TreeXYComponent({
        id: ModelProviders.DISK,
        serverUrl: serverUrl,
        name: "Disk I/O activiy"
     }, trace));
*/
    layoutManager.addComponent(new TreeXYComponent({
        id: ModelProviders.KERNEL_MEMORY,
        serverUrl: serverUrl,
        name: "Kernel memory usage"
    }, trace));

    layoutManager.addComponent(new TableComponent({
        id: ModelProviders.EVENTS_TABLE,
        serverUrl: serverUrl,
        name: 'Events table'
    }, trace));

    layoutManager.init();
}

main();
