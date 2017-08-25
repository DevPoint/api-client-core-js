
import { ObservableObject } from '../observable';

class ViewMap extends ObservableObject {

    constructor() {
        this._views = {};
    }

    exists(viewId) {
        return this._views.hasOwnProperty(viewId);
    }

    find(viewId) {
        return this.exists(viewId) 
            ? this._views[viewId] : undefined;
    }

    set(viewId, view) {
        this._views[viewId] = view;
        this._markAsChanged();
        return this;
    }

    remove(viewId) {
        delete this._views[viewId];
        this._markAsChanged();
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
