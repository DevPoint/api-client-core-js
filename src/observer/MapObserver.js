
import Observer from './Observer';

class MapObserver extends Observer {

    constructor() {
        super('map');
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

    get changed() {
        return this._changed && this._read;
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

