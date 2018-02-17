/*
* Copyright (C) 2018 École Polytechnique de Montréal
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

export class Http {

    private static request(method: string, url: string, body?: any, options?: RequestInit) {

        return fetch(url, options || {
            method: method,
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: body.toString()
        }).then(r => r.text())
        .then(text => text ? JSON.parse(text) : null);
    }

    public static async get(url: string, body?: any, options?: RequestInit): Promise<any> {
        return this.request('GET', url, body, options);
    }

    public static async post(url: string, body: any, options?: RequestInit): Promise<any> {
        return this.request('POST', url, body, options);
    }

    public static async put(url: string, body: any, options?: RequestInit): Promise<any> {
        return this.request('PUT', url, body, options);
    }

    public static async delete(url: string, body?: any, options?: RequestInit): Promise<any> {
        return this.request('DELETE', url, body, options);
    }
}
