
import { ObservableObject } from '../observable';

class ViewMap extends ObservableObject {

    constructor() {
        this._views = {};
    }

    get changed() {
        let changed = super.changed();
        if (!changed) {
            for (let viewId in this._views) {
                if (this._views[viewId].changed()) {
                    changed = true;
                    break;
                }
            }
        }
        return changed;
    }

    clearAllChances() {
        super.clearAllChances();
        if (this.observed) {
            for (let viewId in this._views) {
                this._views[viewId].clearAllChances();
            }
        }
        return this;
    }

    exists(viewId) {
        this._markAsRead(viewId);
        return this._views.hasOwnProperty(viewId);
    }

    find(viewId) {
        this._markAsRead(viewId);
        return this.exists(viewId) 
            ? this._views[viewId] : null;
    }

    set(viewId, view) {
        this._views[viewId] = view;
        this._markAsChanged(viewId);
        return this;
    }

    clear(viewId) {
        delete this._views[viewId];
        this._markAsChanged(viewId);
        return this;
    }
}

export default ViewMap; 
