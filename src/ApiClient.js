
class ApiClient {

    constructor(api) {
        this._api = api;
    }

    insertTransaction(transactionId, itemType, data) {
        this._api.beginDispatch();
        this._api.dispatch(this._api.insertStart(transactionId, itemType, data));
        this._api.dispatch(this._api.insertFailed(transactionId, ['not_implemented'], {}));
        this._api.endDispatch();
        return this._api.transactions()->find(transactionId);
    }

    updateTransaction(transactionId, itemType, itemId, data) {
        this._api.beginDispatch();
        this._api.dispatch(this._api.updateStart(transactionId, itemType, itemId, data));
        this._api.dispatch(this._api.updateFailed(transactionId, ['not_implemented'], {}));
        this._api.endDispatch();
        return this._api.transactions()->find(transactionId);
    }

    deleteTransaction(transactionId, itemType, itemId) {
        this._api.beginDispatch();
        this._api.dispatch(this._api.deleteStart(transactionId, itemType, itemId));
        this._api.dispatch(this._api.deleteFailed(transactionId, ['not_implemented']));
        this._api.endDispatch();
        return this._api.transactions()->find(transactionId);
    }

    loginTransaction(transactionId, credentials) {
        this._api.beginDispatch();
        this._api.dispatch(this._api.loginStart(transactionId, credentials));
        this._api.dispatch(this._api.loginFailed(transactionId, ['not_implemented'], {}));
        this._api.endDispatch();
        return this._api.transactions()->find(transactionId);
    }

    registerTransaction(transactionId, credentials) {
        this._api.beginDispatch();
        this._api.dispatch(this._api.registerStart(transactionId, credentials));
        this._api.dispatch(this._api.registerFailed(transactionId, ['not_implemented'], {}));
        this._api.endDispatch();
        return this._api.transactions()->find(transactionId);
    }

    loadView(viewId, builder) {
        this._api.beginDispatch();
        this._api.dispatch(this._api.loadingStart(viewId, builder.itemType, {
            eagerType: builder.eagerType,
            offset: builder.offset,
            count: builder.count,
            pageSize: builder.pageSize}));
        this._api.dispatch(this._api.loadingFailed(viewId, ['not_implemented']));
        this._api.endDispatch();
        return this._api.views()->find(viewId);
    }
}
