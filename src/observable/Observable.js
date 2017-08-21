
class Observable { 

    constructor() {
        this._observer = null,
    }

    _createObserver() {
        return null;
    }

    get observed() {
        return (this._observer !== null);
    }

    get listeners() {
        return (this.observed) ? _observer.listeners : [];
    }

    get changed() {
        return (this.observed) ? _observer.changed : false;
    }

    addListener(listener) {
        if (!this.observed) {
            this._observer = this._createObserver();
        }
        this._observer.addListener(listener);
        return this;
    }

    removeListener(listener) {
        if (this.observed) {
            this._observer.removeListener(listener);
            if (this._observer.listeners.length == 0) {
                this._observer = null;
            }
        }
        return this;
    }

    clearAllChances() {
        if (this.observed) {
            this._observer.clearAllChances();
        }
        return this;
    }
}
