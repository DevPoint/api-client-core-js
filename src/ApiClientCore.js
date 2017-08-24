
import transactionActions from './transaction/actions';
import TransactionMap from './transaction';
import viewActions from './view/actions';
import ViewMap from './transaction';

class ApiClientCore {

	constructor(nameSpace) {
		this._nameSpace = nameSpace;
		this._transactions = new TransactionMap();
		this._views = new ViewMap();
		this._caches = this._createCaches(),
	}

	_createCaches() {
		return {};
	}

	get nameSpace() {
		return this._nameSpace;
	}

	get transactions() {
		return _transactions;
	}

	get views() {
		return _views;
	}

	cache(itemType) {
		return this._caches[itemType];
	}

    insertStart(transactionId, itemType, data) {
    	return transactionActions.insertStart(this.nameSpace, transactionId, itemType, data);
    }

    insertSucceeded(transactionId, itemId) {
    	return transactionActions.insertSucceeded(this.nameSpace, transactionId, itemId);
    }

    insertFailed(transactionId, errors, validationErrors) {
    	return transactionActions.insertFailed(this.nameSpace, transactionId, errors, validationErrors);
    }

    updateStart(transactionId, itemType, itemId, data) {
    	return transactionActions.updateStart(this.nameSpace, transactionId, itemId, data);
    }

    updateSucceeded(transactionId) {
    	return transactionActions.updateSucceeded(this.nameSpace, transactionId);
    }

    updateFailed(transactionId, errors, validationErrors) {
    	return transactionActions.updateFailed(this.nameSpace, transactionId,errors, validationErrors);
    }

    deleteStart(transactionId, itemType, itemId) {
    	return transactionActions.deleteStart(this.nameSpace, transactionId, itemType, itemId);
    }

    deleteSucceeded(transactionId) {
    	return transactionActions.deleteSucceeded(this.nameSpace, transactionId);
    }

    deleteFailed(transactionId, errors) {
    	return transactionActions.deleteFailed(this.nameSpace, transactionId, errors);
    }

    loginStart(transactionId, credentials) {
    	return transactionActions.loginStart(this.nameSpace, transactionId, credentials);
    }

    loginSucceeded(transactionId, userId) {
    	return transactionActions.loginSucceeded(this.nameSpace, userId);
    }

    loginFailed(transactionId, errors, validationErrors) {
    	return transactionActions.loginFailed(this.nameSpace, transactionId, errors, validationErrors);
    }

    registerStart(transactionId, credentials) {
    	return transactionActions.registerStart(this.nameSpace, transactionId, credentials);
    }

    registerSucceeded(transactionId, userId) {
    	return transactionActions.registerSucceeded(this.nameSpace, userId);
    }

    registerFailed(transactionId, error) {
    	return transactionActions.registerFailed(this.nameSpace, transactionId, error);
    }
}