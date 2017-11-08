import { TimelineWidget } from './timeline/timeline-widget';
import { XYWidget } from './xy/xy-widget';
import { ControlFlowModelProvider } from './protocol/timeline-model-provider';
import { DiskModelProvider } from './protocol/xy-model-provider';
import { Trace } from './model/trace';

let trace: Trace = {
    id: 'trace2',
    name: 'trace2',
    startTime: 1331668247314038062,
    endTime: 1331668259054285979
};

let modelProvider = new ControlFlowModelProvider('http://localhost:8080/tracecompass', trace);
let timeline = new TimelineWidget('control-flow', modelProvider);
timeline.inflate();

let xyModelProvider = new DiskModelProvider('http://localhost:8080/tracecompass', trace);
let xy = new XYWidget('disk', xyModelProvider);
xy.inflate();
