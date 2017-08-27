
import { ObjectObserver, Observable } from '../observable';

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
        this._errors = [];
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

    get hasErrors() {
        return (this.errors.length > 0);
    }

    get errors() {
        return this._errors;
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

    setErrors(errors) {
        this._errors = errors;
        this.markAsChanged();
        return this;
    }
}


export default Transaction;
