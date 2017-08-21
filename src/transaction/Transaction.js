
import ObservableObject from '../observer/ObservableObject';

class Transaction extends ObservableObject {

    constructor(transactionId, itemType, type, handler) {
        super();
        this._handler = handler;
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
        return this._transactionId;
    }

    get itemType() {
        this._markAsRead('itemType');
        return this._itemType;
    }

    get type() {
        this._markAsRead('type');
        return this._type;
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

    start() {
        if (!this.processing) {
            this._handler.start(this);
        }
        return this;
    }

    cancelProcessing() {
        if (this.processing) {
            this._handler.cancelProcessing(this);
        }
        return this;
    }

    release() {
        if (!this.processing) {
            this.setReady(false)
                .setProcessing(false)
                .setFailed(false)
                .setErrors([])
                .setValidationErrors(null)
            this._released = true;
            this._markAsChanged('released');
        }
        return this;
    }
}


export default Transaction;
