import { TimelineWidget } from './timeline/timeline-widget';
import { XYWidget } from './xy/xy-widget';
import { ControlFlowModelProvider } from './protocol/timeline/control-flow-model-provider';
import { DiskModelProvider } from './protocol/xy/disks-io-model-provider';
import { CpuUsageModelProvider } from './protocol/xy/cpu-usage-model-provider';
import { KernelMemoryModelProvider } from './protocol/xy/kernel-memory-model-provider';
import { TraceModelProvider } from './protocol/trace-model-provider';
import { Trace } from './model/trace';

async function init() {
    let serverUrl = 'http://localhost:8080/tracecompass';

    let traceModelProvider = new TraceModelProvider(serverUrl);
    let traces = await traceModelProvider.getTraces();
    let trace: Trace;

    if (traces.length === 0) {
        let path = '/home/yonni/Documents/traces/ctf/src/main/resources/trace2';
        trace = await traceModelProvider.putTrace('trace2', path);
    } else {
        trace = traces[0];
    }
/*
    let modelProvider = new ControlFlowModelProvider('http://localhost:8080/tracecompass', trace);
    let timeline = new TimelineWidget('control-flow', modelProvider);
    timeline.inflate();
*/
    let diskModelProvider = new DiskModelProvider('http://localhost:8080/tracecompass', trace);
    let disk = new XYWidget('disk', diskModelProvider);
    disk.inflate();

    let cpuModelProvider = new CpuUsageModelProvider(serverUrl, trace);
    let cpu = new XYWidget('cpu', cpuModelProvider);
    cpu.inflate();

    let kernelModelProvider = new KernelMemoryModelProvider(serverUrl, trace);
    let kernel = new XYWidget('kernel', kernelModelProvider);
    kernel.inflate();
}

init();
