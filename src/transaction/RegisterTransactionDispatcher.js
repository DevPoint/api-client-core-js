
import TransactionDispatcher from './TransactionDispatcher';
import Transaction from './Transaction';

class RegisterTransactionDispatcher extends TransactionDispatcher {

    _createTransaction(action) {
        const transaction = new Transaction(action.id, action.itemType, 'register');
        return transaction;
    }

    _updateTransaction(transaction, payload) {
        transaction.fill(payload);
        return this;
    }
}

export default RegisterTransactionDispatcher;