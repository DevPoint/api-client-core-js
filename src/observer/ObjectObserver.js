
import Observer from './Observer';

class ObjectObserver extends Observer {

    constructor() {
        super('object');
        this._readProps = {};
        this._changedProps = {};
    }

    get changed() {
        let changed = false;
        for (let propKey in this._changedProps) {
            if (this._readProps.hasOwnProperty(propKey)) {
                changed = true;
                break;
            }
        }
        return changed;
    }

    clearAllReads() {
        this._readProps = {};
        return this;
    }

    clearAllChanges() {
        this._changedProps = {};
        return this;
    }

    markAsRead(propKey) {
        this._readProps[propKey] = true;
        return this;
    }

    markAsChanged(propKey) {
        this._changedProps[propKey] = true;
        return this;
    }
}

