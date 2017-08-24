
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
        this._insertDispatcher = this._createInsertDispatcher();
        this._updateDispatcher = this._createUpdateDispatcher();
        this._deleteDispatcher = this._createDeleteDispatcher();
        this._loginDispatcher = this._createLoginDispatcher();
        this._registerDispatcher = this._createRegisterDispatcher();
        this._viewDispatcher = this._createViewDispatcher();
    }

    _createInsertDispatcher() {
        return new InsertTransactionDispatcher();
    }

    _createUpdateDispatcher() {
        return new UpdateTransactionDispatcher();
    }

    _createDeleteDispatcher() {
        return new DeleteTransactionDispatcher();
    }

    _createLoginDispatcher() {
        return new LoginTransactionDispatcher();
    }

    _createRegisterDispatcher() {
        return new RegisterTransactionDispatcher();
    }

    _createViewDispatcher() {
        return new ViewDispatcher();
    }

    dispatch(action) {

    }
}