
import Observable from '../observable/Observable';
import ObjectObserver from './observable/ObjectObserver';

class CacheEntry extends Observable { 

    constructor() {
        super();
        this._observer = this._createObserver();
        this._observerLocked = true;
    }

    _createObserver() {
        return new ObjectObserver();
    }

    get changed() {
        return _observer.changed;
    }

    markAsChanged() {
        this._observer.markAsChanged();
        if (this._parentObserver !== null) {
            this._parentObserver.markAsChanged();
        }
    }

    toObject() {
        return {};
    }
}

default export CacheEntry;
