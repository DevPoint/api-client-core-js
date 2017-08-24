
import {
    InsertTransaction,
    UpdateTransaction,
    DeleteTransaction,
    LoginTransaction,
    RegisterTransaction } from './transaction';
import { View } from './view';

class ApiClient {

    constructor(api) {
        this._api = api;
    }

    insertTransaction(transactionId, itemType, data) {
        const transaction = new InsertTransaction(transactionId, itemType, data);
        this._api.transactions()->set(transactionId, transaction);
        this._api.dispatch(this._api.insertFailed(transactionId, ['not_implemented'], {}));
        return transaction;
    }

    updateTransaction(transactionId, itemType, itemId, data) {
        const transaction = new UpdateTransaction(transactionId, itemType, itemId, data);
        this._api.transactions()->set(transactionId, transaction);
        this._api.dispatch(this._api.updateFailed(transactionId, ['not_implemented'], {}));
        return transaction;
    }

    deleteTransaction(transactionId, itemType, itemId) {
        const transaction = new DeleteTransaction(transactionId, itemType, itemId);
        this._api.transactions()->set(transactionId, transaction);
        this._api.dispatch(this._api.deleteFailed(transactionId, ['not_implemented']));
        return transaction;
    }

    loginTransaction(transactionId, credentials) {
        const transaction = new LoginTransaction(transactionId, itemType, credentials);
        this._api.transactions()->set(transactionId, transaction);
        this._api.dispatch(this._api.loginFailed(transactionId, ['not_implemented'], {}));
        return transaction;
    }

    registerTransaction(transactionId, credentials) {
        const transaction = new RegisterTransaction(transactionId, itemType, credentials);
        this._api.transactions()->set(transactionId, transaction);
        this._api.dispatch(this._api.registerFailed(transactionId, ['not_implemented'], {}));
        return transaction;
    }

    loadView(viewId, builder) {
        const view = new View(viewId, itemType);
        this._api.views()->set(viewId, view);
        this._api.dispatch(this._api.loadingFailed(viewId, ['not_implemented']));
        return view;
    }
}
