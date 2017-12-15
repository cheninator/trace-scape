/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Trace } from './../model/trace';
import { STATUS_CODES } from 'http';

export interface ITraceModelProvider {
    getTraces(): Promise<Array<Trace>>;
    putTrace(name: string, path: string): Promise<Trace>;
    removeTrace(name: string): Promise<boolean>;
}

export class TraceModelProvider implements ITraceModelProvider {

    private serverUrl_: string;

    constructor(serverUrl: string) {
        this.serverUrl_ = serverUrl;
    }

    public getTraces(): Promise<Array<Trace>> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    method: 'GET',
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

    public removeTrace(name: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    method: 'DELETE',
                    url: `${this.serverUrl_}/traces/${name}`,
                    success: (response, status, xhr) => {
                        resolve(true);
                    },
                    error: (xhr, status, error) => {
                        reject(error);
                    },
                }
            );
        });
    }
}
