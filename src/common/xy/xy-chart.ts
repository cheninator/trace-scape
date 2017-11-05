
export class XYChart implements IChart {

    constructor(id: string) {
        let element = <HTMLCanvasElement> document.getElementById(id);
        let ctx = element.getContext('2d');
    }

    public draw() {

    }

    public clear() {
        
    }
}