
export interface XYViewModel {
    title: string;
    series: Array<XYSeries>;
}

export interface XYSeries {
    name: string;
    x: Array<number>;
    y: Array<number>;
}
