
import { ObservableObject } from '../observer';

class TransactionMap extends ObservableObject {

    constructor() {
        this._transactions = {};
    }

    get changed() {
        let changed = super.changed();
        if (!changed) {
            for (let transactionId in this._transactions) {
                if (this._transactions[transactionId].changed()) {
                    changed = true;
                    break;
                }
            }
        }
        return changed;
    }

    clearAllChances() {
        super.clearAllChances();
        if (this.observed) {
            for (let transactionId in this._transactions) {
                this._transactions[transactionId].clearAllChances();
            }
        }
        return this;
    }

    exists(transactionId) {
        this._markAsRead(transactionId);
        return this._transactions.hasOwnProperty(transactionId);
    }

    find(transactionId) {
        this._markAsRead(transactionId);
        return this.exists(transactionId) 
            ? this._transactions[transactionId] : null;
    }

    set(transationId, transaction) {
        this._transactions[transactionId] = transaction;
        this._markAsChanged(transactionId);
        return this;
    }

    clear(transactionId) {
        delete this._transactions[transactionId];
        this._markAsChanged(transactionId);
        return this;
    }
}

export default TransactionMap; 