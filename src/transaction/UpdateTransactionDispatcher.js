
import TransactionDispatcher from './TransactionDispatcher';
import UpdateTransaction from './UpdateTransaction';

class UpdateTransactionDispatcher extends TransactionDispatcher {

    _createTransaction(action) {
        return new UpdateTransaction(
            action.id, action.itemType, action.itemId, action.data);
    }

    _updateTransactions(transition, payload) {
    	super._updateTransactions(transaction, payload);
        for (let propsKey in payload) {
            switch (propsKey) {
                case: 'validationErrors':
                    transaction.setValidationErrors(this._cloneObject(payload[propsKey]));
                    break;
            }
        }
    }
}

export default UpdateTransactionDispatcher;