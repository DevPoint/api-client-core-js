
import TransactionDispatcher from './TransactionDispatcher';
import LoginTransaction from './LoginTransaction';

class LoginTransactionDispatcher extends TransactionDispatcher {

    _createTransaction(action) {
        return new LoginTransaction(
            action.id, action.itemType, action.credentials);
    }

    _updateTransaction(transition, payload) {
    	super._updateTransaction(transaction, payload);
        for (let propsKey in payload) {
            switch (propsKey) {
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

export default LoginTransactionDispatcher;