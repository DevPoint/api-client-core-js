
import Transaction from './Transaction';

class UpdateTransaction extends Transaction {

    constructor(transactionId, itemType, dataId, data, handler) {
        super(transactionId, itemType, 'update', handler);
        this._dataId = data;
        this._data = data;
    }

    get dataId() {
        this._markAsRead('dataId');
        return _dataId;
    }

    get data() {
        this._markAsRead('data');
        return _data;
    }
}

export default UpdateTransaction;
