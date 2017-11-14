import { IXYModelProvider } from './../xy-model-provider';
import { ModelResponse } from './../model-response';
import { XYEntries, XYSeries } from './../../xy/xy-viewmodel';
import { XYRequestFilter } from './../../filter/xy-request-filter';
import { Trace } from './../../model/trace';

export class CpuUsageModelProvider implements IXYModelProvider {

    private serverUrl_: string;
    private readonly trace_: Trace;

    constructor(serverUrl: string, trace: Trace) {
        this.serverUrl_ = serverUrl;
        this.trace_ = trace;
    }

    get trace() {
        return this.trace_;
    }

    // TODO
    public fetchEntries(): Promise<ModelResponse<Array<XYEntries>>> {
        return null;
    }

    // TODO
    public fetchData(filter: XYRequestFilter): Promise<ModelResponse<Array<XYSeries>>> {
        return null;
    }
}
