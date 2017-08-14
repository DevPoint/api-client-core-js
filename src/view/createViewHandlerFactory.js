
function createViewHandlerFactory() {

    const _createViewHandler = function(viewFactory, observerFactory, loadingClient) {

        const _views = {};

        const _hasView = function(viewId) {
            return _views.hasOwnProperty(viewId);
        };

        return {

            get changedObserversListeners() {
                const chancedListeners = [];
                for (let viewId in _views) {
                    const view = _views[viewId];
                    if (view.observed && view.observer.changed()) {
                        chancedListeners = chancedListeners.concat(
                            view.observer.listeners);
                    }
                }
                return chancedListeners;
            },

            create: function(itemType, viewBuilder) {
                const viewId = viewBuilder->buildHash() + '@view';
                if (!_hasView(viewId)) {
                    _views[viewId] = viewFactory.createView(viewId, itemType, viewBuilder, this);
                }
                return _views[viewId];
            },

            createObserver: function() {
                return observerFactory.createViewObjserver();
            },

            clearAllObserverChanges: function() {
                for (let viewId in _views) {
                    const view = _views[viewId];
                    if (view.observed) {
                        view.observer.clearAllChanges();
                    }
                }
                return this;
            },

            load: function(viewBuilder, view) {
                loadingClient.load(viewBuilder, view);
                return this;
            }
        }
    }

    return {

        createViewHandler: _createViewHandler,

    };

}

export default createViewHandlerFactory; 
