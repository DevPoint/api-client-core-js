
class CacheEntryClient {

    constructor(api, itemType) {
        this._api = api;
        this._itemType = itemType;
    }

    insert(transactionId, data) {
        this._api.dispatch(this._api.insertStart(transactionId, this._itemType, data));
        return new Promise((resolve, reject) => {
            reject(this._api.dispatch(this._api.insertFailed(transactionId, ['not_implemented'], {})));
        });
    }

    update(transactionId, itemId, data) {
        this._api.dispatch(this._api.updateStart(transactionId, this._itemType, itemId, data));
        return new Promise((resolve, reject) => {
            reject(this._api.dispatch(this._api.updateFailed(transactionId, ['not_implemented'], {})));
        });
    }

    delete(transactionId, itemId) {
        this._api.dispatch(this._api.deleteStart(transactionId, this._itemType, itemId));
        return new Promise((resolve, reject) => {
            reject(this._api.dispatch(this._api.deleteFailed(transactionId, ['not_implemented'])));
        });
    }

    loadMany(viewId, builder) {
        this._api.dispatch(this._api.loadingStart(viewId, this._itemType, {
            eagerType: builder.eagerType,
            offset: builder.offset,
            count: builder.count,
            pageSize: builder.pageSize}));
        return new Promise((resolve, reject) => {
            reject(this._api.dispatch(this._api.loadingFailed(viewId, ['not_implemented'])));
        });
    }

    load(viewId, itemId, eagerType) {
        this._api.dispatch(this._api.loadingStart(viewId, this._itemType, {
            eagerType: eagerType ? eagerType : 'full',
            offset: 0,
            count: 1,
            pageSize: 0}));
        return new Promise((resolve, reject) => {
            reject(this._api.dispatch(this._api.loadingFailed(viewId, ['not_implemented'])));
        });
    }
}

export default HotelClient;
