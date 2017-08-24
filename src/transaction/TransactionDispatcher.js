
import InsertTransaction from './InsertTransaction';

const assign = Object.assign;

class TransactionDispatcher extends TransactionDispatcher {

    _cloneObject(object) {
        return assign({}, object);
    }

    _cloneArray(array) {
        return array.slice(0);
    }

    _createTransaction(action) {
        return null;
    }

    _updateTransactions(transition, payload) {
        for (let propsKey in payload) {
            switch (propsKey) {
                case: 'ready';
                    transaction.setReady(payload[propsKey]);
                    break;
                case: 'processing';
                    transaction.setProcessing(payload[propsKey]);
                    break;
                case: 'failed';
                    transaction.setFailed(payload[propsKey]);
                    break;
                case: 'succeeded';
                    transaction.setSucceeded(payload[propsKey]);
                    break;
                case: 'errors';
                    transaction.setErrors(this._cloneArray(payload[propsKey]));
                    break;
            }
        }
    }

    dispatch(transactionMap, action) {
        const actionTypeFrags = action.split('_');
        if (actionTypeFrags[0] === 'UPDATE') {
            const transaction = transactionMap.find(action.id);
            if (transaction) {
                this._updateTransactions(transaction, action.payload);
            }
        }
        else if (actionTypeFrags[0] === 'SET' || actionTypeFrags[0] === 'ADD') {
            const newTransactAction = _createTransaction(action);
            this._updateTransactions(newTransactAction, action.payload);
            transactionMap.set(action.id, newTransactAction);
        }
    }
}

export default TransactionDispatcher;