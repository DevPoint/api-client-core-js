
import Observable from './Observable';
import Observer from './Observer';

class ObservableObject extends Observable { 

    _createObserver() {
        return new Observer('object');
    }
}
