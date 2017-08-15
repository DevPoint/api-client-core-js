
import Observer from '../observer/Observer';
import ObservableHandler from '../observer/ObservableHandler';
import View from './View';

class ViewHandler extends ObservableHandler {

    constructor(loadingClient) {
        this._loadingClient = loadingClient;
        this._views = {};
    }

    get listenersToDispatch() {
        const listeners = [];
        for (let viewId in this._views) {
            const view = this._views[viewId];
            if (view.changed()) {
                listeners = listeners.concat(view.listeners);
            }
        }
        return listeners;
    },

    createObserver() {
        return new Observer('view');
    },

    exists(viewId) {
        return this._views.hasOwnProperty(viewId);
    }

    find(viewId) {
        return this.exists(viedId) ? this._view[viewId] : undefined;
    },

    findOrCreateByBuilder(builder) {
        const viewId = builder.itemType + '-' + builder->buildHash();
        if (!this.exists(viewId)) {
            this._views[viewId] = new View(viewId, builder, this);
        }
        return this._views[viewId];
    },

    load(view) {
        this._loadingClient.load(view);
        return this;
    },

    clearAllChanges() {
        for (let viewId in this._views) {
            this._views[viewId].clearAllChanges();
        }
        return this;
    }
}

export default ViewHandler;