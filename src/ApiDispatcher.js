
import {
    InsertTransactionDispatcher,
    UpdateTransactionDispatcher,
    DeleteTransactionDispatcher,
    LoginTransactionDispatcher,
    RegisterTransactionDispatcher } from './transaction';

import {
    ViewDispatcher } from './view';

class ApiDispatcher {

    constructor(api) {
        this._api = api;
        this._cacheDispatchers = this._createCacheDispatchers();
        this._transactionDispatchers = this._createTransactionDispatchers();
        this._viewDispatcher = this._createViewDispatcher();
    }

    _createCacheDispatchers() {
        const cacheDispatchers = {};
        return cacheDispatchers;
    }

    _getCacheDispatcher($itemType) {
        return this._cacheDispatchers[$itemType];
    }

    _createTransactionDispatchers() {
        const transactionDispatchers = {
            insert: this.__createInsertTransactionDispatcher(),
            update: this._createUpdateTransactionDispatcher(),
            delete: this._createDeleteTransactionDispatcher(),
            login: this._createLoginTransactionDispatcher(),
            register: this._createRegisterTransactionDispatcher()
        };
        return transactionDispatchers;
    }

    _getTransactionDispatcher($type) {
        return this._transactionDispatchers[$type];
    }

    _createInsertTransactionDispatcher() {
        return new InsertTransactionDispatcher();
    }

    _createUpdateTransactionDispatcher() {
        return new UpdateTransactionDispatcher();
    }

    _createDeleteTransactionDispatcher() {
        return new DeleteTransactionDispatcher();
    }

    _createLoginTransactionDispatcher() {
        return new LoginTransactionDispatcher();
    }

    _createRegisterTransactionDispatcher() {
        return new RegisterTransactionDispatcher();
    }

    _createViewDispatcher() {
        return new ViewDispatcher();
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