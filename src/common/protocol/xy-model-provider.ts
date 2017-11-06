
export interface IXYModelProvider {
    fetchEntries(): Promise<any>;
    fetchData(): Promise<any>;
}

export class DiskModelProvider implements IXYModelProvider {

    public fetchEntries(): Promise<any> {
        return null;
    }

    public fetchData(): Promise<any> {
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
}
