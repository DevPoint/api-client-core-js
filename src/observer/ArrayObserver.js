
import Observer from './Observer';

class ArrayObserver extends Observer {

    constructor() {
        super('array');
        this._read = false;
        this._changed = false;
    }

    markAsRead() {
        this._read = true;
        return this;
    }

    markAsChanged(propKey) {
        this._changed = true;
        return this;
    }

    clearAllReads() {
        this._read = false;
        return this;
    }

    clearAllChanges() {
        this._changed = false;
        return this;
    }
}
