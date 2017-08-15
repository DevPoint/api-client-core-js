
import Observer from '../observer/Observer';
import ObservableHandler from '../observer/ObservableHandler';
import InsertTransaction from './InsertTransaction';
import UpdateTransaction from './UpdateTransaction';
import DeleteTransaction from './DeleteTransaction';
import LoginTransaction from './LoginTransaction';
import RegisterTransaction from './RegisterTransaction';

class TransactionHandler extends ObservableHandler {

    constructor(client) {
        this._client = client;
        this._transactions = {};
        this._transactionNumber = 1;
    }

    _nextTransactionId(itemType, type) {
        const transactionId = itemType + '-' this._transactionNumber + '@' + type;
        this._transactionNumber += 1;
        return transactionId;
    }

    _register(transaction) {
        this._transactions[transaction.transactionId] = transaction;
        return transaction;
    }

    createObserver() {
        return new Observer('transaction');
    }

    get listenersToDispatch() {
        const listeners = [];
        for (let itemType in this._transactions) {
            for (let transactionId in this._transactions[itemType]) {
                const transaction = this._transactions[itemType][transactionId];
                if (transaction.changed()) {
                    listeners = listeners.concat(transaction.listeners);
                }
            }
        }
        return listeners;
    }

    clearAllChanges() {
        for (let itemType in this._transactions) {
            for (let transactionId in this._transactions[itemType]) {
                this._transactions[itemType][transactionId].clearAllChanges();
            }
        }
        return this;
    }

    exists(transactionId) {
        return this._transactions.hasOwnProperty(transactionId);
    }

    find(transactionId) {
        return this.exists(transactionId) 
            ? this._transactions[transactionId] : undefined;
    }

    createInsert(itemType, data) {
        return this._register(
            new InsertTransaction(
                this._nextTransactionId(itemType, 'insert'), 
                itemType, data, this));
    }

    createUpdate(itemType, data) {
        return this._register(
            new UpdateTransaction(
                this._nextTransactionId(itemType, 'update'),
                transactionId, itemType, data, this));
    }

    createDelete(itemType, dataId) {
        return this._register(
            this._nextTransactionId(itemType, 'delete'),
            new DeleteTransaction(transactionId, itemType, dataId, this));
    }

    createLogin(itemType, credentials) {
        return this._register(
            this._nextTransactionId(itemType, 'login'),
            new LoginTransaction(transactionId, itemType, credentials, this));
    }

    createRegister(itemType, credentials) {
        return this._register(
            this._nextTransactionId(itemType, 'register'),
            new RegisterTransaction(transactionId, itemType, credentials, this));
    }

    start(transaction) {
        this._client.start(transaction);
        return this;
    }

    cancel(transaction) {
        this._client.cancel(transaction);
        return this;
    }
}

export default TransactionHandler; 
