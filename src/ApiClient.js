
class ApiClient {

    constructor(api) {
        this._api = api;
        this._cacheEntryClients = this._createCacheEntryClients(api);
    }

    _createCacheEntryClients(api) {
        return {};
    }

    insertTransaction(transactionId, itemType, data) {
        return this._cacheEntryClients[itemType].insert(transactionId, data);
    }

    updateTransaction(transactionId, itemType, itemId, data) {
        return this._cacheEntryClients[itemType].update(transactionId, itemId, data);
    }

    deleteTransaction(transactionId, itemType, itemId) {
        return this._cacheEntryClients[itemType].delete(transactionId, itemId);
    }

    loadView(viewId, builder) {
        return this._cacheEntryClients[builder.itemType].loadMany(viewId, builder);
    }

    loadViewByItemId(viewId, itemType, itemId, eagerType) {
        return this._cacheEntryClients[itemType].load(viewId, itemId, eagerType);
    }
    
    loginTransaction(transactionId, credentials) {
        this._api.dispatch(this._api.loginStart(transactionId, credentials));
        return new Promise((resolve, reject) => {
            reject(this._api.dispatch(this._api.loginFailed(transactionId, ['not_implemented'], {})));
        });
    }

    registerTransaction(transactionId, credentials) {
        this._api.dispatch(this._api.registerStart(transactionId, credentials));
        return new Promise((resolve, reject) => {
            reject(this._api.dispatch(this._api.registerFailed(transactionId, ['not_implemented'], {})));
        });
    }
}
