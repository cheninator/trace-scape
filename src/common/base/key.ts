/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

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
        e.preventDefault();
    }

    private upHandler(e: KeyboardEvent) {
        if (e.keyCode === this.code_) {
            if (this.isDown_ && this.release) {
                this.release();
            }
            this.isDown_ = false;
            this.isUp_ = true;
        }
        e.preventDefault();
    }
}
