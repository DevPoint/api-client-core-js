
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
        this._insertTransactionDispatcher = this._createInsertTransactionDispatcher();
        this._updateTransactionDispatcher = this._createUpdateTransactionDispatcher();
        this._deleteTransactionDispatcher = this._createDeleteTransactionDispatcher();
        this._loginTransactionDispatcher = this._createLoginTransactionDispatcher();
        this._registerTransactionDispatcher = this._createRegisterTransactionDispatcher();
        this._viewDispatcher = this._createViewTransactionDispatcher();
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

    }
}