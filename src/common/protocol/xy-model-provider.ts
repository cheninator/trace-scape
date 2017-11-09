import { ModelResponse } from './model-response';
import { XYEntries, XYSeries } from './../xy/xy-viewmodel';
import { XYResquestFilter } from './../filter/xy-request-filter';
import { Trace } from './../model/trace';

export interface IXYModelProvider {
    readonly trace: Trace;
    fetchEntries(filter: XYResquestFilter): Promise<ModelResponse<Array<XYEntries>>>;
    fetchData(filter: XYResquestFilter): Promise<ModelResponse<Array<XYSeries>>>;
}

export class DiskModelProvider implements IXYModelProvider {

    private serverUrl_: string;
    private readonly trace_: Trace;

    constructor(serverUrl: string, trace: Trace) {
        this.serverUrl_ = serverUrl;
        this.trace_ = trace;
    }

    get trace() {
        return this.trace_;
    }

    public fetchEntries(filter: XYResquestFilter): Promise<ModelResponse<Array<XYEntries>>> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'GET',
                    url: `${this.serverUrl_}/traces/${this.trace_.id}/DiskIO`,
                    contentType: 'application/x-www-form-urlencoded',
                    data: filter,
                    success: (response) => {
                        console.log(response);
                        let obj = <ModelResponse<Array<XYEntries>>> response;
                        resolve(obj);
                    },
                    error: (xhr, status, error) => {
                        reject(error);
                    },
                }
            );
        });
    }

    public fetchData(filter: XYResquestFilter): Promise<ModelResponse<Array<XYSeries>>> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'GET',
                    url: `${this.serverUrl_}/traces/${this.trace_.id}/DiskIO`,
                    contentType: 'application/x-www-form-urlencoded',
                    data: filter,
                    success: (response) => {
                        console.log(response);
                        let obj: ModelResponse<Array<XYSeries>> = {
                            status: response.status,
                            statusMessage: response.statusMessage,
                            model: [
                                {
                                    name: "test",
                                    x: response.model.xaxis,
                                    y: response.model.ydata["253,0 write"].data
                                }
                            ]
                        }
                        resolve(obj);
                    },
                    error: (xhr, status, error) => {
                        reject(error);
                    },
                }
            );
        });
    }
}
