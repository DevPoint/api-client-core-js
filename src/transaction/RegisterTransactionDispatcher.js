
import TransactionDispatcher from './TransactionDispatcher';
import RegisterTransaction from './RegisterTransaction';

class RegisterTransactionDispatcher extends TransactionDispatcher {

    _createTransaction(action) {
        return new RegisterTransaction(
            action.id, action.itemType, action.credentials);
    }

    _updateTransactions(transition, payload) {
    	super._updateTransactions(transaction, payload);
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

export default RegisterTransactionDispatcher;