
import Transaction from './Transaction';

class InsertTransaction extends Transaction {

    constructor(transactionId, itemType, data, handler) {
        super(transactionId, itemType, 'insert', handler);
        this._data = data;
    }

    get data() {
        _markAsRead('data');
        return _data;
    }
}
