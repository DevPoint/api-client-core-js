
import InsertTransaction from './InsertTransaction';
import UpdateTransaction from './UpdateTransaction';
import DeleteTransaction from './DeleteTransaction';
import LoginTransaction from './LoginTransaction';
import RegisterTransaction from './RegisterTransaction';

class TransactionHandler {

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

    get listenersToDispatch() {
        const listeners = [];
        for (let transactionId in this._transactions) {
            const transaction = this._transactions[transactionId];
            if (transaction.changed()) {
                listeners = listeners.concat(transaction.listeners);
            }
        }
        return listeners;
    }

    clearAllChanges() {
        for (let transactionId in this._transactions) {
            this._transactions[transactionId].clearAllChanges();
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

    createUpdate(itemType, dataId, data) {
        return this._register(
            new UpdateTransaction(
                this._nextTransactionId(itemType, 'update'),
                itemType, dataId, data, this));
    }

    createDelete(itemType, dataId) {
        return this._register(
            new DeleteTransaction(
                this._nextTransactionId(itemType, 'delete'),
                itemType, dataId, this));
    }

    createLogin(itemType, credentials) {
        return this._register(
            new LoginTransaction(
                this._nextTransactionId(itemType, 'login'),
                itemType, credentials, this));
    }

    createRegister(itemType, credentials) {
        return this._register(
            new RegisterTransaction(
                this._nextTransactionId(itemType, 'register'),
                itemType, credentials, this));
    }

    start(transaction) {
        this._client.startTransaction(transaction);
        return this;
    }

    get supportsCancelProcessing() {
        return this._client.supportsCancelProcessingTransaction;
    }

    cancelProcessing(transaction) {
        if (this.supportsCancelProcessing) {
            this._client.cancelProcessingTransaction(transaction);
        }
        return this;
    }
}

export default TransactionHandler; 
