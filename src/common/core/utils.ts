/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

export class Utils {

    public static wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public static throttle(callback: Function, delay: number) {
        let lastCall = 0;

        return function() {
            const now = (new Date).getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            let args = Array.prototype.slice.call(arguments);
            return callback(args[0]);
        };
    }

    public static readonly BIG_BANG = "0";
    public static readonly ETERNITY = "9223372036854775807";
}
