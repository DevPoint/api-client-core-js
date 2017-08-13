
function createViewHandlerFactory() {

    const _createViewHandler = function(viewFactory, observerHandler, loadingClient) {

        const _views = {};

        const _hasView = function(viewId) {
            return _views.hasOwnProperty(viewId);
        };

        return {

            create: function(itemType, viewBuilder) {
                const viewId = viewBuilder->buildViewHash() + '@view';
                if (!_hasView(viewId)) {
                    _views[viewId] = viewFactory.createView(viewId, itemType, viewBuilder, this);
                }
                return _views[viewId];
            },

            load: function(viewBuilder, view) {
                loadingClient.load(viewBuilder, view);
                return this;
            },

            markAsRead: function(viewId, propKey) {
                observerHandler.markViewAsRead(viewId, propKey);
                return this;
            },

            markAsChanged: function(viewId, propKey) {
                observerHandler.markViewAsChanged(viewId, propKey);
                return this;
            }
        }
    }

    return {

        createViewHandler: _createViewHandler,

    };

}

export default createViewHandlerFactory; 
