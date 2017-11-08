import { TimelineWidget } from './timeline/timeline-widget';
import { ControlFlowModelProvider } from './protocol/timeline-model-provider';

let modelProvider = new ControlFlowModelProvider('http://localhost:8080/tracecompass', 'trace2');
let timeline = new TimelineWidget('control-flow', modelProvider);
timeline.inflate();
