
class CacheEntryClient {

    constructor(api, itemType) {
        this._api = api;
        this._itemType = itemType;
    }

    insert(transactionId, data) {
        this._api.beginDispatch();
        this._api.dispatch(this._api.insertStart(transactionId, this._itemType, data));
        this._api.dispatch(this._api.insertFailed(transactionId, ['not_implemented'], {}));
        this._api.endDispatch();
        return this._api.transactions().find(transactionId);
    }

    update(transactionId, itemId, data) {
        this._api.beginDispatch();
        this._api.dispatch(this._api.updateStart(transactionId, this._itemType, itemId, data));
        this._api.dispatch(this._api.updateFailed(transactionId, ['not_implemented'], {}));
        this._api.endDispatch();
        return this._api.transactions().find(transactionId);
    }

    delete(transactionId, itemId) {
        this._api.beginDispatch();
        this._api.dispatch(this._api.deleteStart(transactionId, this._itemType, itemId));
        this._api.dispatch(this._api.deleteFailed(transactionId, ['not_implemented']));
        this._api.endDispatch();
        return this._api.transactions().find(transactionId);
    }

    loadMany(viewId, builder) {
        this._api.beginDispatch();
        this._api.dispatch(this._api.loadingStart(viewId, this._itemType, {
            eagerType: builder.eagerType,
            offset: builder.offset,
            count: builder.count,
            pageSize: builder.pageSize}));
        this._api.dispatch(this._api.loadingFailed(viewId, ['not_implemented']));
        this._api.endDispatch();
        return this._api.views().find(viewId);
    }

    load(viewId, itemId, eagerType) {
        this._api.beginDispatch();
        this._api.dispatch(this._api.loadingStart(viewId, this._itemType, {
            eagerType: eagerType ? eagerType : 'full',
            offset: 0,
            count: 1,
            pageSize: 0}));
        this._api.dispatch(this._api.loadingFailed(viewId, ['not_implemented']));
        this._api.endDispatch();
        return this._api.views().find(viewId);
    }
}

export default HotelClient;
