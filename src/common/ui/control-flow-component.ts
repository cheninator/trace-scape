import { IComponent } from './component';
import { ControlFlowModelProvider } from './../protocol/timeline/control-flow-model-provider';
import { TimelineWidget } from './../timeline/timeline-widget';
import { Trace } from './../model/trace';

export class ControlFlowComponent implements IComponent {

    private modelProvider_: ControlFlowModelProvider;

    constructor(serverUrl: string, trace: Trace) {
        this.modelProvider_ = new ControlFlowModelProvider(serverUrl, trace);
    }

    get html(): string {
        return `
        <canvas id="control-flow"></canvas>
        `;
    }

    get name(): string {
        return 'control-flow';
    }

    get title(): string {
        return 'Control Flow';
    }

    public show(): void {
        let timeline = new TimelineWidget('control-flow', this.modelProvider_);
        timeline.inflate();
    }
}