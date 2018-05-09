/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Http } from './core/http';
import { TraceManager } from './core/trace-manager';
import { EventType } from './base/events';
import { Trace } from './core/model/trace';

export class TraceUploaderWidget {

    private inputFileElement_: HTMLInputElement;
    private buttonElement_: HTMLElement;
    private serverUrl_: string;

    constructor(inputFileElement: HTMLElement, buttonElement: HTMLElement, serverUrl: string) {
        this.inputFileElement_ = inputFileElement as HTMLInputElement;
        this.buttonElement_ = buttonElement;
        this.serverUrl_ = serverUrl;

        this.buttonElement_.addEventListener('click', this.upload.bind(this));
    }

    private async upload() {
        let file = this.inputFileElement_.files[0];
        let trace = await TraceManager.getInstance(this.serverUrl_).uploadTraceFile(file);

        await TraceManager.getInstance(this.serverUrl_).openTrace(trace.name, trace.path);
        window.dispatchEvent(new CustomEvent(EventType.TRACE_UPLOADED, {}));
        this.inputFileElement_.value = "";
    }
}
