
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

            get transactionProxy() { 
                return {};
            },

            set ready(ready) {
                _ready = ready;
                transactionHandler.markAsChanged(transactionId, 'ready');
            },

            setProcessing(processing) {
                _processing = processing;
                transactionHandler.markAsChanged(transactionId, 'processing');
            },

            setFailed(failed) {
                _failed = failed;
                transactionHandler.markAsChanged(transactionId, 'failed');
            },

            setErrors(errors) {
                _errors = errors;
                transactionHandler.markAsChanged(transactionId, 'errors');
            },

            setValidationErrors(errors) {
                _validationErrors = validationErrors;
                transactionHandler.markAsChanged(transactionId, 'validationErrors');
            },

            handleTransactionReady() {
                this.setReady(true);
                this.setProcessing(false);
                this.setFailed(false);
                this.setErrors([]);
                this.setValidationErrors(null);
            };

            handleTransactionCanceled() {
                this.setReady(false);
                this.setProcessing(false);
                this.setFailed(false);
            };

            handleTransactionFailed(errors, meta) {
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
            };

            start() {
                if (!this.processing) {
                    this.setReady(false);
                    this.setProcessing(true);
                    this.setFailed(false);
                    this.setErrors([]);
                    this.setValidationErrors(null);
                    transactionHandler.start(this.transactionProxy);
                }
                return this;
            },

            cancel: function() {
                if (this.processing) {
                    transactionHandler.cancel({
                        onCanceled: _handleTransactionCanceled
                    });
                }
                return this;
            }
        };
    };

    _createUpdateTransaction: function(transactionId, itemType, data, transactionHandler) {

        const _data = _cloneData(data);
        
        const transaction = _createBaseTransaction(
            transactionId, itemType, 'update', 
            transactionHandler);

        const expand = {

            get transactionProxy() {
                transactionHandler.markAsRead(transactionId, 'transactionProxy');
                return {
                    onReady: this.handleTransactionReady,
                    onFailed: this.handleTransactionFailed
                };
            },

            get data() {
                transactionHandler.markAsRead(transactionId, 'data');
                return data;
            }
        };

        for (let expandPropKey in expand) {
            transaction[expandPropKey] = expand[expandPropKey];
        }
        
        return transaction;
    };

    _createInsertTransaction: function(transactionId, itemType, data, transactionHandler) {
        
        const _data = _cloneData(data);

        const transaction = _createBaseTransaction(
            transactionId, itemType, 'insert', 
            transactionHandler);

        const expand = {

            get transactionProxy() {
                transactionHandler.markAsRead(transactionId, 'transactionProxy');
                return {
                    onReady: this.handleTransactionReady,
                    onFailed: this.handleTransactionFailed
                };
            },

            get data() {
                transactionHandler.markAsRead(transactionId, 'data');
                return data;
            }
        };

        for (let expandPropKey in expand) {
            transaction[expandPropKey] = expand[expandPropKey];
        }
       
        return transaction;
    };

    _createDeleteTransaction: function(transactionId, itemType, dataId, transactionHandler) {
        
        const transaction = _createBaseTransaction(
            transactionId, itemType, 'delete', 
            transactionHandler);

        const expand = {

            get transactionProxy() {
                transactionHandler.markAsRead(transactionId, 'transactionProxy');
                return {
                    onReady: this.handleTransactionReady,
                    onFailed: this.handleTransactionFailed
                };
            },

            get dataId() {
                transactionHandler.markAsRead(transactionId, 'dataId');
                return dataId;
            }
        };
        
        for (let expandPropKey in expand) {
            transaction[expandPropKey] = expand[expandPropKey];
        }
       
        return transaction;
    };

    return {

        createUpdateTransaction: _createUpdateTransaction,

        createInsertTransaction: _createInsertTransaction,

        createDeleteTransaction: _createDeleteTransaction

    };

}

export default createTransactionFactory; 
