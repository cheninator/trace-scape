/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../model/trace';

export class TraceModelProvider {

    private serverUrl_: string;

    constructor(serverUrl: string) {
        this.serverUrl_ = serverUrl;
    }

    public getTraces(): Promise<Array<Trace>> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'GET',
                    url: `${this.serverUrl_}/traces`,
                    success: (response) => {
                        resolve(<Array<Trace>> response);
                    },
                    error: (xhr, status, error) => {
                        reject(error);
                    },
                }
            );
        });
    }

    public putTrace(name: string, path: string): Promise<Trace> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    type: 'POST',
                    contentType: 'application/x-www-form-urlencoded',
                    url: `${this.serverUrl_}/traces/${name}`,
                    data: {
                        path: path
                    },
                    success: (response) => {
                        resolve(<Trace> response);
                    },
                    error: (xhr, status, error) => {
                        reject(error);
                    },
                }
            );
        });
    }
}
