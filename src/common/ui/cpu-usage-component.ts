import { IComponent } from './component';
import { CpuUsageModelProvider } from './../protocol/xy/cpu-usage-model-provider';
import { XYWidget } from './../xy/xy-widget';
import { Trace } from './../model/trace';

export class CpuUsageComponent implements IComponent {
    
    private cpuModelProvider_: CpuUsageModelProvider;

    constructor(serverUrl: string, trace: Trace) {
        this.cpuModelProvider_ = new CpuUsageModelProvider(serverUrl, trace);
    }

    get html(): string {
        return `
        <div class="row">
            <div class="col-md-12">
                <canvas id="cpu-overlay" style="position:absolute; pointer-events:none; z-index: 0;"></canvas>
                <canvas id="cpu" style="z-index: 1;"></canvas>
            </div>
        </div>
        `;
    }

    get name(): string {
        return 'cpu';
    }

    get title(): string {
        return 'CPU Usage';
    }

    public show() {
        let cpu = new XYWidget('cpu', this.cpuModelProvider_);
        cpu.inflate();
    }
}