
import TransactionDispatcher from './TransactionDispatcher';
import DeleteTransaction from './DeleteTransaction';

class DeleteTransactionDispatcher extends TransactionDispatcher {

    _createTransaction(action) {
        return new DeleteTransaction(
                action.id, 
                action.itemType,
                action.itemId);
    }
}

export default DeleteTransactionDispatcher;