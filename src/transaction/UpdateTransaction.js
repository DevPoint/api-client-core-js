
import Transaction from './Transaction';

class UpdateTransaction extends Transaction {

    constructor(transactionId, itemType, data, handler) {
        super(transactionId, itemType, 'update', handler);
        this._data = data;
    }

    get data() {
        this._markAsRead('data');
        return _data;
    }
}

export default UpdateTransaction;