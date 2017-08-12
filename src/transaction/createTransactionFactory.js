
function createTransactionFactory() {

    const _createTransaction = function(transactionId, type, transactionHandler) {

        let _ready = false;

        let _processing = false;

        let _failed = false;

        let _errors = [];

        let _validationErrors = null;

        const _handleTransactionReady = function() {
            _ready = true;
            _processing = false;
            _failed = false;
            _errors = [];
            _validationErrors = null;
        },

        const _handleTransactionCanceled = function() {
            _ready = false;
            _processing = false;
            _failed = false;
        },

        const _handleTransactionFailed = function(errors, meta) {
            _ready = true;
            _processing = false;
            _failed = true;
            _errors = errors.slice(0);
            _validationErrors = {};
            if (meta.hasOwnProperty('validationErrors')) {
                for (var key in meta.validationErrors) {
                    _validationErrors[key] = meta.validationErrors[key];
                }
            }
        },

        return {

            transactionId: function() {
                return transactionId;
            },

            type: function() {
                return type;
            },

            start: function() {
                if (!this.processing()) {
                    _ready = false;
                    _processing = true;
                    _errors = [];
                    _validationErrors = {};
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
                return _ready;
            },

            processing: function() {
                return _processing;
            },

            failed: function() {
                return _failed;
            },

            hasErrors: function() {
                return (_errors.length > 0);
            },

            errors: function() {
                return _errors;
            },

            hasValidationErrors: function() {
                return (Object.keys(_validationErrors).length > 0);
            },

            validationErrors: function() {
                return _validationErrors;
            }
        }
    }

    return {

        createTransaction: _createTransaction,

    };

}

export default createTransactionFactory; 
