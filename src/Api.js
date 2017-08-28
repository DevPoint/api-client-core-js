
import ApiClient from './ApiClient';
import ApiDispatcher from './ApiDispatcher';
import cacheActions from './cache/actions';
import { CacheDispatcherFactory } from './cache';
import transactionActions from './transaction/actions';
import { TransactionMap, TransactionDispatcherFactory } from './transaction';
import viewActions from './view/actions';
import { ViewMap, ViewDispatcherFactory } from './transaction';

class Api {

    constructor(nameSpace) {
        this._nameSpace = nameSpace;
        this._transactions = new TransactionMap();
        this._views = new ViewMap();
        this._caches = this._createCaches();
        this._client = this._createClient();
        this._dispatcher = this._createDispatcher();
    }

    _createCaches() {
        return {};
    }

    _createClient() {
        return new ApiClient(this);
    }

    _createCacheDispatcherFactory() {
        return new CacheDispatcherFactory();
    }

    _createTransactionDispatcherFactory() {
        return new TransactionDispatcherFactory();
    }

    _createViewDispatcherFactory() {
        return new ViewDispatcherFactory();
    }

    _createDispatcher() {
        return new ApiDispatcher(this,
            this._createCacheDispatcherFactory(),
            this._createTransactionDispatcherFactory(),
            this._createViewDispatcherFactory());
    }

    _notify() {
        const changedObservables = [];
        const cacheItemTypes = this.getCacheItemTypes();
        for (let itemType in this._caches) {
            const cacheMap = this.cache(itemType);
            if (cacheMap.changed) {
                changedObservables.push(cacheMap);
            }
        }
        const transactionMap = this.transactions();
        if (transactionMap.changed) {
            changedObservables.push(transactionMap);
            changedObservables = changedObservables.concat(transactionMap.findAllChanged());
        }
        const viewMap = this.views();
        if (viewMap.changed) {
            changedObservables.push(viewMap);
            changedObservables = changedObservables.concat(viewMap.findAllChanged());
        }
        return changedObservables;
    }

        // collect listeners to notify and remove all duplicates
    //    const listenersToNotify = [];
    //    for (let i = 0; i < changedObservables.length; i++) {
    //        listenersToNotify = listenersToNotify.concat(changedObservables[i].listeners);
    //    }
    //    return listenersToNotify.filter((v, i, a) => a.indexOf(v) === i);

    get nameSpace() {
        return this._nameSpace;
    }

    getCacheItemTypes() {
        return Object.keys(this._caches);
    }

    cache(itemType) {
        return this._caches[itemType];
    }

    transactions() {
        return this._transactions;
    }

    views() {
        return this._views;
    }

    insertTransaction(transactionId, itemType, data) {
        return this._client.insertTransaction(transactionId, itemType, data);
    }

    updateTransaction(transactionId, itemType, itemId, data) {
        return this._client.updateTransaction(transactionId, itemType, itemId, data);
    }

    deleteTransaction(transactionId, itemType, itemId) {
        return this._client.deleteTransaction(transactionId, itemId);
    }

    loginTransaction(transactionId, credentials) {
        return this._client.loginTransaction(transactionId, credentials);
    }

    registerTransaction(transactionId, credentials) {
        return this._client.registerTransaction(transactionId, credentials);
    }

    loadView(viewId, builder) {
        return this._client.loadView(viewId, builder);
    }

    loadItemView(viewId, itemType, itemId, eagerType) {
        return this._client.loadView(viewId, itemType, itemId, eagerType);
    }

    beginDispatch() {

    }

    dispatch(action) {
        this.beginDispatch();
        const result = this._dispatcher.dispatch(action);
        this.endDispatch();
        return result;
    }

    endDispatch() {
        
    }

    insertStart(transactionId, itemType, data) {
        return transactionActions.insertStart(this.nameSpace, transactionId, itemType, data);
    }

    insertSucceeded(transactionId, itemId) {
        return transactionActions.insertSucceeded(this.nameSpace, transactionId, itemId);
    }

    insertFailed(transactionId, errors, validationErrors) {
        return transactionActions.insertFailed(this.nameSpace, transactionId, errors, validationErrors);
    }

    updateStart(transactionId, itemType, itemId, data) {
        return transactionActions.updateStart(this.nameSpace, transactionId, itemId, data);
    }

    updateSucceeded(transactionId) {
        return transactionActions.updateSucceeded(this.nameSpace, transactionId);
    }

    updateFailed(transactionId, errors, validationErrors) {
        return transactionActions.updateFailed(this.nameSpace, transactionId,errors, validationErrors);
    }

    deleteStart(transactionId, itemType, itemId) {
        return transactionActions.deleteStart(this.nameSpace, transactionId, itemType, itemId);
    }

    deleteSucceeded(transactionId) {
        return transactionActions.deleteSucceeded(this.nameSpace, transactionId);
    }

    deleteFailed(transactionId, errors) {
        return transactionActions.deleteFailed(this.nameSpace, transactionId, errors);
    }

    loginStart(transactionId, credentials) {
        return transactionActions.loginStart(this.nameSpace, transactionId, credentials);
    }

    loginSucceeded(transactionId, userId) {
        return transactionActions.loginSucceeded(this.nameSpace, userId);
    }

    loginFailed(transactionId, errors, validationErrors) {
        return transactionActions.loginFailed(this.nameSpace, transactionId, errors, validationErrors);
    }

    registerStart(transactionId, credentials) {
        return transactionActions.registerStart(this.nameSpace, transactionId, credentials);
    }

    registerSucceeded(transactionId, userId) {
        return transactionActions.registerSucceeded(this.nameSpace, userId);
    }

    registerFailed(transactionId, error) {
        return transactionActions.registerFailed(this.nameSpace, transactionId, error);
    }

    loadingStart(viewId, itemType, loadingMeta) {
        return viewActions.loadingStart(this.nameSpace, viewId, itemType, loadingMeta);
    }

    loadingSucceeded(viewId, itemsIds, loadingMeta) {
        return viewActions.loadingSucceeded(this.nameSpace, viewId, itemsIds, loadingMeta);
    }

    loadingFailed(viewId, errors) {
        return viewActions.loadingFailed(this.nameSpace, viewId, errors);
    }

    setCacheEntry(itemType, cacheId, data) {
        return cacheActions.setCacheEntry(this.nameSpace, itemType, cacheId, data);
    }

    setCacheEntries(itemType, data) {
        return cacheActions.setCacheEntries[this.nameSpace, itemType, data);
    }

    updateCacheEntry(itemType, cacheId, data) {
        return cacheActions.updateCacheEntry(this.nameSpace, itemType, cacheId, data);
    }

    removeCacheEntry(itemType, cacheId) {
        return cacheActions.removeCacheEntry(this.nameSpace, itemType, cacheId);
    }
}
