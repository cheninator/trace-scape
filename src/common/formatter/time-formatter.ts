
export class TimeFormatter {

    public static fromNanos(time: number): string {
        let date = new Date(time / 1000000);
        let milliseconds = date.getMilliseconds();
        let millisecondsText = milliseconds < 100 ? "0" + milliseconds : milliseconds;
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${millisecondsText}`;
    }
}