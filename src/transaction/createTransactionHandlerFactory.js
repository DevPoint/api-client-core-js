
function createTransactionHandlerFactory() {

    const _createTransactionHandler = function(transactionFactory, observerHandler, transactionClient) {

        const _transactions = {};

        let _transactionNumber = 1;

        const _hasTransaction = function(transactionId) {
            return _transactions.hasOwnProperty(transactionId);
        };

        const _nextTransactionId = function() {
            const transactionId = _transactionNumber + '@transaction';
            _transactionNumber++;
            return transactionId;
        };

        return {

            create: function(type) {
                const transactionId = _nextTransactionId();
                _transactions[transactionId] = transactionFactory.createTransaction(
                    transactionId, type, this);
                return _transactions[transactionId];
            },

            start: function(transactionId, transactionProxy) {
                if (_hasTransaction(transactionId)) {
                    const transaction = _transactions[transactionId]
                    transactionClient.start(transaction, transactionProxy);
                }
                return this;
            },

            cancel: function(transactionId, transactionProxy) {
                if (_hasTransaction(transactionId)) {
                    const transaction = _transactions[transactionId]
                    transactionClient.cancel(transaction, transactionProxy);
                }
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
