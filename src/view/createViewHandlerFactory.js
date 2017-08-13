
function createViewHandlerFactory() {

    const _createViewHandler = function(viewFactory, observerHandler, loadingClient) {

        const _views = {};

        const _hasView = function(viewId) {
            return _views.hasOwnProperty(viewId);
        };

        return {

            create: function(itemType, viewBuilderProxy) {
                const viewId = viewBuilderProxy->hash() + '@view';
                if (!_hasView(viewId)) {
                    _views[viewId] = viewFactory.createView(viewId, itemType, viewBuilderProxy, this);
                }
                return _views[viewId];
            },

            load: function(viewBuilderProxy, view) {
                loadingClient.load(viewBuilderProxy, view);
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
