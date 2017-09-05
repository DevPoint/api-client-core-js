
import { ObjectObserver, Observable } from '../observable';

const assign = Object.assign;

class Transaction extends Observable {

    constructor(transactionId, itemType, type) {
        super();
        this._observer = this._createObserver();
        this._observerLocked = true;
        this._transactionId = transactionId;
        this._itemType = itemType;
        this._type = type;
        this._ready = false;
        this._processing = false;
        this._succeeded = false;
        this._failed = false;
        this._itemsIds = [];
        this._errors = [];
        this._validationErrors = {};
    }

    _createObserver() {
        return new ObjectObserver();
    }

    get changed() {
        return this._observer.changed;
    }

    markAsChanged() {
        this._observer.markAsChanged();
        if (this._parentObserver !== null) {
            this._parentObserver.markAsChanged();
        }
    }

    fill(data) {
        for (let propsKey in data) {
            switch (propsKey) {
                case 'ready':
                    this.setReady(data[propsKey]);
                    break;
                case 'processing':
                    this.setProcessing(data[propsKey]);
                    break;
                case 'succeeded':
                    this.setSucceeded(data[propsKey]);
                    break;
                case 'failed':
                    this.setFailed(data[propsKey]);
                    break;
                case 'itemsIds':
                    this.setItemsIds(data[propsKey].slice(0));
                    break;
                case 'errors':
                    this.setErrors(data[propsKey].slice(0));
                    break;
                case 'validationErrors':
                    this.setValidationErrors(assign({}, data[propsKey]));
                    break;
            }
        }
        return this;
    }

    toObject() {
        return {
            transactionId: this.transactionId,
            itemType: this.itemType,
            type: this.type,
            ready: this.ready,
            processing: this.processing,
            succeeded: this.succeeded,
            failed: this.failed,
            itemsIds: this.itemsIds,
            errors: this.errors,
            validationErrors: this.validationErrors
        };
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

    get succeeded() {
        return this._succeeded;
    }

    get itemsIds() {
        return this._itemsIds;
    }

    get itemId() {
        return this._itemsIds.length == 1 ? this._itemsIds[0] : null;
    }

    get firstItemId() {
        return this._itemsIds.length ? this._itemsIds[0] : null;
    }

    get lastItemId() {
        return this._itemsIds.length ? this._itemsIds[this._itemsIds.length-1] : null;
    }

    get hasErrors() {
        return (this.errors.length > 0);
    }

    get errors() {
        return this._errors;
    }

    get error() {
        return this._errors.length == 1 ? this._errors[0] : undefined;
    }

    get firstError() {
        return this._errors.length ? this._errors[0] : undefined;
    }

    get lastError() {
        return this._errors.length ? this._errors[this._errors.length-1] : undefined;
    }

    get hasValidationErrors() {
        return (Object.keys(this.validationErrors).length > 0);
    }

    get validationErrors() {
        return this._validationErrors;
    }

    setReady(ready) {
        this._ready = ready;
        this.markAsChanged();
        return this;
    }

    setProcessing(processing) {
        this._processing = processing;
        this.markAsChanged();
        return this;
    }

    setSucceeded(succeeded) {
        this._succeeded = succeeded;
        this.markAsChanged();
        return this;
    }

    setFailed(failed) {
        this._failed = failed;
        this.markAsChanged();
        return this;
    }

    setItemId(itemId) {
        this._itemsIds = [itemId];
        this.markAsChanged();
        return this;
    }

    setItemsIds(itemsIds) {
        this._itemsIds = itemsIds;
        this._markAsChanged();
        return this;
    }

    setError(error) {
        this._errors = [error];
        this.markAsChanged();
        return this;
    }

    setErrors(errors) {
        this._errors = errors;
        this.markAsChanged();
        return this;
    }

    setValidationErrors(errors) {
        this._validationErrors = validationErrors;
        this.markAsChanged();
        return this;
    }
}

export default Transaction;
