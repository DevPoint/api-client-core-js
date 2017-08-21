
import Observable from './Observable';
import MapObserver from './MapObserver';

class ObservableMap extends Observable { 

    _createObserver() {
        return new MapObserver();
    }
}
