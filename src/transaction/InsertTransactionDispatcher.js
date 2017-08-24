
import InsertTransaction from './InsertTransaction';

class InsertTransactionDispatcer extends TransactionDispatcher {

    _createTransaction(action) {
        return new InsertTransaction(
                action.id, 
                action.itemType);
    }

    _updateTransition(transition, payload) {
    	super._updateTransition(transaction, payload);
        for (let propsKey in payload) {
            switch (propsKey) {
                case: 'itemId':
                    transaction.setItemId(this._cloneObject(payload[propsKey]));
                    break;
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
