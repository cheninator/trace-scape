
export class Key {

    private isDown_: boolean;
    private isUp_: boolean;
    private code_: number;

    public press: Function;
    public release: Function;

    constructor(code: number) {
        this.code_ = code;
        this.press = undefined;
        this.release = undefined;

        // Attach event listeners
        window.addEventListener('keydown', this.downHandler.bind(this), false);
        window.addEventListener('keyup', this.upHandler.bind(this), false);
    }

    private downHandler(e: KeyboardEvent) {
        if (e.keyCode === this.code_) {
            if (this.isUp_ && this.press) {
                this.press();
            }
            this.isDown_ = true;
            this.isUp_ = false;
        }
        event.preventDefault();
    }

    private upHandler(e: KeyboardEvent) {
        if (e.keyCode === this.code_) {
            if (this.isDown_ && this.release) {
                this.release();
            }
            this.isDown_ = false;
            this.isUp_ = true;
        }
        event.preventDefault();
    }
}
