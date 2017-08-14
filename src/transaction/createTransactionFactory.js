
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

        return {

            get transactionId() {
                transactionHandler.markAsRead(transactionId, 'transactionId');
                return transactionId;
            },

            get itemType() {
                transactionHandler.markAsRead(transactionId, 'itemType');
                return itemType;
            },

            get type() {
                transactionHandler.markAsRead(transactionId, 'type');
                return type;
            },

            get ready() {
                transactionHandler.markAsRead(transactionId, 'ready');
                return _ready;
            },

            get processing() {
                transactionHandler.markAsRead(transactionId, 'processing');
                return _processing;
            },

            get failed() {
                transactionHandler.markAsRead(transactionId, 'failed');
                return _failed;
            },

            get hasErrors() {
                transactionHandler.markAsRead(transactionId, 'hasErrors');
                return (this.errors.length > 0);
            },

            get errors() {
                transactionHandler.markAsRead(transactionId, 'errors');
                return _errors;
            },

            get hasValidationErrors() {
                transactionHandler.markAsRead(transactionId, 'hasValidationErrors');
                return (Object.keys(this.validationErrors).length > 0);
            },

            get validationErrors() {
                transactionHandler.markAsRead(transactionId, 'validationErrors');
                return _validationErrors;
            },

            setReady: function(ready) {
                _ready = ready;
                transactionHandler.markAsChanged(transactionId, 'ready');
            },

            setProcessing: function(processing) {
                _processing = processing;
                transactionHandler.markAsChanged(transactionId, 'processing');
            },

            setFailed: function(failed) {
                _failed = failed;
                transactionHandler.markAsChanged(transactionId, 'failed');
            },

            setErrors: function(errors) {
                _errors = errors;
                transactionHandler.markAsChanged(transactionId, 'errors');
            },

            setValidationErrors: function(errors) {
                _validationErrors = validationErrors;
                transactionHandler.markAsChanged(transactionId, 'validationErrors');
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
                transactionHandler.markAsRead(transactionId, 'data');
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
                transactionHandler.markAsRead(transactionId, 'data');
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
                transactionHandler.markAsRead(transactionId, 'dataId');
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
                transactionHandler.markAsRead(transactionId, 'credentials');
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
                transactionHandler.markAsRead(transactionId, 'credentials');
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
