
import Observable from './Observable';
import ObjectObserver from './ObjectObserver';

class ObservableObject extends Observable { 

    _createObserver() {
        return new ObjectObserver();
    }

    _markAsRead(propKey) {
        if (this._observer !== null) {
            this._observer.markAsRead(propKey);
        }
    }

    _markAsChanged(propKey) {
        if (this._observer !== null) {
            this._observer.markAsChanged(propKey);
        }
    }
}
