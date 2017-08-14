
function createTransactionFactory() {

    const _cloneData = function(data) {
        const cloned = {};
        for (let dataPropkey in data) {
            cloned[dataPropkey] = data[_dataPropKey];
        }
        return cloned;
    };

    const _createBaseTransaction = function(transactionId, itemType, type, transactionHandler) {

        let _ready = false;

        let _processing = false;

        let _failed = false;

        let _errors = [];

        let _validationErrors = null;

        let _observer = null;

        const _markAsRead = function(propKey) {
            if (_observer !== null) {
                _observer.markAsRead(propKey);
            }
        };

        const _markAsChanged = function(propKey) {
            if (_observer !== null) {
                _observer._markAsChanged(propKey);
            }
        };

        return {

            get transactionId() {
                _markAsRead('transactionId');
                return transactionId;
            },

            get itemType() {
                _markAsRead('itemType');
                return itemType;
            },

            get type() {
                _markAsRead('type');
                return type;
            },

            get ready() {
                _markAsRead('ready');
                return _ready;
            },

            get processing() {
                _markAsRead('processing');
                return _processing;
            },

            get failed() {
                _markAsRead('failed');
                return _failed;
            },

            get hasErrors() {
                _markAsRead('hasErrors');
                return (this.errors.length > 0);
            },

            get errors() {
                _markAsRead('errors');
                return _errors;
            },

            get hasValidationErrors() {
                _markAsRead('hasValidationErrors');
                return (Object.keys(this.validationErrors).length > 0);
            },

            get validationErrors() {
                _markAsRead('validationErrors');
                return _validationErrors;
            },

            get observed() {
                _markAsRead('observed');
                return this.observer !== null;
            },

            get observer() {
                _markAsRead('observer');
                return _observer;
            },

            setReady: function(ready) {
                _ready = ready;
                _markAsChanged('ready');
            },

            setProcessing: function(processing) {
                _processing = processing;
                _markAsChanged('processing');
            },

            setFailed: function(failed) {
                _failed = failed;
                _markAsChanged('failed');
            },

            setErrors: function(errors) {
                _errors = errors;
                _markAsChanged('errors');
            },

            setValidationErrors: function(errors) {
                _validationErrors = validationErrors;
                _markAsChanged('validationErrors');
            },

            handleTransactionReady: function() {
                this.setReady(true);
                this.setProcessing(false);
                this.setFailed(false);
                this.setErrors([]);
                this.setValidationErrors(null);
            },

            handleTransactionCanceled: function() {
                this.setReady(false);
                this.setProcessing(false);
                this.setFailed(false);
            },

            handleTransactionFailed: function(errors, meta) {
                this.setReady(true);
                this.setProcessing(false);
                this.setFailed(true);
                this.setErrors(errors.slice(0));
                if (meta.hasOwnProperty('validationErrors')) {
                    const validationErrors = {};
                    for (var key in meta.validationErrors) {
                        validationErrors[key] = meta.validationErrors[key];
                    }
                    this.setValidationErrors(validationErrors);
                }
            },

            start: function() {
                if (!this.processing) {
                    this.setReady(false);
                    this.setProcessing(true);
                    this.setFailed(false);
                    this.setErrors([]);
                    this.setValidationErrors(null);
                    transactionHandler.start(this);
                }
                return this;
            },

            cancel: function() {
                if (this.processing) {
                    transactionHandler.cancel(this);
                }
                return this;
            },

            addObserverListener: function(listener) {
                if (!this.hasObserver) {
                    _observer = transactionHandler.createObserver();
                    _markAsChanged('observer');
                }
                this.observer.addListener(listener);
                return this;
            },

            removeObserverListener: function(listener) {
                if (this.hasObserver) {
                    this.observer.removeListener(listener);
                    if (this.observer.listeners.length == 0) {
                        _observer = null;
                        _markAsChanged('observer');
                    }
                }
                return this;
            }
        };
    };

    _createUpdateTransaction: function(transactionId, itemType, data, transactionHandler) {

        const _data = _cloneData(data);
        
        const self = _createBaseTransaction(
            transactionId, itemType, 'update', 
            transactionHandler);

        const expand = {

            get data() {
                _markAsRead('data');
                return _data;
            }
        };

        for (let expandPropKey in expand) {
            self[expandPropKey] = expand[expandPropKey];
        }
        
        return self;
    };

    _createInsertTransaction: function(transactionId, itemType, data, transactionHandler) {
        
        const _data = _cloneData(data);

        const self = _createBaseTransaction(
            transactionId, itemType, 'insert', 
            transactionHandler);

        const expand = {

            get data() {
                _markAsRead('data');
                return _data;
            }
        };

        for (let expandPropKey in expand) {
            self[expandPropKey] = expand[expandPropKey];
        }
       
        return self;
    };

    _createDeleteTransaction: function(transactionId, itemType, dataId, transactionHandler) {
        
        const self = _createBaseTransaction(
            transactionId, itemType, 'delete', 
            transactionHandler);

        const expand = {

            get dataId() {
                _markAsRead('dataId');
                return dataId;
            }
        };
        
        for (let expandPropKey in expand) {
            self[expandPropKey] = expand[expandPropKey];
        }
       
        return self;
    };

    _createLoginTransaction: function(transactionId, itemType, credentials, transactionHandler) {
        
        const _credentials = _cloneData(credentials);

        const self = _createBaseTransaction(
            transactionId, itemType, 'login', 
            transactionHandler);

        const expand = {

            get credentials() {
                _markAsRead('credentials');
                return _credentials;
            }
        };

        for (let expandPropKey in expand) {
            self[expandPropKey] = expand[expandPropKey];
        }
       
        return self;
    };

    _createRegisterTransaction: function(transactionId, itemType, credentials, transactionHandler) {
        
        const _credentials = _cloneData(credentials);

        const self = _createBaseTransaction(
            transactionId, itemType, 'register', 
            transactionHandler);

        const expand = {

            get credentials() {
                _markAsRead('credentials');
                return _credentials;
            }
        };

        for (let expandPropKey in expand) {
            self[expandPropKey] = expand[expandPropKey];
        }
       
        return self;
    };

    return {

        createBaseTransaction: _createBaseTransaction,

        createUpdateTransaction: _createUpdateTransaction,

        createInsertTransaction: _createInsertTransaction,

        createDeleteTransaction: _createDeleteTransaction,

        createLoginTransaction: _createLoginTransaction,

        createRegisterTransaction: _createRegisterTransaction

    };

}

export default createTransactionFactory; 
