import { IComponent } from './component';
import { DiskModelProvider } from './../protocol/xy/disks-io-model-provider';
import { XYWidget } from './../xy/xy-widget';
import { Trace } from './../model/trace';

export class DiskIOComponent implements IComponent {
    
    private diskModelProvider_: DiskModelProvider;

    constructor(serverUrl: string, trace: Trace) {
        this.diskModelProvider_ = new DiskModelProvider(serverUrl, trace);
    }

    get html(): string {
        return `
        <div class="row">
            <div class="col-md-12">
                <canvas id="disk-overlay" style="position:absolute; pointer-events:none; z-index: 0;"></canvas>
                <canvas id="disk" style="z-index: 1;"></canvas>
            </div>
        </div>
        `;
    }

    get name(): string {
        return 'disk';
    }

    get title(): string {
        return 'Disk IO Activity';
    }

    public show() {
        let disk = new XYWidget('disk', this.diskModelProvider_);
        disk.inflate();
    }
}