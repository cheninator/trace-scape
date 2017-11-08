import { IXYModelProvider } from './../protocol/xy-model-provider';
import { XYViewModel } from './xy-viewmodel';

export class XYController {

    private modelProvider_: IXYModelProvider;
    private viewModel_: XYViewModel;

    constructor(modelProvider: IXYModelProvider) {
        this.modelProvider_ = modelProvider;
    }

    public inflate() {
        
    }

    get viewModel() {
        return this.viewModel_;
    }
}