import { TimelineView } from './timeline/timeline-view';
import { ControlFlowModelProvider } from './protocol/timeline-model-provider';

let modelProvider = new ControlFlowModelProvider('http://localhost:8080/tracecompass', 'trace2');
let timeline = new TimelineView('control-flow', modelProvider);
timeline.inflate();
