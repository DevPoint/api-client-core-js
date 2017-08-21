
import Observable from './Observable';
import MapObserver from './MapObserver';

class ObservableMap extends Observable { 

    constructor(wrapped) {
        this._wrapped = wrapped ? wrapped : new Map();
    }

    _createObserver() {
        return new MapObserver();
    }

    _markAsRead() {
        if (this._observer !== null) {
            this._observer.markAsRead();
        }
    }

    _markAsChanged() {
        if (this._observer !== null) {
            this._observer.markAsChanged();
        }
    }

    //
    // TODO: implement Map.prototype functions
    //
}
