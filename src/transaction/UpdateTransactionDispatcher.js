
import TransactionDispatcher from './TransactionDispatcher';
import UpdateTransaction from './UpdateTransaction';

class UpdateTransactionDispatcher extends TransactionDispatcher {

    _createTransaction(action) {
        return new UpdateTransaction(
            action.id, action.itemType, action.itemId, action.data);
    }

    _updateTransition(transition, payload) {
    	super._updateTransition(transaction, payload);
        for (let propsKey in payload) {
            switch (propsKey) {
                case: 'validationErrors':
                    transaction.setValidationErrors(this._cloneObject(payload[propsKey]));
                    break;
            }
        }
    }
}
