
import TransactionDispatcher from './TransactionDispatcher';
import InsertTransaction from './InsertTransaction';

class InsertTransactionDispatcher extends TransactionDispatcher {

    _createTransaction(action) {
        return new InsertTransaction(
            action.id, action.itemType, action.data);
    }

    _updateTransition(transition, payload) {
    	super._updateTransition(transaction, payload);
        for (let propsKey in payload) {
            switch (propsKey) {
                case: 'itemId':
                    transaction.setItemId(this._cloneObject(payload[propsKey]));
                    break;
                case: 'validationErrors':
                    transaction.setValidationErrors(this._cloneObject(payload[propsKey]));
                    break;
            }
        }
    }
}
