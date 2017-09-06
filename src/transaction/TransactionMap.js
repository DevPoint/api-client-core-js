
import { ObservableObject } from '../observable';

class TransactionMap extends ObservableObject {

    constructor() {
        super();
        this._transactions = {};
    }

    _remove(transactionId) {
        const transaction = this.find(transactionId);
        transaction.removeParentObserver(this.observer);
        delete this._transactions[transactionId];
        this._markAsChanged();
    }

    ids() {
        return Object.keys(this._views);
    }

    exists(transactionId) {
        return this._transactions.hasOwnProperty(transactionId);
    }

    find(transactionId) {
        return this.exists(transactionId) 
            ? this._transactions[transactionId] : undefined;
    }

    set(transactionId, transaction) {
        if (this.exists(transactionId)) {
            this._remove(transactionId);
        }
        this._transactions[transactionId] = transaction;
        transaction.addParentObserver(this.observer);
        this._markAsChanged();
        return this;
    }

    remove(transactionId) {
        if (this.exists(transactionId)) {
            this._remove(transactionId);
        }
        return this;
    }

    findAllChanged() {
        const changedTransactions = [];
        for (let transactionId in this._transactions) {
            const transaction = this._transactions[transactionId];
            if (transaction.changed()) {
                changedTransactions.push(transaction);
                break;
            }
        }
        return changedTransactions;
    }
}

export default TransactionMap; 
