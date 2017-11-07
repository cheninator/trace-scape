import { ModelResponse } from './model-response';
import { XYEntries, XYSeries } from './../xy/xy-viewmodel';

export interface IXYModelProvider {
    fetchEntries(): Promise<ModelResponse<XYEntries>>;
    fetchData(): Promise<XYSeries>;
}

export class DiskModelProvider implements IXYModelProvider {

    public fetchEntries(): Promise<ModelResponse<XYEntries>> {
        return null;
    }

    public fetchData(): Promise<XYSeries> {
        return null;
    }
}

export class CpuModelProvider implements IXYModelProvider {

    public fetchEntries(): Promise<any> {
        return null;
    }

    public fetchData(): Promise<any> {
        return null;
    }
}
