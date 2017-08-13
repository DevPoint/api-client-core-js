
function createViewHandlerFactory() {

    const _createViewHandler = function(viewFactory, loadingHandler, observerHandler) {

        return {
            create: function(observerHandler) {
                return viewFactory.creatView(observerHandler);
            },

            load: function(viewId, viewProxy) {
                return this;
            },

            markAsRead: function(viewId, propKey) {
                observerHandler.markViewAsRead(viewId, propKey);
                return this;
            },

            markAsChanged: function(viewId, propKey) {
                observerHandler.markViewAsChanged(viewId, propKey);
                return this;
            },

        }
    }

    return {

        createViewHandler: _createViewHandler,

    };

}

export default createViewHandlerFactory; 
