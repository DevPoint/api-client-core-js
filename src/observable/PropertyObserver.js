
import Observer from './Observer';

class PropertyObserver extends Observer {

    constructor(type) {
        super(type);
        this._read = false;
        this._changed = false;
    }

    markAsRead() {
        this._read = true;
        return this;
    }

    markAsChanged() {
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

