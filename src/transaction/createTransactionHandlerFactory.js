
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

        return {

            hasTransaction: function(itemType, transactionId) {
                return (_transactions.hasOwnProperty(itemType) &&
                    _transactions[itemType].hasOwnProperty(transactionId));
            },

            getTransaction: function(itemType, transactionId) {
                return this.hasRegisteredTransaction() 
                    ? _transactions[itemType][transactionId] : undefined;
            },

            registerTransaction: function(transaction) {
                const itemType = transaction.itemType;
                if (!_transactions.hasOwnProperty(itemType))) {
                    _transactions[itemType] = {};
                }
                _transactions[itemType][transaction.transactionId] = transaction;
                return this;
            },

            unregisterTransaction: function(transaction) {
                const itemType = transaction.itemType;
                if (_transactions.hasOwnProperty(itemType)) {
                    delete _transactions[itemType][transaction.transactionId];
                }
            },

            createInsertTransaction: function(itemType, data) {
                const transactionId = _nextTransactionId(itemType, 'insert');
                return transactionFactory.createInsertTransaction(
                    transactionId, itemType, data, this);
            },

            createUpdateTransaction: function(itemType, data) {
                const transactionId = _nextTransactionId(itemType, 'update');
                return transactionFactory.createUpdateTransaction(
                    transactionId, itemType, data, this);
            },

            createDeleteTransaction: function(itemType, dataId) {
                const transactionId = _nextTransactionId(itemType, 'delete');
                return transactionFactory.createDeleteTransaction(
                    transactionId, itemType, dataId, this);
            },

            createLoginTransaction: function(itemType, credentials) {
                const transactionId = _nextTransactionId(itemType, 'login');
                return transactionFactory.createLoginTransaction(
                    transactionId, itemType, credentials, this);
            },

            createRegisterTransaction: function(itemType, credentials) {
                const transactionId = _nextTransactionId(itemType, 'register');
                return transactionFactory.createRegisterTransaction(
                    transactionId, itemType, credentials, this);
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
