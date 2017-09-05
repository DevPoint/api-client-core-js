
const assign = Object.assign;

class TransactionDispatcher {

    _cloneObject(object) {
        return assign({}, object);
    }

    _cloneArray(array) {
        return array.slice(0);
    }

    _createTransaction(action) {
        return null;
    }

    _updateTransaction(transaction, payload) {
        transaction.fill(payload);
        return this;
    }

    dispatch(transactionMap, action) {
        const actionTypeFrags = action.split('_');
        if (actionTypeFrags[0] === 'UPDATE') {
            const transaction = transactionMap.find(action.id);
            if (transaction) {
                this._updateTransaction(transaction, action.payload);
            }
        }
        else if (actionTypeFrags[0] === 'SET' || actionTypeFrags[0] === 'ADD') {
            const newTransaction = this._createTransaction(action);
            newTransaction.markAsChanged();
            if (action.payload) {
                this._updateTransaction(newTransaction, action.payload);
            }
            transactionMap.set(action.id, newTransaction);
        }
        else if (actionTypeFrags[0] === 'REMOVE') {
            transactionMap.remove(action.id);
        }
    }
}

export default TransactionDispatcher;