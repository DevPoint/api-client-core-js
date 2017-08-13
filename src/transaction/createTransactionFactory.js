
function createTransactionFactory() {

    const _createTransaction = function(transactionId, type, transactionHandler) {

        let _ready = false;

        let _processing = false;

        let _failed = false;

        let _errors = [];

        let _validationErrors = null;

        const _setReady = function(ready) {
            _ready = ready;
            transactionHandler.markAsChanged(transactionId, 'ready');
        };

        const _setProcessing = function(processing) {
            _processing = processing;
            transactionHandler.markAsChanged(transactionId, 'processing');
        };

        const _setFailed = function(failed) {
            _failed = failed;
            transactionHandler.markAsChanged(transactionId, 'failed');
        };

        const _setErrors = function(errors) {
            _errors = errors;
            transactionHandler.markAsChanged(transactionId, 'errors');
        };

        const _setValidationErrors = function(validationErrors) {
            _validationErrors = validationErrors;
            transactionHandler.markAsChanged(transactionId, 'validationErrors');
        };

        const _handleTransactionReady = function() {
            _setReady(true);
            _setProcessing(false);
            _setFailed(false);
            _setErrors([]);
            _setValidationErrors(null);
        };

        const _handleTransactionCanceled = function() {
            _setReady(false);
            _setProcessing(false);
            _setFailed(false);
        };

        const _handleTransactionFailed = function(errors, meta) {
            _setReady(true);
            _setProcessing(false);
            _setFailed(true);
            _setErrors(errors.slice(0));
            const validationErrors = {};
            if (meta.hasOwnProperty('validationErrors')) {
                for (var key in meta.validationErrors) {
                    validationErrors[key] = meta.validationErrors[key];
                }
            }
            _setValidationErrors(validationErrors);
        };

        return {

            transactionId: function() {
                transactionHandler.markAsRead(transactionId, 'transactionId');
                return transactionId;
            },

            type: function() {
                transactionHandler.markAsRead(transactionId, 'type');
                return type;
            },

            start: function() {
                if (!this.processing()) {
                    _setReady(false);
                    _setProcessing(true);
                    _setFailed(false);
                    _setErrors([]);
                    _setValidationErrors({});
                    transactionHandler.start({
                        onReady: _handleTransactionReady,
                        onFailed: _handleTransactionFailed
                    });
                }
            },

            cancel: function() {
                if (this.processing()) {
                    transactionHandler.cancel({
                        onCanceled: _handleTransactionCanceled
                    });
                }
            },

            ready: function() {
                transactionHandler.markAsRead(transactionId, 'ready');
                return _ready;
            },

            processing: function() {
                transactionHandler.markAsRead(transactionId, 'processing');
                return _processing;
            },

            failed: function() {
                transactionHandler.markAsRead(transactionId, 'failed');
                return _failed;
            },

            hasErrors: function() {
                transactionHandler.markAsRead(transactionId, 'errors');
                return (_errors.length > 0);
            },

            errors: function() {
                transactionHandler.markAsRead(transactionId, 'errors');
                return _errors;
            },

            hasValidationErrors: function() {
                transactionHandler.markAsRead(transactionId, '_validationErrors');
                return (Object.keys(_validationErrors).length > 0);
            },

            validationErrors: function() {
                transactionHandler.markAsRead(transactionId, '_validationErrors');
                return _validationErrors;
            }
        }
    }

    return {

        createTransaction: _createTransaction,

    };

}

export default createTransactionFactory; 
