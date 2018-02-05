/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

export class PerformanceMeter {

    private title: string;
    private times: number[];
    private startTime: number;

    public constructor(title: string) {
        this.title = title;
        this.times = new Array();
    }

    /**
     * Start a new execution time record
     */
    public start() {
        this.startTime = performance.now();
    }

    /**
     * If a time record was started, this will stop it and measures its execution
     * time.
     */
    public stop() {
        let end = performance.now();
        if (end > this.startTime) {
            this.times.push(end - this.startTime);
        }
    }

    /**
     * Prints the average execution time
     */
    public commit() {
        let sum = this.times.reduce((previous, current) => current += previous);
        let avg = sum / this.times.length;
        console.log("--- " + this.title + " ---");
        console.log("Average (Based on " + this.times.length + " repetitions): " + avg + " ms");
        for (let points of this.times) {
            console.log(points + " ms");
        }
        console.log();
    }
}