
import Transaction from './Transaction';

class InsertTransaction extends Transaction {

    constructor(transactionId, itemType, data) {
        super(transactionId, itemType, 'insert');
        this._itemId = null;
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

    setItemId(itemId) {
        this._itemId = itemId;
        this._markAsChanged();
        return this;
    }

    setValidationErrors(errors) {
        this._validationErrors = validationErrors;
        this._markAsChanged();
        return this;
    }
}
