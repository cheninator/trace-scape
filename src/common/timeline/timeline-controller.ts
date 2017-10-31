import { ITraceServerProtocol, TraceServerProtocol } from './../protocol/trace-server-protocol';
import { Key } from './../key';

export class TimelineController {

    private traceServerProtocol: ITraceServerProtocol;
    private plus: Key;
    private minus: Key;
    private left: Key;
    private right: Key;

    constructor() {
        this.traceServerProtocol = new TraceServerProtocol('http://localhost:8080', 'trace2');
        this.initKeys();
    }

    public zoomIn() {
        console.log("TO DO");
    }

    public zoomOut() {
        console.log("TO DO");
    }

    public panLeft() {
        console.log("TO DO");
    }

    public panRight() {
        console.log("TO DO");
    }

    private initKeys() {
        this.plus = new Key(107);
        this.plus.press = this.zoomIn;

        this.minus = new Key(109);
        this.minus.press = this.zoomOut;

        this.left = new Key(37);
        this.left.press = this.panLeft;

        this.right = new Key(39);
        this.right.press = this.panRight;
    }
}
