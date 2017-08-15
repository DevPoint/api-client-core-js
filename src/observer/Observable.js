
class Observable { 

    constructor(handler) {
        this._handler = handler;
        this._observer = null,
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

    get observed() {
        this._markAsRead('observed');
        return (this._observer !== null);
    }

    get listeners() {
        this._markAsRead('listeners');
        return (this.observed) ? _observer.listeners : [];
    }

    get changed() {
        this._markAsRead('changed');
        return (this.observed) ? _observer.changed : false;
    }

    addListener(listener) {
        if (!this.observed) {
            this._observer = this._handler.createObserver();
            this._markAsChanged('observed');
        }
        this._observer.addListener(listener);
        this._markAsChanged('listeners');
        return this;
    }

    removeListener(listener) {
        if (this.observed) {
            this._observer.removeListener(listener);
            this._markAsChanged('listeners');
            if (this._observer.listeners.length == 0) {
                this._observer = null;
                this._markAsChanged('observed');
            }
        }
        return this;
    }

    clearAllChances() {
        if (this.observed) {
            this._observer.clearAllChances();
            this._markAsChanged('changed');
        }
        return this;
    }
}

