import { TimelineRowModel, TimelineEntry, TimelineArrow } from './../timeline/timeline-viewmodel';

export interface ITimelineModelProvider {
    fetchEntries(): Promise<Array<TimelineEntry>>;
    fetchEvents(filter: any): Promise<Array<TimelineRowModel>>;
    fetchArrows(): Promise<TimelineArrow>;
}

export class ControlFlowModelProvider implements ITimelineModelProvider {

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

    public fetchEntries() : Promise<Array<TimelineEntry>> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'GET',
                    url: `${this.serverUrl_}/tracecompass/traces/${this.traceId_}/ControlFlowView`,
                    contentType: 'application/x-www-form-urlencoded',
                    success: (response) => {
                        let obj = <Array<TimelineEntry>> JSON.parse(response);
                        resolve(obj);
                    },
                    error: (xhr, status, error) => {
                        reject(error);
                    },
                }
            );
        });
    }

    public fetchEvents(filter: any) : Promise<Array<TimelineRowModel>> {
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
                    resolve(null);
                    //resolve(byteArray);
                }
            };

            req.onerror = (error) => {
                reject(error);
            };

            req.send(JSON.stringify(filter));
        });
    }

    public fetchArrows() : Promise<TimelineArrow> {
        return null;
    }
}
