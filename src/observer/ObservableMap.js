
import Observable from './Observable';
import MapObserver from './MapObserver';

class ObservableMap extends Observable { 

    constructor(wrapped) {
        this._wrapped = wrapped ? wrapped : new Map();
    }

    _createObserver() {
        return new MapObserver();
    }

    _markAsRead(key) {
        if (this._observer !== null) {
            this._observer.markAsRead(key);
        }
    }

    _markAsChanged(key) {
        if (this._observer !== null) {
            this._observer.markAsChanged(key);
        }
    }

    //
    // TODO: implement Map.prototype functions
    //
}
