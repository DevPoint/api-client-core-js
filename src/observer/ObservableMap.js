
import Observable from './Observable';
import Observer from './Observer';

class ObservableMap extends Observable { 

    _createObserver() {
        return new Observer('map');
    }
}
