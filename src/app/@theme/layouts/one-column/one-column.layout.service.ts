import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OneColumnLayoutService {
    public change: EventEmitter<boolean> = new EventEmitter();
    constructor() { }

    emitChangeEvent(bool: boolean): void {
        this.change.emit(bool);
    }

    getChangeEmitter() {
        return this.change;
    }
}