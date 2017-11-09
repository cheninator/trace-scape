import { ModelResponse } from './model-response';
import { XYEntries, XYSeries } from './../xy/xy-viewmodel';
import { XYResquestFilter } from './../filter/xy-request-filter';
import { Trace } from './../model/trace';

export interface IXYModelProvider {
    readonly trace: Trace;
    fetchEntries(filter: XYResquestFilter): Promise<ModelResponse<Array<XYEntries>>>;
    fetchData(filter: XYResquestFilter): Promise<ModelResponse<Array<XYSeries>>>;
}
