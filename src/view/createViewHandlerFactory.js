
function createViewHandlerFactory() {

    const _createViewHandler = function(viewFactory, observerFactory, loadingClient) {

        const _views = {};

        const _viewExists = function(viewId) {
            return _views.hasOwnProperty(viewId);
        };

        return {

            getViewByBuilder: function(viewBuilder) {
                const viewId = viewBuilder.itemType + '-' + viewBuilder->buildHash();
                if (!_viewExists(viewId)) {
                    _views[viewId] = viewFactory.createView(viewId, viewBuilder, this);
                }
                return _views[viewId];
            },

            getView: function(viewId) {
                return _viewExists(viedId) ? _view[viewId] : undefined;
            },

            loadView: function(viewId) {
                if (_viewExists(viewId)) {
                    //_views[viewId].handleLoadingInit(); => should be moved inside loading client
                    loadingClient.load(_views[viewId]);
                }
                return this;
            },

            createObserver: function() {
                return observerFactory.createViewObserver();
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
