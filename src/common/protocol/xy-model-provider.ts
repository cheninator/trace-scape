import { ModelResponse } from './model-response';
import { XYEntries, XYSeries } from './../xy/xy-viewmodel';
import { BaseRequestFilter } from './../filter/base-request-filter';
import { XYRequestFilter } from './../filter/xy-request-filter';
import { Trace } from './../model/trace';

export interface IXYModelProvider {
    readonly trace: Trace;
    fetchEntries(filter: BaseRequestFilter): Promise<ModelResponse<Array<XYEntries>>>;
    fetchData(filter: XYRequestFilter): Promise<ModelResponse<Array<XYSeries>>>;
}
