
import Observer from './Observer';

class ObjectObserver extends Observer {

    constructor() {
        super('object');
        this._changed = false;
    }

    get changed() {
        return this._changed;
    }

    markAsChanged() {
        this._changed = true;
        return this;
    }

    clearChanged() {
        this._changed = false;
        return this;
    }
}

default export ObjectObserver;

