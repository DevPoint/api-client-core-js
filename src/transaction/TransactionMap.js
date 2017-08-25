
import { ObservableObject } from '../observable';

class TransactionMap extends ObservableObject {

    constructor() {
        this._transactions = {};
    }

    exists(transactionId) {
        return this._transactions.hasOwnProperty(transactionId);
    }

    find(transactionId) {
        return this.exists(transactionId) 
            ? this._transactions[transactionId] : undefined;
    }

    set(transationId, transaction) {
        this._transactions[transactionId] = transaction;
        this._markAsChanged();
        return this;
    }

    remove(transactionId) {
        delete this._transactions[transactionId];
        this._markAsChanged();
        return this;
    }

    findAllChanged() {
        const changedTransactions = [];
        for (let transactionId in this._transactions) {
            const transaction = this._transactions[transactionId];
            if (transaction.changed()) {
                changedTransactions.push(transaction));
                break;
            }
        }
        return changedTransactions;
    }
}

export default TransactionMap; 
