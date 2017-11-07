
export interface XYViewModel {
    title: string;
    entries: Array<XYEntries>;
    series: Array<XYSeries>;
}

export interface XYSeries {
    name: string;
    x: Array<number>;
    y: Array<number>;
}

// TO DO
export interface XYEntries {
    id: number;
    parentId: number;
}
