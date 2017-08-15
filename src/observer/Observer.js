
class Observer {

    constructor(type) {
        this._type = type;
        this._readProps = {};
        this._changedProps = {};
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
        let changed = false;
        for (let propsKey in this._changedProps) {
            if (this._readProps.hasOwnProperty(propsKey)) {
                changed = true;
                break;
            }
        }
        return changed;
    }

    addListener(listener) {
        const listenerIndex = this._listenerIndex(listener);
        if (listenerIndex < 0) {
            this._listeners.push(listener);
        }
    },

    removeListener(listener) {
        const listenerIndex = this._listenerIndex(listener);
        if (listenerIndex >= 0) {
            this._listeners.splice(listenerIndex, 1);
        }
    },

    markAsRead(propKey) {
        this._readProps[propsKey] = true;
        return this;
    },

    markAsChanged(propKey) {
        this._changedProps[propsKey] = true;
        return this;
    },

    clearAllReads() {
        this._readProps = {};
        return this;
    }

    clearAllChanges() {
        this._changedProps = {};
        return this;
    }
}

