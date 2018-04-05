/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Http } from './core/http';

export class TraceUploaderWidget {

    private readonly serverUrl_: string;
    private readonly DEFAULT_UPLOAD_ROOT = "/home/yonni/Documents/traces/";

    private inputFileElement_: HTMLInputElement;
    private buttonElement_: HTMLElement;
    private uploadRoot_: string;

    constructor(inputFileElement: HTMLElement, buttonElement: HTMLElement, serverUrl: string) {
        this.serverUrl_ = serverUrl;
        this.inputFileElement_ = inputFileElement as HTMLInputElement;
        this.buttonElement_ = buttonElement;

        this.buttonElement_.addEventListener('click', this.upload.bind(this));
    }

    set uploadRoot(path: string) {
        this.uploadRoot_ = path;
    }

    private async upload() {
        let url = `${this.serverUrl_}/traces`;
        let file = this.inputFileElement_.files[0];
        let data = new FormData();
        data.append('file', file);

        let rootPath = this.uploadRoot_ === undefined ? this.DEFAULT_UPLOAD_ROOT : this.uploadRoot_;
        data.append('path', rootPath);

        Http.put(url, data, {
            method: 'PUT',
            mode: 'cors',
            body: data
        });
    }
}
