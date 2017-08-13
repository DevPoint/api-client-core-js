
function createViewHandlerFactory() {

    const _createViewHandler = function(viewFactory, observerHandler, loadingHandler) {

        const _views = {};

        const _hasView = function(viewId) {
            return _views.hasOwnProperty(viewId);
        };

        return {

            create: function(itemType, builderProxy) {
                const viewId = builderProxy->hash() + '@view';
                if (!_hasView(viewId)) {
                    _views[viewId] = viewFactory.creatView(viewId, itemType, builderProxy, this);
                }
                return _views[viewId];
            },

            load: function(viewId, viewProxy) {
                if (_hasView(viewId)) {
                    loadingHandler.load(_views[viedId], viewProxy);
                }
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
