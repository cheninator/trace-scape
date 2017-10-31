
export interface ITraceServerProtocol {
    fetchTree(): Promise<any>;
    fetchEvents(filter: any): Promise<any>;
    fetchArrows(): Promise<any>;
}

export class TraceServerProtocol implements ITraceServerProtocol {

    private serverUrl_: string;
    private traceId_: string;

    constructor(serverUrl: string, traceId: string) {
        this.serverUrl_ = serverUrl;
        this.traceId_ = traceId;
    }

    set serverUrl(serverUrl: string) {
        this.serverUrl_ = serverUrl;
    }

    set traceId(serverUrl: string) {
        this.serverUrl_ = serverUrl;
    }

    fetchTree() : Promise<any> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'GET',
                    url: `${this.serverUrl_}/tracecompass/traces/${this.traceId_}/ControlFlowView`,
                    contentType: 'application/x-www-form-urlencoded',
                    success: (response) => {
                        let obj = JSON.parse(response);
                        resolve(obj);
                    },
                    error: (xhr, status, error) => {
                        reject(error);
                    }
                }
            );
        });
    }

    fetchEvents(filter: any) : Promise<any> {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.open('POST', `${this.serverUrl_}/tracecompass/traces/${this.traceId_}/ControlFlowView/events`, true);
            req.setRequestHeader('Content-type', 'application/json');
            req.responseType = 'arraybuffer';

            req.onload = (oEvent) => {
                // Not oReq.responseText
                let arrayBuffer = req.response;
                if (arrayBuffer) {
                    let byteArray = new Uint8Array(arrayBuffer);
                    resolve(byteArray);
                }
            };

            req.onerror = (error) => {
                reject(error);
            };

            req.send(JSON.stringify(filter));
        });
    }

    fetchArrows() : Promise<any> {
        return null;
    }
}
