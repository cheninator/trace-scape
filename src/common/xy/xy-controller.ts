import { IXYModelProvider } from './../protocol/xy-model-provider';
import { XYResquestFilter } from './../filter/xy-request-filter';
import { VisibleWindow } from './../visible-window';
import { XYViewModel } from './xy-viewmodel';
import { Utils } from './../utils';

export class XYController {

    private modelProvider_: IXYModelProvider;
    private visibleWindow: VisibleWindow;
    private viewModel_: XYViewModel;

    constructor(modelProvider: IXYModelProvider) {
        this.modelProvider_ = modelProvider;
    }

    public async inflate() {
        if (this.visibleWindow === undefined) {
            let filter: XYResquestFilter = {
                start: this.modelProvider_.trace.startTime,
                end: this.modelProvider_.trace.endTime,
                count: 100
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
        }
    }

    get viewModel() {
        return this.viewModel_;
    }
}
