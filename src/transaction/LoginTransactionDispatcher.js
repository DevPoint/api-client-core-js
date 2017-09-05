
import TransactionDispatcher from './TransactionDispatcher';
import Transaction from './Transaction';

class LoginTransactionDispatcher extends TransactionDispatcher {

    _createTransaction(action) {
        const transaction = new Transaction(action.id, action.itemType, 'login');
        return transaction;    
    }

    _updateTransaction(transaction, payload) {
        transaction.fill(payload);
        return this;
    }
}

export default LoginTransactionDispatcher;