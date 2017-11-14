import { TimelineWidget } from './timeline/timeline-widget';
import { XYWidget } from './xy/xy-widget';
import { ControlFlowModelProvider } from './protocol/timeline/control-flow-model-provider';
import { DiskModelProvider } from './protocol/xy/disks-io-model-provider';
import { TraceModelProvider } from './protocol/trace-model-provider';
import { Trace } from './model/trace';

async function init() {
    let serverUrl = 'http://localhost:8080/tracecompass';

    let traceModelProvider = new TraceModelProvider(serverUrl);
    let traces = await traceModelProvider.getTraces();
    let trace: Trace;

    if (traces.length == 0) {
        trace = await traceModelProvider.putTrace('trace2', '/home/yonni/Documents/traces/ctf/src/main/resources/trace2');
    } else {
        trace = traces[0];
    }
    console.log(trace);
    let diskModelProvider = new DiskModelProvider(serverUrl, trace);
    let xy = new XYWidget('disk', diskModelProvider);
    xy.inflate();
}

init();