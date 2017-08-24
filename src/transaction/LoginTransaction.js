
import Transaction from './Transaction';

class LoginTransaction extends Transaction {

    constructor(transactionId, itemType, credentials) {
        super(transactionId, itemType, 'login');
        this._credentials = credentials;
        this._userId = null;
        this._validationErrors = {};
    }

    get userId() {
        return this._userId;
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

    setUserId(userId) {
        this._userId = userId;
        this._markAsChanged();
        return this;
    }

    setValidationErrors(errors) {
        this._validationErrors = validationErrors;
        this._markAsChanged();
        return this;
    }
}

export default LoginTransaction;