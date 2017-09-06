
import ObserverException from './ObserverException';

class Observer {

    constructor(type) {
        this._type = type;
        this._listeners = [];
    }

    _listenerIndex(listener) {
        return this._listeners.indexOf(listener);
    }

    get type() {
        return this._type;
    }

    get listeners() {
        return this._listeners;
    }

    get changed() {
        return false;
    }

    clearChanged() {
        return this;
    }

    addListener(listener) {
        const listenerIndex = this._listenerIndex(listener);
        if (listenerIndex >= 0) {
            throw new ObserverException('Tried to add the same listener twice!');
        }
        this._listeners.push(listener);
    }

    removeListener(listener) {
        const listenerIndex = this._listenerIndex(listener);
        if (listenerIndex < 0) {
            throw new ObserverException('Tried to remove unknown listener!');
        }
        this._listeners.splice(listenerIndex, 1);
    }
}

export default Observer;