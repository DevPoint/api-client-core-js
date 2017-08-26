
import Observer from './Observer';

class PropertyObserver extends Observer {

    constructor(type) {
        super(type);
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

default export PropertyObserver;
