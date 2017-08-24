
import TransactionDispatcher from './TransactionDispatcher';
import UpdateTransaction from './UpdateTransaction';

class UpdateTransactionDispatcher extends TransactionDispatcher {

    _createTransaction(action) {
        return new UpdateTransaction(
            action.id, action.itemType, action.itemId, action.data);
    }

    _updateTransaction(transition, payload) {
    	super._updateTransaction(transaction, payload);
        for (let propsKey in payload) {
            switch (propsKey) {
                case 'validationErrors':
                    transaction.setValidationErrors(this._cloneObject(payload[propsKey]));
                    break;
            }
        }
    }
}

export default UpdateTransactionDispatcher;