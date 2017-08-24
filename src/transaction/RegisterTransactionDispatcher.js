
import TransactionDispatcher from './TransactionDispatcher';
import RegisterTransaction from './RegisterTransaction';

class RegisterTransactionDispatcher extends TransactionDispatcher {

    _createTransaction(action) {
        return new RegisterTransaction(
                action.id, 
                action.itemType);
    }

    _updateTransition(transition, payload) {
    	super._updateTransition(transaction, payload);
        for (let propsKey in payload) {
            switch (propsKey) {
                case: 'credentials':
                    transaction.setCredentials(this._cloneObject(payload[propsKey]));
                    break;
                case: 'userid':
                    transaction.setUserId(this._cloneObject(payload[propsKey]));
                    break;
                case: 'validationErrors':
                    transaction.setValidationErrors(this._cloneObject(payload[propsKey]));
                    break;
            }
        }
    }
}
