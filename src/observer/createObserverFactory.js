
function createObserverFactory() {

    const _createObserver = function(observerHandler) {

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

        const _clearChangedViewProps = function(view) {
            view.changedProps = {};
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

        const _clearChangedTransactionProps = function(transaction) {
            transaction.changedProps = {};
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

            markViewAsRead: function(viewId,propKey) {
                _view(viewId).readProps[propsKey] = true;
            },

            markViewAsChanged: function(viewId,propKey) {
                _view(viewId).changedProps[propsKey] = true;
            },

            markTransactionAsRead: function(transactionId,propKey) {
                _transaction(transactionId).readProps[propsKey] = true;
            },

            markTransactionAsChanged: function(transactionId,propKey) {
               _transaction(transactionId).changedProps[propsKey] = true;
            },

            addListener: function(listener) {
                _listeners.push(listener);
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
                    changedPropCount += _changedViewPropCount(view);
                }
                for (let transaction in _transactions) {
                    changedPropCount += _changedTransactionPropCount(transaction);
                }
                if (changedPropCount > 0) {
                    for (let view in _views) {
                        _clearChangedViewProps(view);
                    }
                    for (let transaction in _transactions) {
                        _clearChangedTransactionProps(transaction);
                    }
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
