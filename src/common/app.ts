/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { TraceModelProvider } from './protocol/trace-model-provider';
import { LayoutManager } from './layout-manager';
import { CpuUsageComponent } from './ui/cpu-usage-component';
import { DiskIOComponent } from './ui/disk-io-component';
import { KernelMemoryComponent } from './ui/kernel-memory-component';
import { ThreadStatusComponent } from './ui/thread-status-component';
import { Trace } from './model/trace';

async function main() {

    let serverUrl = 'http://localhost:8080/tracecompass';

    let traceModelProvider = new TraceModelProvider(serverUrl);
    let traces = await traceModelProvider.getTraces();
    let trace: Trace;

    if (traces.length === 0) {
        let name = 'kernel';
        let path = `/home/yonni/Documents/traces/${name}`;
        trace = await traceModelProvider.putTrace(name, path);
    } else {
        trace = traces[0];
    }

    let layoutManager = new LayoutManager();
    layoutManager.addComponent(new CpuUsageComponent(serverUrl, trace));
    layoutManager.addComponent(new DiskIOComponent(serverUrl, trace));
    layoutManager.addComponent(new KernelMemoryComponent(serverUrl, trace));
    layoutManager.addComponent(new ThreadStatusComponent(serverUrl, trace));

    layoutManager.init();
}

main();
