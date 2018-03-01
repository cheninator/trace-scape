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
import { ModelProviders } from './core/protocol/model-providers';
import { TreeTimelineComponent } from './components/tree-timeline-component';
import { Trace } from './core/model/trace';

let serverUrl = 'http://localhost:8080/tracecompass';
let trace: Trace;

async function main() {

    let traceModelProvider = new TraceModelProvider(serverUrl);
    let traces = await traceModelProvider.getTraces();

    if (traces.length === 0) {
        let name = 'kernel';
        let path = `/home/yonni/Documents/traces/${name}`;
        trace = await traceModelProvider.putTrace(name, path);
    } else {
        trace = traces[0];
    }

    let layoutManager = new LayoutManager();
    //layoutManager.addComponent(new TreeTimelineComponent(ModelProviders.THREAD_STATUS, serverUrl, trace));

    layoutManager.addComponent(new TreeXYComponent({
        id: ModelProviders.CPU,
        serverUrl: serverUrl,
        name: "CPU Usage"
    }, trace));

    layoutManager.addComponent(new TreeXYComponent({
        id: ModelProviders.DISK,
        serverUrl: serverUrl,
        name: "Disk I/O activiy"
     }, trace));

    layoutManager.addComponent(new TreeXYComponent({
        id: ModelProviders.KERNEL_MEMORY,
        serverUrl: serverUrl,
        name: "Kernel memory usage"
    }, trace));

    layoutManager.init();
}

main();
