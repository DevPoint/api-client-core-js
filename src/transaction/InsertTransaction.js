
import Transaction from './Transaction';

class InsertTransaction extends Transaction {

    constructor(transactionId, itemType, data) {
        super(transactionId, itemType, 'insert');
        this._data = data;
        this._validationErrors = {};
    }

    get data() {
        return _data;
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
