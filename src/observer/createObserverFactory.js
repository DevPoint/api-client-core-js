
function createObserverFactory() {

    const _createObserver = function() {

        const _views = {};

        const _transactions = {};

        const _listeners = [];

        const _view = function(viewId) {
            if (!_views.hasOwnProperty(viewId)) {
                _views[viewId] = {
                    readProps: {},
                    changedProps: {},
                    listeners: []
                };
            }
            return _views[viewId];
        };

        const _viewChangedPropCount = function(view) {
            let changedPropCount = 0;
            for (let propKey in view.changedProps) {
                changedPropCount += view.readProps.hasOwnProperty(propKey) ? 1 : 0;
            }
            return changedPropCount;
        };

        const _viewListenerIndex = function(view) {
            return view.listeners.indexOf(listener);
        };

        const _transaction = function(transactionId) {
            if (!_transactions.hasOwnProperty(transactionId)) {
                _transactions[transactionId] = {
                    readProps: {},
                    changedProps: {},
                    listeners: []
                };
            }
            return _transactions[transactionId];
        };

        const _transactionChangedPropCount = function(transaction) {
            let changedPropCount = 0;
            for (let propKey in transaction.changedProps) {
                changedPropCount += transaction.readProps.hasOwnProperty(propKey) ? 1 : 0;
            }
            return changedPropCount;
        };

        const _transactionListenerIndex = function(transaction) {
            return transaction.listeners.indexOf(listener);
        };

        const _listenerIndex = function(listener) {
            return _listeners.indexOf(listener);
        };

        return {

            addViewListener: function(viewId, listener) {
                const view = _view(viewId);
                const listenerIndex = _viewListenerIndex(view, listener);
                if (listenerIndex < 0) {
                    view.listeners.push(listener);
                }
            },

            removeViewListener: function(viewId, listener) {
                const view = _view(viewId);
                const listenerIndex = _viewListenerIndex(view, listener);
                if (listenerIndex >= 0) {
                    view.listeners.splice(listenerIndex, 1);
                }
            },

            markViewAsRead: function(viewId, propKey) {
                _view(viewId).readProps[propsKey] = true;
            },

            markViewAsChanged: function(viewId, propKey) {
                _view(viewId).changedProps[propsKey] = true;
            },

            addTransactionListener: function(transactionId, listener) {
                const transaction = _transaction(transactionId);
                const listenerIndex = _transactionListenerIndex(transaction, listener);
                if (listenerIndex < 0) {
                    transaction.listeners.push(listener);
                }
            },

            removeTransactionListener: function(transactionId, listener) {
                const transaction = _transaction(transactionId);
                const listenerIndex = _transactionListenerIndex(transaction, listener);
                if (listenerIndex >= 0) {
                    transaction.listeners.splice(listenerIndex, 1);
                }
            },

            markTransactionAsRead: function(transactionId, propKey) {
                _transaction(transactionId).readProps[propsKey] = true;
            },

            markTransactionAsChanged: function(transactionId, propKey) {
               _transaction(transactionId).changedProps[propsKey] = true;
            },

            addListener: function(listener) {
                const listenerIndex = _listenerIndex(listener);
                if (listenerIndex < 0) {
                    _listeners.push(listener);
                }
            },

            removeListener: function(listener) {
                const listenerIndex = _listenerIndex(listener);
                if (listenerIndex >= 0) {
                    _listeners.splice(listenerIndex, 1);
                }
            },

            dispatchChanges: function() {
                let changedPropCount = 0;
                const listenersToDispatch = []
                for (let view in _views) {
                    const viewChangedPropCount = _viewChangedPropCount(view);
                    changedPropCount += viewChangedPropCount;
                    view.changedProps = {};
                    if (viewChangedPropCount) {
                        for (let i = 0; i < view.listeners.length; i++) {
                            listenersToDispatch.push(view.listeners[i]);
                        }
                    }
                }
                for (let transaction in _transactions) {
                    const transactionChangedPropCount = _transactionChangedPropCount(transaction);
                    changedPropCount += transactionChangedPropCount;
                    transaction.changedProps = {};
                    if (transactionChangedPropCount) {
                        for (let i = 0; i < transaction.listeners.length; i++) {
                            listenersToDispatch.push(transaction.listeners[i]);
                        }
                    }
                }
                if (changedPropCount > 0) {
                    for (let i = 0; i < _listeners.length; i++) {
                        listenersToDispatch.push(_listeners[i]);
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

        createObserver: _createObserver,

    };

}

export default createObserverFactory; 
