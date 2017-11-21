import { TimelineWidget } from './timeline/timeline-widget';
import { ControlFlowModelProvider } from './protocol/timeline/control-flow-model-provider';
import { TraceModelProvider } from './protocol/trace-model-provider';
import { Trace } from './model/trace';
import { LayoutManager } from './layout-manager';
import { CpuUsageComponent } from './ui/cpu-usage-component';
import { DiskIOComponent } from './ui/disk-io-component';
import { KernelMemoryComponent } from './ui/kernel-memory-component';

async function main() {

    let serverUrl = 'http://localhost:8080/tracecompass';

    let traceModelProvider = new TraceModelProvider(serverUrl);
    let traces = await traceModelProvider.getTraces();
    let trace: Trace;

    if (traces.length === 0) {
        let name = 'kernel_vm';
        let path = `/home/yonni/Documents/traces/ctf/src/main/resources/${name}`;
        trace = await traceModelProvider.putTrace(name, path);
    } else {
        trace = traces[0];
    }

    let layoutManager = new LayoutManager();
    layoutManager.addComponent(new CpuUsageComponent(serverUrl, trace));
    layoutManager.addComponent(new DiskIOComponent(serverUrl, trace));
    layoutManager.addComponent(new KernelMemoryComponent(serverUrl, trace));

    layoutManager.init();
}

main();