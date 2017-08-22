
import Transaction from './Transaction';

class DeleteTransaction extends Transaction {

    constructor(transactionId, itemType, credentials) {
        super(transactionId, itemType, 'update');
        this._credentials = credentials;
        this._validationErrors = {};
    }

    get credentials() {
        return _credentials;
    }

    get hasValidationErrors() {
        return (Object.keys(this.validationErrors).length > 0);
    }

    get validationErrors() {
        return this._validationErrors;
    }

    setValidationErrors(errors) {
        this._validationErrors = validationErrors;
        this._markAsChanged();
        return this;
    }
}

export default DeleteTransaction;