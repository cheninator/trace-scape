import { TimelineViewModel, TimelineEntry } from './timeline-viewmodel';
import { ITimelineModelProvider } from './../protocol/timeline-model-provider';
import { TimelineRequestFilter } from './../filter/timeline-request-filter';
import { VisibleWindow } from './../visible-window';
import { Utils } from './../utils';
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

    constructor(viewWidth: number, modelProvider: ITimelineModelProvider) {
        this.viewWidth_ = viewWidth;
        this.modelProvider_ = modelProvider;
        this.visibleWindow_ = new VisibleWindow(0, 0, 0);
        this.initKeys();
    }

    public async inflate() {
        let response = await this.modelProvider_.fetchEntries();

        // This is arbitrary
        this.visibleWindow_.min = response.model[0].startTime;
        this.updateVisibleWindow(response.model);

        while (response.status !== "COMPLETED") {
            await Utils.wait(500);
            response = await this.modelProvider_.fetchEntries();
            this.updateVisibleWindow(response.model);
        }

        let events = await this.modelProvider_.fetchEvents(<TimelineRequestFilter> {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.max,
            resolution: this.visibleWindow_.resolution,
            entries: response.model.map((entry) => entry.id)
        });

        this.viewModel_ = <TimelineViewModel> {
            entries: response.model,
            events: events.model,
            arrows: new Array(),
            context: this.visibleWindow_
        };
        window.dispatchEvent(new Event('visiblewindowchanged'));
    }

    private updateVisibleWindow(entries: Array<TimelineEntry>) {
        entries.forEach((entry: TimelineEntry) => {
            this.visibleWindow_.min = Math.min(this.visibleWindow_.min, entry.startTime);
            this.visibleWindow_.max = Math.max(this.visibleWindow_.max, entry.endTime);
        });
        this.visibleWindow_.resolution = (this.visibleWindow_.max - this.visibleWindow_.min) / this.viewWidth_;
    }

    get viewModel() {
        return this.viewModel_;
    }

    private async updateViewModelEvents() {
        let filter: TimelineRequestFilter = {
            start: this.visibleWindow_.min,
            end: this.visibleWindow_.max,
            resolution: this.visibleWindow_.resolution,
            entries: this.viewModel_.entries.map((entry) => entry.id)
        };

        let response = await this.modelProvider_.fetchEvents(filter);
        this.viewModel_.events = response.model;
        window.dispatchEvent(new Event('visiblewindowchanged'));
    }

    public zoomIn(): void {
        let delta = this.visibleWindow_.max - this.visibleWindow_.min;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.min + (delta * 0.95));
        this.visibleWindow_.resolution = (this.visibleWindow_.max - this.visibleWindow_.min) / this.viewWidth_;
        this.updateViewModelEvents();
    }

    public zoomOut(): void {
        let delta = this.visibleWindow_.max - this.visibleWindow_.min;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.min + (delta * 1.05));
        this.visibleWindow_.resolution = (this.visibleWindow_.max - this.visibleWindow_.min) / this.viewWidth_;
        this.updateViewModelEvents();
    }

    public panLeft(): void {
        let delta = (this.visibleWindow_.max - this.visibleWindow_.min) * 0.05;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.max - delta);
        this.visibleWindow_.min = Math.round(this.visibleWindow_.min - delta);
        this.visibleWindow_.resolution = (this.visibleWindow_.max - this.visibleWindow_.min) / this.viewWidth_;
        this.updateViewModelEvents();
    }

    public panRight(): void {
        let delta = (this.visibleWindow_.max - this.visibleWindow_.min) * 0.05;
        this.visibleWindow_.max = Math.round(this.visibleWindow_.max + delta);
        this.visibleWindow_.min = Math.round(this.visibleWindow_.min + delta);
        this.visibleWindow_.resolution = (this.visibleWindow_.max - this.visibleWindow_.min) / this.viewWidth_;
        this.updateViewModelEvents();
    }

    private initKeys(): void {
        this.plus_ = new Key(107);
        this.plus_.press = this.zoomIn.bind(this);

        this.minus_ = new Key(109);
        this.minus_.press = this.zoomOut.bind(this);

        this.left_ = new Key(37);
        this.left_.press = this.panLeft.bind(this);

        this.right_ = new Key(39);
        this.right_.press = this.panRight.bind(this);
    }
}
