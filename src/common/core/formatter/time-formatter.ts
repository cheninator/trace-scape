/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

export class TimeFormatter {

    public static fromNanos(time: number): string {
        let date = new Date(time / 1000000);
        let milliseconds = date.getMilliseconds();
        let millisecondsText = milliseconds < 100 ? "0" + milliseconds : milliseconds;
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${millisecondsText}`;
    }
}
