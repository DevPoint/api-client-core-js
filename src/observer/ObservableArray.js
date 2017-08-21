
import Observable from './Observable';
import Observer from './Observer';

class ObservableArray extends Observable { 

    _createObserver() {
        return new Observer('array');
    }
}
