/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

 export interface IDictionary<T> {
    add(key: string, value: T): void;
    remove(key: string): void;
    clear(): void;
    contains(key: string): boolean;
    count(): number;
    get(key: string): T;
    values(): Array<T>;
 }

 export class Dictionary<T> implements IDictionary<T> {

    private items_ : { [key: string] : T };
    private count_: number;

    constructor() {
        this.items_ = {};
    }

    public add(key: string, value: T) {
        if (this.items_.hasOwnProperty(key)) {
            throw new Error("Key already exists");
        }
        this.items_[key] = value;
        this.count_++;
    }

    public contains(key: string): boolean {
        return this.items_.hasOwnProperty(key);
    }

    public remove(key: string) {
        let value = this.items_[key];
        if (this.items_[key] !== undefined) {
            this.count_--;
        }
        delete this.items_[key];
    }

    public clear() {
        delete this.items_;
        this.items_ = {};
    }

    public count(): number {
        return this.count_;
    }

    public get(key: string): T {
        return this.items_[key];
    }

    public values(): Array<T> {
        let values = new Array();

        for (let prop in this.items_) {
            if (this.items_.hasOwnProperty(prop)) {
                values.push(this.items_[prop]);
            }
        }
        return values;
    }
 }
