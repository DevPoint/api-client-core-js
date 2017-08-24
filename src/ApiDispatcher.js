
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
        this._insertDispatcher = this._createInsertTransactionDispatcher();
        this._updateDispatcher = this._createUpdateTransactionDispatcher();
        this._deleteDispatcher = this._createDeleteTransactionDispatcher();
        this._loginDispatcher = this._createLoginTransactionDispatcher();
        this._registerDispatcher = this._createRegisterTransactionDispatcher();
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