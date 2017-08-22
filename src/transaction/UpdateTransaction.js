
import Transaction from './Transaction';

class UpdateTransaction extends Transaction {

    constructor(transactionId, itemType, itemId, data) {
        super(transactionId, itemType, 'update');
        this._itemId = itemId;
        this.data = data;
    }

    get itemId() {
        return _itemId;
    }

    get data() {
        return _data;
    }
}

export default UpdateTransaction;
