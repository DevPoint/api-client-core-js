
function createObserverHandlerFactory() {

    const _createObserverHandler = function(observerFactory, observerHandler, loadingClient) {

        const _viewObservers = {};

        const _viewObserverNumber = 1;

        const _transactionObservers = {};

        const _transactionObserverNumber = 1;

        return {

            hasViewObserver: function(viewId) {
                return _viewObservers.hasOwnProperty(observerId);
            },

            addViewObserver: function(viewId) {
                if (!this.hasViewObserver(viewId)) {
                    _viewObservers[viewId] = observerFactory.createViewObserver();
                }
                return _viewObservers[viewId];
            },

            removeViewObserver: function(viewId) {
                if (this.hasViewObserver(viewId)) {
                    delete _viewObservers[viewId];
                }
                return _viewObservers[viewId];
            },

            markViewAsRead: function(viewId, propKey) {
                if (this.hasViewObserver(viewId)) {
                    _viewObservers[viewId].markAsRead(propKey);
                }
                return this;
            },

            markViewAsChanged: function(viewId, propKey) {
                if (this.hasViewObserver(viewId)) {
                    _viewObservers[viewId].markAsChanged(propKey);
                }
                return this;
            },

            hasTransactionObserver: function(transactionId) {
                return _transactionObservers.hasOwnProperty(observerId);
            },

            addTransactionObserver: function(transactionId) {
                if (!this.hasTransactionObserver(transactionId)) {
                    _transactionObservers[transactionId] = observerFactory.createTransactionObserver();
                }
                return _transactionObservers[transactionId];
            },

            removeTransactionObserver: function(transactionId) {
                if (this.hasTransactionObserver(transactionId)) {
                    delete _transactionObservers[transactionId];
                }
                return _transactionObservers[transactionId];
            },

            markTransactionAsRead: function(transactionId, propKey) {
                if (this.hasTransactionObserver(transactionId)) {
                    _transactionObservers[transactionId].markAsRead(propKey);
                }
                return this;
            },

            markTransactionAsChanged: function(transactionId, propKey) {
                if (this.hasTransactionObserver(transactionId)) {
                    _transactionObservers[transactionId].markAsChanged(propKey);
                }
                return this;
            }
        }
    }

    return {

        createObserverHandler: _createObserverHandler,

    };

}

export default createObserverHandlerFactory; 
