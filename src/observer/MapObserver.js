
import Observer from './Observer';

class MapObserver extends Observer {

    constructor() {
        super('map');
        this._readProps = {};
        this._changedProps = {};
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

    markAsRead(propKey) {
        this._readProps[propsKey] = true;
        return this;
    }

    markAsChanged(propKey) {
        this._changedProps[propsKey] = true;
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

