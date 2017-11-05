import { TimelineViewModel } from './timeline-viewmodel';
import { Colors } from './../ui/colors';

export class TimelineChart implements IChart {

    private graphicsContainer: PIXI.Container;
    private eventGraphics: Array<PIXI.Graphics>;
    private viewModel_: TimelineViewModel;

    private readonly colorMapping = {
        0: Colors.DIM_GREY,
        1: Colors.LA_RIOJA,
        2: Colors.ISLAMIC_GREEN,
        3: Colors.MEDIUM_BLUE,
        4: Colors.RUBY,
        5: Colors.TENNE,
        6: Colors.VERY_LIGHT_GREY
    }

    constructor() {
    }

    public draw() {
        this.clear();
        let visibleWindow = this.viewModel_.viewModelContext;

        for(let event of this.viewModel_.events) {
            let eventGraphic = this.eventGraphics[event.id];
            for(let state of event.states) {
                let style = this.colorMapping[state.value];
                if (style != undefined) {
                    let x = Math.round((Math.max(state.startTime, visibleWindow.min) - visibleWindow.min) / visibleWindow.resolution);
                    let y = (event.id + 1) * 20;
                    let width = Math.round(state.duration / visibleWindow.resolution);
                    let height = 15;

                    eventGraphic.beginFill(style, 1);
                    eventGraphic.drawRect(x, y, width, height);
                    eventGraphic.endFill();
                }
            }
        }
    }

    public clear() {
        this.eventGraphics.forEach((e: PIXI.Graphics) => e.clear());
    }

    set model(model: TimelineViewModel) {
        let previousModelEntriesCount = this.viewModel_ !== undefined ? this.viewModel_.entries.length : 0;
        if (previousModelEntriesCount != model.entries.length) {
            this.eventGraphics = new Array(this.viewModel_.entries.length);
            this.graphicsContainer.removeChildren();
            for(let i = 0; i < model.entries.length; ++i) {
                this.eventGraphics[i] = new PIXI.Graphics();
                this.graphicsContainer.addChild(this.eventGraphics[i]);
            }
        }
        this.viewModel_ = model;
        this.draw();
    }
}