import { IComponent } from './component';
import { KernelMemoryModelProvider } from './../protocol/xy/kernel-memory-model-provider';
import { XYWidget } from './../xy/xy-widget';
import { Trace } from './../model/trace';

export class KernelMemoryComponent implements IComponent {
    
    private memoryModelProvider_: KernelMemoryModelProvider;

    constructor(serverUrl: string, trace: Trace) {
        this.memoryModelProvider_ = new KernelMemoryModelProvider(serverUrl, trace);
    }

    get html(): string {
        return `
        <div class="row">
            <div class="col-md-12">
                <canvas id="kernel-overlay" style="position:absolute; pointer-events:none; z-index: 0;"></canvas>
                <canvas id="kernel" style="z-index: 1;"></canvas>
            </div>
        </div>
        `;
    }

    get name(): string {
        return 'mem';
    }

    get title(): string {
        return 'Kernel Memory Usage';
    }

    public show() {
        let kernel = new XYWidget('kernel', this.memoryModelProvider_);
        kernel.inflate();
    }
}