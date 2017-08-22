
import Transaction from './Transaction';

class DeleteTransaction extends Transaction {

    constructor(transactionId, itemType, itemId) {
        super(transactionId, itemType, 'delete');
        this._itemId = itemId;
    }

    get itemId() {
        return _itemId;
    }
}

export default DeleteTransaction;