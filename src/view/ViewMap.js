
import { ObservableObject } from '../observable';

class ViewMap extends ObservableObject {

    constructor() {
        this._views = {};
    }

    _remove(viewId) {
        const view = this.find(viewId);
        view.removeParentObserver(this.observer);
        delete this._views[viewId];
        this._markAsChanged();
    }

    ids() {
        return Object.keys(this._views);
    }

    exists(viewId) {
        return this._views.hasOwnProperty(viewId);
    }

    find(viewId) {
        return this.exists(viewId) 
            ? this._views[viewId] : undefined;
    }

    set(viewId, view) {
        if (this.exists(viewId)) {
            this._remove(viewId);
        }
        this._views[viewId] = view;
        view.addParentObserver(this.observer);
        this._markAsChanged();
        return this;
    }

    remove(viewId) {
        if (this.exists(viewId)) {
            this._remove(viewId);
        }
        return this;
    }

    findAllChanged() {
        const changedViews = [];
        for (let viewId in this._views) {
            const view = this._views[viewId];
            if (view.changed()) {
                changedViews.push(view));
                break;
            }
        }
        return changedViews;
    }
}

export default ViewMap; 
