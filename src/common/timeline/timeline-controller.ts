import { TimelineViewModel, TimelineEntry, TimelineRowModel } from './timeline-viewmodel';
import { ITimelineModelProvider, ControlFlowModelProvider } from './../protocol/timeline-model-provider';
import { VisibleWindow } from './../visible-window';
import { Key } from './../key';

export class TimelineController {

    private modelProvider_: ITimelineModelProvider;
    private visibleWindow_: VisibleWindow;
    private viewWidth_: number;
    private viewModel_: TimelineViewModel;

    /* Key bindings */
    private plus_: Key;
    private minus_: Key;
    private left_: Key;
    private right_: Key;

    constructor(viewWidth: number) {
        this.viewWidth_ = viewWidth;
        this.modelProvider_ = new ControlFlowModelProvider('http://localhost:8080', 'trace2');
        this.initKeys();
    }

    public async inflate() {
        let model = await this.modelProvider_.fetchEntries();

        while (model.length !== 10) {
            model = await this.modelProvider_.fetchEntries();
        }
    }

    get viewModel() {
        return this.viewModel_;
    }

    private updateViewModel(): void {
        this.modelProvider_.fetchEvents(null).then((v: Array<TimelineRowModel>) => {
            this.viewModel_.events = v;
            window.dispatchEvent(new Event('visiblewindowchanged'));
        });
    }

    public zoomIn(): void {
        let delta = this.visibleWindow_.max - this.visibleWindow_.min;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.min + (delta * 0.95));
        this.visibleWindow_.resolution = (this.visibleWindow_.max - this.visibleWindow_.min) / this.viewWidth_;
        this.updateViewModel();
    }

    public zoomOut(): void {
        let delta = this.visibleWindow_.max - this.visibleWindow_.min;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.min + (delta * 1.05));
        this.visibleWindow_.resolution = (this.visibleWindow_.max - this.visibleWindow_.min) / this.viewWidth_;
        this.updateViewModel();
    }

    public panLeft(): void {
        let delta = (this.visibleWindow_.max - this.visibleWindow_.min) * 0.05;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.max - delta);
        this.visibleWindow_.min = Math.round(this.visibleWindow_.min - delta);
        this.visibleWindow_.resolution = (this.visibleWindow_.max - this.visibleWindow_.min) / this.viewWidth_;
        this.updateViewModel();
    }

    public panRight(): void {
        let delta = (this.visibleWindow_.max - this.visibleWindow_.min) * 0.05;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.max + delta);
        this.visibleWindow_.min = Math.round(this.visibleWindow_.min + delta);
        this.visibleWindow_.resolution = (this.visibleWindow_.max - this.visibleWindow_.min) / this.viewWidth_;
        this.updateViewModel();
    }

    private initKeys(): void {
        this.plus_ = new Key(107);
        this.plus_.press = this.zoomIn;

        this.minus_ = new Key(109);
        this.minus_.press = this.zoomOut;

        this.left_ = new Key(37);
        this.left_.press = this.panLeft;

        this.right_ = new Key(39);
        this.right_.press = this.panRight;
    }
}
