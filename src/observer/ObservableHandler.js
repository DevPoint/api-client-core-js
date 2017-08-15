
import Observer from '../observer/Observer';

class ObservableHandler {

    get listenersToDispatch() {
        const listeners = [];
        return listeners;
    }

    createObserver() {
        return new Observer('base');
    }

    clearAllChanges() {
        return this;
    }
}

