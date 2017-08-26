
import Observer from './Observer';

class ArrayObserver extends Observer {

    constructor() {
        super('array');
        this._changed = false;
    }

    get changed() {
        return this._changed;
    }

    markAsChanged(propKey) {
        this._changed = true;
        return this;
    }

    clearChanged() {
        this._changed = false;
        return this;
    }
}

default export ArrayObserver;