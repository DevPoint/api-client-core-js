
import Transaction from './Transaction';

class InsertTransaction extends Transaction {

    constructor(transactionId, itemType, data) {
        super(transactionId, itemType, 'insert');
        this._data = data;
    }

    get data() {
        this._markAsRead('data');
        return _data;
    }
}
