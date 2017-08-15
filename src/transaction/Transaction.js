
import Observable from '../observer/Observable';

class Transaction extends Observable {

    constructor(transactionId, itemType, type, handler) {
        this._transactionId = transactionId;
        this._itemType = itemType;
        this._type = type;
        this._handler = handler;
        this._ready = false;
        this._processing = false;
        this._failed = false;
        this._released = false;
        this._errors = [];
        this._validationErrors = null;
    }

    get transactionId() {
        this._markAsRead('transactionId');
        return transactionId;
    }

    get itemType() {
        this._markAsRead('itemType');
        return itemType;
    }

    get type() {
        this._markAsRead('type');
        return type;
    }

    get ready() {
        this._markAsRead('ready');
        return this._ready;
    }

    get processing() {
        this._markAsRead('processing');
        return this._processing;
    }

    get failed() {
        this._markAsRead('failed');
        return this._failed;
    }

    get released() {
        this._markAsRead('released');
        return this._released;
    }

    get hasErrors() {
        this._markAsRead('hasErrors');
        return (this.errors.length > 0);
    }

    get errors() {
        this._markAsRead('errors');
        return this._errors;
    }

    get hasValidationErrors() {
        this._markAsRead('hasValidationErrors');
        return (Object.keys(this.validationErrors).length > 0);
    }

    get validationErrors() {
        this._markAsRead('validationErrors');
        return this._validationErrors;
    }

    setReady(ready) {
        this._ready = ready;
        this._markAsChanged('ready');
        return this;
    }

    setProcessing(processing) {
        this._processing = processing;
        this._markAsChanged('processing');
        return this;
    }

    setFailed(failed) {
        this._failed = failed;
        this._markAsChanged('failed');
        return this;
    }

    setErrors(errors) {
        this._errors = errors;
        this._markAsChanged('errors');
        return this;
    }

    setValidationErrors(errors) {
        this._validationErrors = validationErrors;
        this._markAsChanged('validationErrors');
        return this;
    }

    handleTransactionStart() {
        this.setReady(false)
            .setProcessing(true)
            .setFailed(false)
            .setErrors([])
            .setValidationErrors(null);
    }

    handleTransactionReady() {
        this.setReady(true)
            .setProcessing(false)
            .setFailed(false)
            .setErrors([])
            .setValidationErrors(null);
    }

    handleTransactionCanceled() {
        this.setReady(false)
            .setProcessing(false)
            .setFailed(false);
    }

    handleTransactionFailed(errors, meta) {
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

    start() {
        if (!this.processing) {
            this._handler.start(this);
        }
        return this;
    }

    cancel() {
        if (this.processing) {
            this._handler.cancel(this);
        }
        return this;
    }

    release() {
        this.setReady(false);
        this.setProcessing(false);
        this.setFailed(false);
        this.setErrors([]);
        this.setValidationErrors(null);
        this._released = true;
        this._markAsChanged('released');
        return this;
    }
}


export default Transaction;