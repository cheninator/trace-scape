/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { LayoutManager } from './layout-manager';
import { TraceManager } from './core/trace-manager';
import { ComponentFactory, Components } from './components/component-factory';
import { Trace } from './core/model/trace';
import { Utils } from './core/utils';

let serverUrl = 'http://localhost:8080';
let trace: Trace;

async function openTestTrace() {
    let traceManager = TraceManager.getInstance(serverUrl);
    let name = 'kernel';
    let path = `/home/yonni/Documents/traces/${name}`;
    trace = await traceManager.openTrace(name, path);
}

async function main() {

    /* Strangely, everything fails with I remove this line... Need more investigation */
    await Utils.wait(200);

    let componentFactory = new ComponentFactory(serverUrl, trace);
    let layoutManager = new LayoutManager();

    layoutManager.addComponent(componentFactory.create(Components.PROJECT_EXPLORER));
    layoutManager.addComponent(componentFactory.create(Components.THREAD_STATUS));
    layoutManager.addComponent(componentFactory.create(Components.CPU_USAGE));
    layoutManager.addComponent(componentFactory.create(Components.KERNEL_MEMORY));
    layoutManager.addComponent(componentFactory.create(Components.EVENTS_TABLE));

    layoutManager.init();
}

main();
