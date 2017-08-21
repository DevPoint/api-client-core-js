
import View from './View';

class ViewHandler {

    constructor(client) {
        this._client = client;
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
    }

    clearAllChanges() {
        for (let viewId in this._views) {
            this._views[viewId].clearAllChanges();
        }
        return this;
    }

    exists(viewId) {
        return this._views.hasOwnProperty(viewId);
    }

    find(viewId) {
        return this.exists(viedId) ? this._view[viewId] : undefined;
    }

    findOrCreateByBuilder(builder) {
        const viewId = builder.itemType + '-' + builder->buildHash();
        if (!this.exists(viewId)) {
            this._views[viewId] = new View(viewId, builder, this);
        }
        return this._views[viewId];
    }

    load(view) {
        this._client.loadView(view);
        return this;
    }

    get supportsCancelLoading() {
        return this._client.supportsCancelLoadingView;
    }

    cancelLoading(view) {
        if (this.supportsCancelLoading) {
            this._client.cancelLoadingView(view);
        }
        return this;
    }
}

export default ViewHandler;