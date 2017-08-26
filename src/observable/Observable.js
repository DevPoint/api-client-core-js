
import ObservableException from './ObservableException';

class Observable { 

    constructor() {
        this._parentObserver = null;
        this._observer = null,
    }

    _createObserver() {
        return null;
    }

    addParentObserver(observer) {
        if (this._parentObserver !== null) {
            throw new ObservableException('Only 1 parent observer allowed!');
        }
        this._parentObserver = observer;
        return this;
    }

    removeParentObserver(observer) {
        if (observer !== null && this._parentObserver !== observer) {
            throw new ObservableException('Tried to remove unknown parent observer!');
        }
        this._parentObserver = null;
        return this;
    }

    get listeners() {
        return (this._observer) ? _observer.listeners : [];
    }

    get changed() {
        return (this._observer) ? _observer.changed : false;
    }

    addListener(listener) {
        if (!this._observer) {
            this._observer = this._createObserver();
        }
        this._observer.addListener(listener);
        return this;
    }

    removeListener(listener) {
        if (this._observer) {
            this._observer.removeListener(listener);
            if (this._observer.listeners.length == 0) {
                this._observer = null;
            }
        }
        return this;
    }

    clearChanged() {
        if (this._observer) {
            this._observer.clearChanged();
        }
        return this;
    }
}

default export Observable;