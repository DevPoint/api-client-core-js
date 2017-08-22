
import { ObservableObject } from '../observable';

class Transaction extends ObservableObject {

    constructor(transactionId, itemType, type) {
        super();
        this._transactionId = transactionId;
        this._itemType = itemType;
        this._type = type;
        this._ready = false;
        this._processing = false;
        this._failed = false;
        this._errors = [];
    }

    get transactionId() {
        return this._transactionId;
    }

    get itemType() {
        return this._itemType;
    }

    get type() {
        return this._type;
    }

    get ready() {
        return this._ready;
    }

    get processing() {
        return this._processing;
    }

    get failed() {
        return this._failed;
    }

    get released() {
        return this._released;
    }

    get hasErrors() {
        return (this.errors.length > 0);
    }

    get errors() {
        return this._errors;
    }

    setReady(ready) {
        this._ready = ready;
        this._markAsChanged();
        return this;
    }

    setProcessing(processing) {
        this._processing = processing;
        this._markAsChanged();
        return this;
    }

    setFailed(failed) {
        this._failed = failed;
        this._markAsChanged();
        return this;
    }

    setErrors(errors) {
        this._errors = errors;
        this._markAsChanged();
        return this;
    }
}


export default Transaction;
