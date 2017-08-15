
import Transaction from './Transaction';

class DeleteTransaction extends Transaction {

    constructor(transactionId, itemType, credentials, handler) {
        super(transactionId, itemType, 'update', handler);
        this._credentials = credentials;
    }

    get credentials() {
        this._markAsRead('credentials');
        return _credentials;
    }
}

export default DeleteTransaction;