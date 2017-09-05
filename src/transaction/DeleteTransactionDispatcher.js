
import TransactionDispatcher from './TransactionDispatcher';
import Transaction from './Transaction';

class DeleteTransactionDispatcher extends TransactionDispatcher {

    _createTransaction(action) {
    	const transaction = new Transaction(action.id, action.itemType, 'delete');
    	return transaction;
    }

    _updateTransaction(transaction, payload) {
        transaction.fill(payload);
        return this;
    }
}

export default DeleteTransactionDispatcher;