
import Transaction from './Transaction';

class DeleteTransaction extends Transaction {

    constructor(transactionId, itemType, dataId, handler) {
        super(transactionId, itemType, 'update', handler);
        this._dataId = dataId;
    }

    get dataId() {
        _markAsRead('dataId');
        return _dataId;
    }
}

export default DeleteTransaction;