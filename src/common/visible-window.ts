
export class VisibleWindow {

    private min_: number;
    private max_: number;
    private resolution_: number;

    constructor(min: number, max: number, resolution: number) {
        this.min_ = min;
        this.max_ = max;
        this.resolution_ = resolution;
    }

    get min() {
        return this.min_;
    }

    set min(min: number) {
        this.min_ = min;
    }

    get max() {
        return this.max_;
    }

    set max(max: number) {
        this.max_ = max;
    }

    get resolution() {
        return this.resolution_;
    }

    set resolution(resolution: number) {
        this.resolution_ = resolution;
    }
}
