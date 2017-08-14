
function createTransactionHandlerFactory() {

    const _createTransactionHandler = function(transactionFactory, observerHandler, transactionClient) {

        const _transactions = {};

        const _transactionNumbers = {};

        const _hasTransaction = function(transactionId) {
            return _transactions.hasOwnProperty(transactionId);
        };

        const _nextTransactionId = function(itemType, type) {
            if (!_transactionNumbers.hasOwnProperty(itemType)) {
                _transactionNumbers[itemType] = 1;
            }
            const transactionId = itemType + '-' _transactionNumbers[itemType] + '@' + type;
            _transactionNumbers[itemType] += 1;
            return transactionId;
        };

        return {

            createInsert: function(itemType, data) {
                const transactionId = _nextTransactionId(itemType, 'insert');
                _transactions[transactionId] = transactionFactory
                    .createInsertTransaction(
                        transactionId, itemType, data, this);
                return _transactions[transactionId];
            },

            createUpdate: function(itemType, data) {
                const transactionId = _nextTransactionId(itemType, 'update');
                _transactions[transactionId] = transactionFactory
                    .createUpdateTransaction(
                        transactionId, itemType, data, this);
                return _transactions[transactionId];
            },

            createDelete: function(itemType, dataId) {
                const transactionId = _nextTransactionId(itemType, 'delete');
                _transactions[transactionId] = transactionFactory
                    .createDeleteTransaction(
                        transactionId, itemType, dataId, this);
                return _transactions[transactionId];
            },

            createLogin: function(itemType, credentials) {
                const transactionId = _nextTransactionId(itemType, 'login');
                _transactions[transactionId] = transactionFactory
                    .createLoginTransaction(
                        transactionId, itemType, credentials, this);
                return _transactions[transactionId];
            },

            createRegister: function(itemType, credentials) {
                const transactionId = _nextTransactionId(itemType, 'register');
                _transactions[transactionId] = transactionFactory
                    .createRegisterTransaction(
                        transactionId, itemType, credentials, this);
                return _transactions[transactionId];
            },

            start: function(transaction) {
                transactionClient.start(transaction);
                return this;
            },

            cancel: function(transaction) {
                transactionClient.cancel(transaction);
                return this;
            },

            markAsRead: function(transactionId, propKey) {
                observerHandler.markTransactionAsRead(transactionId, propKey);
                return this;
            },

            markAsChanged: function(transactionId, propKey) {
                observerHandler.markTransactionAsChanged(transactionId, propKey);
                return this;
            }
        }
    }

    return {

        createTransactionHandler: _createTransactionHandler,

    };

}

export default createTransactionHandlerFactory; 
