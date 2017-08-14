
function createViewHandlerFactory() {

    const _createViewHandler = function(viewFactory, observerFactory, loadingClient) {

        const _views = {};

        return {

            hasRegisteredView: function(viewId) {
                return (_views.hasOwnProperty(viewId));
            },

            getRegisteredView: function(viewId) {
                return this.hasRegisteredView(viedId) ? _view[viewId] : undefined;
            },

            registerView: function(view) {
                _views[view.viewId] = view;
                return this;
            },

            unregisterView: function(view) {
                delete _views[view.viewId];
            },

            createView: function(itemType, viewBuilder) {
                const viewId = itemType + '-' + viewBuilder->buildHash();
                return viewFactory.createView(viewId, itemType, viewBuilder, this);
            },

            createObserver: function() {
                return observerFactory.createViewObserver();
            },

            load: function(viewBuilder, view) {
                loadingClient.load(viewBuilder, view);
                return this;
            },

            get listenersToDispatchChanged() {
                const listeners = [];
                for (let viewId in _views) {
                    const view = _views[viewId];
                    if (view.changed()) {
                        listeners = listeners.concat(view.listeners);
                    }
                }
                return listeners;
            },

            clearAllChanges: function() {
                for (let viewId in _views) {
                    _views[viewId].clearAllChanges();
                }
                return this;
            }
        }
    }

    return {

        createViewHandler: _createViewHandler,

    };

}

export default createViewHandlerFactory; 
