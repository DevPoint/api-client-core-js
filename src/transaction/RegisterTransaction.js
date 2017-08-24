
import Transaction from './Transaction';

class RegisterTransaction extends Transaction {

    constructor(transactionId, itemType) {
        super(transactionId, itemType, 'register');
        this._userId = null;
        this._credentials = {};
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

    setCredentials(credentials) {
        this._credentials = credentials;
        this._markAsChanged();
        return this;
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

export default RegisterTransaction;