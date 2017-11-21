import { TimelineWidget } from './timeline/timeline-widget';
import { ControlFlowModelProvider } from './protocol/timeline/control-flow-model-provider';
import { TraceModelProvider } from './protocol/trace-model-provider';
import { Trace } from './model/trace';
import { LayoutManager } from './layout-manager';
import { CpuUsageComponent } from './ui/cpu-usage-component';
import { DiskIOComponent } from './ui/disk-io-component';
import { KernelMemoryComponent } from './ui/kernel-memory-component';

async function init() {

    let serverUrl = 'http://localhost:8080/tracecompass';

    let traceModelProvider = new TraceModelProvider(serverUrl);
    let traces = await traceModelProvider.getTraces();
    let trace: Trace;

    if (traces.length === 0) {
        let path = '/home/yonni/Documents/traces/ctf/src/main/resources/kernel_vm';
        trace = await traceModelProvider.putTrace('kernel_vm', path);
    } else {
        trace = traces[0];
    }
/*
    let modelProvider = new ControlFlowModelProvider('http://localhost:8080/tracecompass', trace);
    let timeline = new TimelineWidget('control-flow', modelProvider);
    timeline.inflate();
*/

    let layoutManager = new LayoutManager();
    layoutManager.addComponent(new CpuUsageComponent(serverUrl, trace));
    layoutManager.addComponent(new DiskIOComponent(serverUrl, trace));
    layoutManager.addComponent(new KernelMemoryComponent(serverUrl, trace));

    layoutManager.init();
}

init();