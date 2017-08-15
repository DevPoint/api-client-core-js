
import Observer from '../observer/Observer';
import ObservableHandler from '../observer/ObservableHandler';
import InsertTransaction from './InsertTransaction';
import UpdateTransaction from './UpdateTransaction';
import DeleteTransaction from './DeleteTransaction';
import LoginTransaction from './LoginTransaction';
import RegisterTransaction from './RegisterTransaction';

class TransactionHandler extends ObservableHandler {

    constructor(transactionClient) {
        this._transactionClient = transactionClient;
        this._transactions = {};
        this._transactionNumbers = {};
    }

    _nextTransactionId(itemType, type) {
        if (!this._transactionNumbers.hasOwnProperty(itemType)) {
            this._transactionNumbers[itemType] = 1;
        }
        const transactionId = itemType + '-' this._transactionNumbers[itemType] + '@' + type;
        this._transactionNumbers[itemType] += 1;
        return transactionId;
    }

    _register(transaction) {
        const itemType = transaction.itemType;
        if (!this._transactions.hasOwnProperty(itemType))) {
            this._transactions[itemType] = {};
        }
        this._transactions[itemType][transaction.transactionId] = transaction;
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

    find(itemType, transactionId) {
        return this.hasRegisteredTransaction() 
            ? this._transactions[itemType][transactionId] : undefined;
    }

    createInsert(itemType, data) {
        const transactionId = this._nextTransactionId(itemType, 'insert');
        return this._register(
            new InsertTransaction(transactionId, itemType, data, this));
    }

    createUpdate(itemType, data) {
        const transactionId = this._nextTransactionId(itemType, 'update');
        return this._register(
            new UpdateTransaction(transactionId, itemType, data, this));
    }

    createDelete(itemType, dataId) {
        const transactionId = this._nextTransactionId(itemType, 'delete');
        return this._register(
            new DeleteTransaction(transactionId, itemType, dataId, this));
    }

    createLogin(itemType, credentials) {
        const transactionId = this._nextTransactionId(itemType, 'login');
        return this._register(
            new LoginTransaction(transactionId, itemType, credentials, this));
    }

    createRegister(itemType, credentials) {
        const transactionId = this._nextTransactionId(itemType, 'register');
        return this._register(
            new RegisterTransaction(transactionId, itemType, credentials, this));
    }

    start(transaction) {
        this._transactionClient.start(transaction);
        return this;
    }

    cancel(transaction) {
        this._transactionClient.cancel(transaction);
        return this;
    }
}

export default TransactionHandler; 