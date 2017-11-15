import { IXYModelProvider } from './../protocol/xy-model-provider';
import { BaseRequestFilter } from './../filter/base-request-filter';
import { XYRequestFilter } from './../filter/xy-request-filter';
import { VisibleWindow } from './../visible-window';
import { XYViewModel } from './xy-viewmodel';
import { eventType } from './../events';
import { Utils } from './../utils';
import { Key } from './../key';

export class XYController {

    private modelProvider_: IXYModelProvider;
    private visibleWindow_: VisibleWindow;
    private viewModel_: XYViewModel;
    private viewWidth_: number;

    /* Key bindings */
    private plus_: Key;
    private minus_: Key;

    constructor(viewWidth: number, modelProvider: IXYModelProvider) {
        this.modelProvider_ = modelProvider;
        this.viewWidth_ = viewWidth;
        this.initKeys();
    }

    public async inflate() {
        if (this.visibleWindow_ === undefined) {
            this.visibleWindow_ = {
                min: this.modelProvider_.trace.start,
                max: this.modelProvider_.trace.end,
                resolution: 0
            };
            await this.updateTree();
            this.updateData();
        }
    }

    get viewModel() {
        return this.viewModel_;
    }

    private async updateData() {
        let filter: XYRequestFilter = {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.max,
            count: this.viewWidth_,
            ids: this.viewModel_.entries.map((entry) => entry.id)
        };

        let response = await this.modelProvider_.fetchData(filter);
        while (response.status !== "COMPLETED") {
            await Utils.wait(500);
            response = await this.modelProvider_.fetchData(filter);
        }

        this.viewModel_.series = response.model;
        window.dispatchEvent(new Event(eventType.VIEW_MODEL_CHANGED));
    }

    private async updateTree() {
        let filter: BaseRequestFilter = {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.max,
            count: this.viewWidth_,
        }

        let response = await this.modelProvider_.fetchEntries(filter);

        if (this.viewModel_ === undefined) {
            this.viewModel_ = {
                title: "",
                entries: response.model,
                series: new Array()
            };
        } else {
            this.viewModel_.entries = response.model
        }
    }

    public zoomIn() {
        let delta = this.visibleWindow_.max - this.visibleWindow_.min;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.min + (delta * 0.95));
        this.visibleWindow_.resolution = (this.visibleWindow_.max - this.visibleWindow_.min) / this.viewWidth_;
        this.updateTree();
        this.updateData();
    }

    public zoomOut() {
        let delta = this.visibleWindow_.max - this.visibleWindow_.min;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.min + (delta * 1.05));
        this.visibleWindow_.resolution = (this.visibleWindow_.max - this.visibleWindow_.min) / this.viewWidth_;
        this.updateTree();
        this.updateData();
    }

    private initKeys() {
        this.plus_ = new Key(107);
        this.plus_.press = this.zoomIn.bind(this);

        this.minus_ = new Key(109);
        this.minus_.press = this.zoomOut.bind(this);
    }
}
