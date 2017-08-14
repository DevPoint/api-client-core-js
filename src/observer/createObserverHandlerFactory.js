
function createObserverHandlerFactory() {

    const _createObserverHandler = function(observerFactory, observerHandler, loadingClient) {

        const _viewObservers = {};

        const _transactionObservers = {};

        return {

            hasViewObserver: function(viewId) {
                return _viewObservers.hasOwnProperty(observerId);
            },

            addViewObserver: function(viewId) {
                if (!this.hasViewObserver(viewId)) {
                    _viewObservers[viewId] = observerFactory.createViewObserver(viewId);
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
                    _transactionObservers[transactionId] = observerFactory.createTransactionObserver(transactionId);
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
            },

            dispatchChanges: function() {
                const listenersToDispatch = []
                for (let viewId in _viewObjservers) {
                    const viewObserver = _viewObjservers[viewId];
                    if (viewObserver.changed()) {
                        viewObserver.clearAllChanges();
                        const listeners = viewObserver.listeners;
                        for (let i = 0; i < listeners.length; i++) {
                            listenersToDispatch.push(listeners[i]);
                        }
                    }
                }
                for (let transactionId in _transactionObjservers) {
                    const transactionObserver = _transactionObjservers[transactionId];
                    if (transactionObserver.changed()) {
                        transactionObserver.clearAllChanges();
                        const listeners = transactionObserver.listeners;
                        for (let i = 0; i < listeners.length; i++) {
                            listenersToDispatch.push(listeners[i]);
                        }
                    }
                }
                const uniqueListeners = listenersToDispatch.filter((v, i, a) => a.indexOf(v) === i);
                for (let i = 0; i < uniqueListeners.length; i++) {
                    uniqueListeners[i]();
                }
            }
        }
    }

    return {

        createObserverHandler: _createObserverHandler,

    };

}

export default createObserverHandlerFactory; 
