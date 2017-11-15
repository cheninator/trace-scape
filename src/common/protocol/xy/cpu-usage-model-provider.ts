import { IXYModelProvider } from './../xy-model-provider';
import { ModelResponse } from './../model-response';
import { XYEntries, XYSeries } from './../../xy/xy-viewmodel';
import { BaseRequestFilter } from './../../filter/base-request-filter';
import { XYRequestFilter } from './../../filter/xy-request-filter';
import { Trace } from './../../model/trace';

export class CpuUsageModelProvider implements IXYModelProvider {

    private serverUrl_: string;
    private readonly trace_: Trace;
    private readonly providerID_: string = 'org.eclipse.tracecompass.analysis.os.linux.core.cpuusage.CpuUsageDataProvider';

    constructor(serverUrl: string, trace: Trace) {
        this.serverUrl_ = serverUrl;
        this.trace_ = trace;
    }

    get trace() {
        return this.trace_;
    }

    public fetchEntries(filter: BaseRequestFilter): Promise<ModelResponse<Array<XYEntries>>> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'GET',
                    url: `${this.serverUrl_}/traces/${this.trace_.name}/${this.providerID_}`,
                    contentType: 'application/x-www-form-urlencoded',
                    data: filter,
                    success: (response) => {
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

    public fetchData(filter: XYRequestFilter): Promise<ModelResponse<Array<XYSeries>>> {
        console.log(JSON.stringify(filter));
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'POST',
                    url: `${this.serverUrl_}/traces/${this.trace_.name}/${this.providerID_}/xy`,
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(filter),
                    success: (response) => {
                        let series = new Array();
                        for (let i in response.model.ydata) {
                            series.push({
                                name: response.model.ydata[i].name,
                                x: response.model.xaxis,
                                y: response.model.ydata[i].data
                            });
                        }

                        let obj: ModelResponse<Array<XYSeries>> = {
                            status: response.status,
                            statusMessage: response.statusMessage,
                            model: series
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
