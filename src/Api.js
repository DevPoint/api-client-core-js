
import ApiClient from './ApiClient';
import ApiDispatcher from './ApiDispatcher';
import { CacheDispatcherFactory } from './cache';
import transactionActions from './transaction/actions';
import TransactionMap, { TransactionDispatcherFactory } from './transaction';
import viewActions from './view/actions';
import ViewMap, { ViewDispatcherFactory } from './transaction';

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

    get nameSpace() {
        return this._nameSpace;
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

    loadItemView(viewId, itemType, itemId) {
        return this._client.loadView(viewId, itemType, itemId);
    }

    beginDispatch() {

    }

    dispatch(action) {
        return this._dispatcher.dispatch(action);
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

    loadingSucceeded(viewId, loadingMeta, itemsIds) {
        return viewActions.loadingSucceeded(this.nameSpace, viewId, loadingMeta, itemsIds);
    }

    loadingFailed(viewId, errors) {
        return viewActions.loadingFailed(this.nameSpace, viewId, errors);
    }

}
