
import InsertTransactionDispatcher from './InsertTransactionDispatcher';
import UpdateTransactionDispatcher from './UpdateTransactionDispatcher';
import DeleteTransactionDispatcher from './DeleteTransactionDispatcher';
import LoginTransactionDispatcher from './LoginTransactionDispatcher';
import RegisterTransactionDispatcher from './RegisterTransactionDispatcher';

class TransactionDispatcherFactory {

    _createInsertTransactionDispatcher() {
        return new InsertTransactionDispatcher();
    }

    _createUpdateTransactionDispatcher() {
        return new UpdateTransactionDispatcher();
    }

    _createDeleteTransactionDispatcher() {
        return new DeleteTransactionDispatcher();
    }

    _createLoginTransactionDispatcher() {
        return new LoginTransactionDispatcher();
    }

    _createRegisterTransactionDispatcher() {
        return new RegisterTransactionDispatcher();
    }

    createDispatchers() {
        const transactionDispatchers = {
            insert: this._createInsertTransactionDispatcher(),
            update: this._createUpdateTransactionDispatcher(),
            delete: this._createDeleteTransactionDispatcher(),
            login: this._createLoginTransactionDispatcher(),
            register: this._createRegisterTransactionDispatcher()
        };
        return transactionDispatchers;
    }
}