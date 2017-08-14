
function createTransactionHandlerFactory() {

    const _createTransactionHandler = function(transactionFactory, observerFactory, transactionClient) {

        const _transactions = {};

        const _transactionNumbers = {};

        const _nextTransactionId = function(itemType, type) {
            if (!_transactionNumbers.hasOwnProperty(itemType)) {
                _transactionNumbers[itemType] = 1;
            }
            const transactionId = itemType + '-' _transactionNumbers[itemType] + '@' + type;
            _transactionNumbers[itemType] += 1;
            return transactionId;
        };

        const _registerTransaction = function(transaction) {
            const itemType = transaction.itemType;
            if (!_transactions.hasOwnProperty(itemType))) {
                _transactions[itemType] = {};
            }
            _transactions[itemType][transaction.transactionId] = transaction;
        };

        return {

            createInsertTransaction: function(itemType, data) {
                const transactionId = _nextTransactionId(itemType, 'insert');
                return transactionFactory.createInsertTransaction(
                    transactionId, itemType, data, this);
            },

            createUpdateTransaction: function(itemType, data) {
                const transactionId = _nextTransactionId(itemType, 'update');
                const transaction = transactionFactory.createUpdateTransaction(
                    transactionId, itemType, data, this);
                _registerTransaction(transaction);
                return transaction;
            },

            createDeleteTransaction: function(itemType, dataId) {
                const transactionId = _nextTransactionId(itemType, 'delete');
                const transaction = transactionFactory.createDeleteTransaction(
                    transactionId, itemType, dataId, this);
                _registerTransaction(transaction);
                return transaction;
            },

            createLoginTransaction: function(itemType, credentials) {
                const transactionId = _nextTransactionId(itemType, 'login');
                const transaction = transactionFactory.createLoginTransaction(
                    transactionId, itemType, credentials, this);
                _registerTransaction(transaction);
                return transaction;
            },

            createRegisterTransaction: function(itemType, credentials) {
                const transactionId = _nextTransactionId(itemType, 'register');
                const transaction = transactionFactory.createRegisterTransaction(
                    transactionId, itemType, credentials, this);
                _registerTransaction(transaction);
                return transaction;
            },

            getTransaction: function(itemType, transactionId) {
                return this.hasRegisteredTransaction() 
                    ? _transactions[itemType][transactionId] : undefined;
            },

            destroyTransaction: function(itemType, transactionId) {
                if (_transactions.hasOwnProperty(itemType)) {
                    delete _transactions[itemType][transactionId];
                }
            },

            createObserver: function() {
                return observerFactory.createTransactionObserver();
            },

            start: function(transaction) {
                transactionClient.start(transaction);
                return this;
            },

            cancel: function(transaction) {
                transactionClient.cancel(transaction);
                return this;
            },

            get listenersToDispatchChanged() {
                const listeners = [];
                for (let itemType in _transactions) {
                    for (let transactionId in _transactions[itemType]) {
                        const transaction = _transactions[itemType][transactionId];
                        if (transaction.changed()) {
                            listeners = listeners.concat(transaction.listeners);
                        }
                    }
                }
                return listeners;
            },

            clearAllChanges: function() {
                for (let itemType in _transactions) {
                    for (let transactionId in _transactions[itemType]) {
                        _transactions[itemType][transactionId].clearAllChanges();
                    }
                }
                return this;
            }
        }
    }

    return {

        createTransactionHandler: _createTransactionHandler,

    };

}

export default createTransactionHandlerFactory; 
