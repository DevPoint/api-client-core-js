
import Observable from './Observable';
import ArrayObserver from './ArrayObserver';

class ObservableArray extends Observable { 

    _createObserver() {
        return new ArrayObserver();
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
}
