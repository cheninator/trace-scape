/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

export namespace ModelProviders {
    export const DISK = 'org.eclipse.tracecompass.analysis.os.linux.core.inputoutput.DisksIODataProvider';
    export const CPU = 'org.eclipse.tracecompass.analysis.os.linux.core.cpuusage.CpuUsageDataProvider';
    export const KERNEL_MEMORY = 'org.eclipse.tracecompass.analysis.os.linux.core.kernelmemoryusage';
    export const COUNTERS = 'org.eclipse.tracecompass.analysis.counters.core.CounterDataProvider';

    export const THREAD_STATUS = 'org.eclipse.tracecompass.internal.analysis.os.linux.core.threadstatus.ThreadStatusDataProvider';
    export const RESOURCES_STATUS = 'org.eclipse.tracecompass.internal.analysis.os.linux.core.threadstatus.ResourcesStatusDataProvider';
    export const CALLSTACK = 'org.eclipse.tracecompass.internal.tmf.core.callstack.provider.CallStackDataProvider';
    export const CRITICAL_PATH = 'org.eclipse.tracecompass.analysis.graph.core.dataprovider.CriticalPathDataProvider';

    export const EVENTS_TABLE = 'org.eclipse.tracecompass.internal.provisional.tmf.core.model.events.TmfEventTableDataProvider';
}
