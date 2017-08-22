
import Transaction from './Transaction';

class RegisterTransaction extends Transaction {

    constructor(transactionId, itemType, credentials) {
        super(transactionId, itemType, 'update');
        this._credentials = credentials;
    }

    get credentials() {
        return _credentials;
    }
}

export default RegisterTransaction;