
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

            registerTransaction: function(transaction) {
                const transactionId = transaction.transactionId;
                const itemType = transaction.itemType;
                _transactions[itemType][transactionId] = transaction;
                return this;
            },

            unregisterTransaction: function(transaction) {
                const transactionId = transaction.transactionId;
                const itemType = transaction.itemType;
                if (_transactions.hasOwnProperty(itemType)) {
                    delete _transactions[itemType][transactionId];
                }
            },

            hasRegisteredTransaction: function(itemType, transactionId) {
                return (_transactions.hasOwnProperty(itemType) &&
                    _transactions[itemType][transactionId].hasOwnProperty(itemType));
            },

            getRegisteredTransaction: function(itemType, transactionId) {
                return this.hasRegisteredTransaction() 
                    ? _transactions[itemType][transactionId] : undefined;
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
                return observerFactory.createTransactionObjserver();
            },

            start: function(transaction) {
                transactionClient.start(transaction);
                return this;
            },

            cancel: function(transaction) {
                transactionClient.cancel(transaction);
                return this;
            },

            get changedObserversListeners() {
                const listeners = [];
                for (let itemType in _transactions) {
                    for (let transactionId in _transactions[itemType]) {
                        const transaction = _transactions[itemType][transactionId];
                        if (transaction.observed && transaction.observer.changed()) {
                            listeners = listeners.concat(transaction.observer.listeners);
                        }
                    }
                }
                return listeners;
            },

            clearAllObserverChanges: function() {
                for (let itemType in _transactions) {
                    for (let transactionId in _transactions[itemType]) {
                        const transaction = _transactions[itemType][transactionId];
                        if (transaction.observed) {
                            transaction.observer.clearAllChanges();
                        }
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
