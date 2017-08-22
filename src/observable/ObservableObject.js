
import Observable from './Observable';
import ObjectObserver from './ObjectObserver';

class ObservableObject extends Observable { 

    _createObserver() {
        return new ObjectObserver();
    }

    _markAsChanged() {
        if (this._observer !== null) {
            this._observer.markAsChanged();
        }
    }
}
