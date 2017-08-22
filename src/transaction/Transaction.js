
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
        this._released = false;
        this._errors = [];
        this._validationErrors = null;
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

    get hasValidationErrors() {
        return (Object.keys(this.validationErrors).length > 0);
    }

    get validationErrors() {
        return this._validationErrors;
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

    setValidationErrors(errors) {
        this._validationErrors = validationErrors;
        this._markAsChanged();
        return this;
    }

    handleProcessingStart() {
        this.setReady(false)
            .setProcessing(true)
            .setFailed(false)
            .setErrors([])
            .setValidationErrors(null);
    }

    handleProcessingReady() {
        this.setReady(true)
            .setProcessing(false)
            .setFailed(false)
            .setErrors([])
            .setValidationErrors(null);
    }

    handleProcessingCanceled() {
        this.setProcessing(false);
    }

    handleProcessingFailed(errors, meta) {
        this.setReady(true)
            .setProcessing(false)
            .setFailed(true);
            .setErrors(errors.slice(0));
        if (meta.hasOwnProperty('validationErrors')) {
            const validationErrors = {};
            for (var key in meta.validationErrors) {
                validationErrors[key] = meta.validationErrors[key];
            }
            this.setValidationErrors(validationErrors);
        }
    }
}


export default Transaction;
