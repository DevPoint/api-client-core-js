
function createObserverFactory() {

    const _createObserver = function() {

        const _listeners = [];

        const _views = {};

        const _transactions = {};

        const _view = function(viewId) {
            if (!_views.hasOwnProperty(viewId)) {
                _views[viewId] = {
                    readProps: {},
                    changedProps: {}
                };
            }
            return _views[viewId];
        };

        const _changedViewPropCount = function(view) {
            let changedPropCount = 0;
            for (let propKey in view.changedProps) {
                changedPropCount += view.readProps.hasOwnProperty(propKey) ? 1 : 0;
            }
            return changedPropCount;
        };

        const _viewListenerIndex = function(view) {
            let listenerIndex = -1;
            for (let i = 0; i < view.listeners.length; i++) {
                if (view.listeners[i] === listener) {
                    listenerIndex = i;
                    break;
                }
            }
            return listenerIndex;
        };

        const _transaction = function(transactionId) {
            if (!_transactions.hasOwnProperty(transactionId)) {
                _transactions[transactionId] = {
                    readProps: {},
                    changedProps: {}
                };
            }
            return _transactions[transactionId];
        };

        const _changedTransactionPropCount = function(transaction) {
            let changedPropCount = 0;
            for (let propKey in transaction.changedProps) {
                changedPropCount += transaction.readProps.hasOwnProperty(propKey) ? 1 : 0;
            }
            return changedPropCount;
        };

        const _transactionListenerIndex = function(transaction) {
            let listenerIndex = -1;
            for (let i = 0; i < transaction.listeners.length; i++) {
                if (transaction.listeners[i] === listener) {
                    listenerIndex = i;
                    break;
                }
            }
            return listenerIndex;
        };

        const _listenerIndex = function(listener) {
            let listenerIndex = -1;
            for (let i = 0; i < _listeners.length; i++) {
                if (_listeners[i] === listener) {
                    listenerIndex = i;
                    break;
                }
            }
            return listenerIndex;
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
                    _view(viewId).listeners.splice(listenerIndex, 1);
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
                    _transaction(transactionId).listeners.splice(listenerIndex, 1);
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
                for (let view in _views) {
                    const changedViewPropCount = _changedViewPropCount(view);
                    if (changedViewPropCount) {
                        view.changedProps = {};
                        changedPropCount += changedViewPropCount;
                        for (let i = 0; i < view.listeners.length; i++) {
                            view.listeners[i]();
                        }
                    }
                }
                for (let transaction in _transactions) {
                    const changedTransactionPropCount = _changedTransactionPropCount(transaction);
                    if (changedTransactionPropCount) {
                        transaction.changedProps = {};
                        changedPropCount += changedTransactionPropCount;
                        for (let i = 0; i < transaction.listeners.length; i++) {
                            transaction.listeners[i]();
                        }
                    }
                }
                if (changedPropCount > 0) {
                    for (let i = 0; i < _listeners.length; i++) {
                        _listeners[i]();
                    }
                }
            }
        }
    }

    return {

        createObserver: _createObserver,

    };

}

export default createObserverFactory; 
