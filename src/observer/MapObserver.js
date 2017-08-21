
import Observer from './Observer';

class MapObserver extends Observer {

    constructor() {
        super('map');
        this._readProps = {};
        this._changedProps = {};
    }

    get changed() {
        let changed = false;
        for (let key in this._changedProps) {
            if (this._readProps.hasOwnProperty(key)) {
                changed = true;
                break;
            }
        }
        return changed;
    }

    markAsRead(key) {
        this._readProps[key] = true;
        return this;
    }

    markAsChanged(key) {
        this._changedProps[key] = true;
        return this;
    }

    clearAllReads() {
        this._readProps = {};
        return this;
    }

    clearAllChanges() {
        this._changedProps = {};
        return this;
    }
}

