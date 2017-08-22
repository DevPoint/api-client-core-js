
import Observer from './Observer';

class ArrayObserver extends Observer {

    constructor() {
        super('array');
        this._changed = false;
    }

    markAsChanged(propKey) {
        this._changed = true;
        return this;
    }

    get changed() {
        return this._changed;
    }

    clearChanged() {
        this._changed = false;
        return this;
    }
}

