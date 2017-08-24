
import UpdateTransaction from './UpdateTransaction';

class UpdateTransactionDispatcer extends TransactionDispatcher {

    _createTransaction(action) {
        return new UpdateTransaction(
                action.id, 
                action.itemType,
                action.itemId);
    }

    _updateTransition(transition, payload) {
    	super._updateTransition(transaction, payload);
        for (let propsKey in payload) {
            switch (propsKey) {
                case: 'data':
                    transaction.setData(this._cloneObject(payload[propsKey]));
                    break;
                case: 'validationErrors':
                    transaction.setValidationErrors(this._cloneObject(payload[propsKey]));
                    break;
            }
        }
    }
}
