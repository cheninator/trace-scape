import { TimelineWidget } from './timeline/timeline-widget';
import { XYWidget } from './xy/xy-widget';
import { ControlFlowModelProvider } from './protocol/timeline/control-flow-model-provider';
import { DiskModelProvider } from './protocol/xy/disks-io-model-provider';
import { TraceModelProvider } from './protocol/trace-model-provider';
import { Trace } from './model/trace';


let trace: Trace = {
    id: 'trace2',
    name: 'trace2',
    startTime: 1331668247314038062,
    endTime: 1331668259054285979
};

async function init() {
    let serverUrl = 'http://localhost:8080/tracecompass';

    let traceModelProvider = new TraceModelProvider(serverUrl);
    let traces = await traceModelProvider.getTraces();
    
    let diskModelProvider = new DiskModelProvider(serverUrl, trace);
    let xy = new XYWidget('disk', diskModelProvider);
    xy.inflate();
}

init();