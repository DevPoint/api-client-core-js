
class ApiDispatcher {

    constructor(api, 
            cacheDispatcherFactory,
            transactionDispatcherFactory,
            viewDispatcherFactory) {
        this._api = api;
        this._cacheDispatchers = cacheDispatcherFactory.createDispatchers();
        this._transactionDispatchers = transactionDispatcherFactory.createDispatchers();
        this._viewDispatcher = viewDispatcherFactory.createDispatcher();
    }

    _getCacheDispatcher($itemType) {
        return this._cacheDispatchers[$itemType];
    }

    _getTransactionDispatcher($type) {
        return this._transactionDispatchers[$type];
    }

    _getViewDispatcher() {
        return this._viewDispatcher;
    }

    dispatch(action) {
        const actionTypeFrags = action.type.split('_');
        if (actionTypeFrags.length >= 2) {
            if (actionTypeFrags[1] === 'TRANSACTION') {
                const transactionType = actionTypeFrags[2].toLowerCase();
                const transactionDispatcher = this._getTransactionDispatcher(transactionType);
                transactionDispatcher.dispatch(api.transactions, action);
            }
            else if (actionTypeFrags[1] === 'VIEW') {
                const viewDispatcher = this._getViewDispatcher();
                viewDispatcher.dispatch(api.views, action);
            }
            else if (actionTypeFrags[1] === 'CACHE') {
                const itemType = actionTypeFrags[2].toLowerCase();
                const cacheDispatcher = this._getCacheDispatcher(itemType);
                cacheDispatcher.dispatch(api.cache(itemType), action);
            }
        }
    }
}