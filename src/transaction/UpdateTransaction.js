
import Transaction from './Transaction';

class UpdateTransaction extends Transaction {

    constructor(transactionId, itemType, itemId, data) {
        super(transactionId, itemType, 'update');
        this._itemId = itemId;
        this._data = data;
        this._validationErrors = {};
    }

    get itemId() {
        return this._itemId;
    }

    get data() {
        return this._data;
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

export default UpdateTransaction;
