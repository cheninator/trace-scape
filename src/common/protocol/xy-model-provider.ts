import { ModelResponse } from './model-response';
import { XYEntries, XYSeries } from './../xy/xy-viewmodel';

export interface IXYModelProvider {
    fetchEntries(): Promise<ModelResponse<XYEntries>>;
    fetchData(): Promise<ModelResponse<XYSeries>>;
}

export class DiskModelProvider implements IXYModelProvider {

    private serverUrl_: string;
    private traceId_: string;

    constructor(serverUrl: string, traceId: string) {
        this.serverUrl_ = serverUrl;
        this.traceId_ = traceId;
    }

    public fetchEntries(): Promise<ModelResponse<XYEntries>> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'GET',
                    url: `${this.serverUrl_}/traces/${this.traceId_}/disk`,
                    contentType: 'application/x-www-form-urlencoded',
                    success: (response) => {
                        let obj = <ModelResponse<XYEntries>> response;
                        resolve(obj);
                    },
                    error: (xhr, status, error) => {
                        reject(error);
                    },
                }
            );
        });
    }

    public fetchData(): Promise<ModelResponse<XYSeries>> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'GET',
                    url: `${this.serverUrl_}/traces/${this.traceId_}/disk`,
                    contentType: 'application/x-www-form-urlencoded',
                    success: (response) => {
                        let obj = <ModelResponse<XYSeries>> response;
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

export class CpuModelProvider implements IXYModelProvider {

    private serverUrl_: string;
    private traceId_: string;

    constructor(serverUrl: string, traceId: string) {
        this.serverUrl_ = serverUrl;
        this.traceId_ = traceId;
    }

    public fetchEntries(): Promise<any> {
        return null;
    }

    public fetchData(): Promise<any> {
        return null;
    }
}
