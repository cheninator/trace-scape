import { IXYModelProvider } from './../protocol/xy-model-provider';
import { XYResquestFilter } from './../filter/xy-request-filter';
import { VisibleWindow } from './../visible-window';
import { XYViewModel } from './xy-viewmodel';
import { eventType } from './../events';
import { Utils } from './../utils';
import { Key } from './../key';

export class XYController {

    private modelProvider_: IXYModelProvider;
    private visibleWindow_: VisibleWindow;
    private viewModel_: XYViewModel;

    /* Key bindings */
    private plus_: Key;
    private minus_: Key;

    constructor(modelProvider: IXYModelProvider) {
        this.modelProvider_ = modelProvider;
        this.initKeys();
    }

    public async inflate() {
        if (this.visibleWindow_ === undefined) {
            this.visibleWindow_ = {
                min: this.modelProvider_.trace.startTime,
                max: this.modelProvider_.trace.endTime,
                resolution: 0
            };
            this.updateData();
        }
    }

    get viewModel() {
        return this.viewModel_;
    }

    private async updateData() {
        let filter: XYResquestFilter = {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.max,
            count: 300
        };

        let response = await this.modelProvider_.fetchData(filter);

        while (response.status !== "COMPLETED") {
            await Utils.wait(500);
            response = await this.modelProvider_.fetchData(filter);
        }

        this.viewModel_ = {
            title: "test",
            entries: new Array(),
            series: response.model,
        };
        window.dispatchEvent(new Event(eventType.VIEW_MODEL_CHANGED));
    }

    public zoomIn() {
        let delta = this.visibleWindow_.max - this.visibleWindow_.min;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.min + (delta * 0.95));
        this.visibleWindow_.resolution = (this.visibleWindow_.max - this.visibleWindow_.min) / 300;
        this.updateData();
    }

    public zoomOut() {
        let delta = this.visibleWindow_.max - this.visibleWindow_.min;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.min + (delta * 1.05));
        this.visibleWindow_.resolution = (this.visibleWindow_.max - this.visibleWindow_.min) / 300;
        this.updateData();
    }

    private initKeys() {
        this.plus_ = new Key(107);
        this.plus_.press = this.zoomIn.bind(this);

        this.minus_ = new Key(109);
        this.minus_.press = this.zoomOut.bind(this);
    }
}
