import { Trace } from './../model/trace';

export class TraceModelProvider {

    private serverUrl_: string;

    constructor(serverUrl: string) {
        this.serverUrl_ = serverUrl;
    }

    public getTraces(): Promise<Array<Trace>> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'GET',
                    url: `${this.serverUrl_}/traces`,
                    success: (response) => {
                        console.log(response);
                        let obj = <Array<Trace>> response;
                        resolve(obj);
                    },
                    error: (xhr, status, error) => {
                        reject(error);
                    },
                }
            );
        });
    }

    public putTrace(name: string, path: string): Promise<Trace> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'POST',
                    contentType: 'application/x-www-form-urlencoded',
                    url: `${this.serverUrl_}/traces`,
                    data: {
                        name: name,
                        path: path
                    },
                    success: (response) => {
                        console.log(response);
                        let obj = <Trace> response;
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