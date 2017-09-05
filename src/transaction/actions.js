
export default {

    /*
     * Transaction INSERT actions
     */

    insertStart(nameSpace, transactionId, itemType) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'SET_TRANSACTION_INSERT',
            id: transactionId,
            itemType: itemType
        };
    }

    insertSucceeded(nameSpace, transactionId, itemId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'UPDATE_TRANSACTION_INSERT',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                succeeded: true,
                itemsIds: [itemId]
            }
        };
    }

    insertFailed(nameSpace, transactionId, errors, validationErrors) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'UPDATE_TRANSACTION_INSERT',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                failed: true,
                errors: errors,
                validationErrors: validationErrors
            }
        };
    }

    /*
     * Transaction UPDATE actions
     */

    updateStart(nameSpace, transactionId, itemType, itemId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'SET_TRANSACTION_UPDATE',
            id: transactionId,
            itemType: itemType,
            payload: {
                itemsIds: [itemId]
            }
       };
    }

    updateSucceeded(nameSpace, transactionId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'UPDATE_TRANSACTION_UPDATE',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                succeeded: true
            }
        };
    }

    updateFailed(nameSpace, transactionId, errors, validationErrors) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'UPDATE_TRANSACTION_UPDATE',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                failed: true,
                errors: errors,
                validationErrors: validationErrors
            }
        };
    }

    /*
     * Transaction DELETE actions
     */

    deleteStart(nameSpace, transactionId, itemType, itemId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'SET_TRANSACTION_DELETE',
            id: transactionId,
            itemType: itemType,
            payload: {
                itemsIds: [itemId]
            }
        };
    }

    deleteSucceeded(nameSpace, transactionId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'UPDATE_TRANSACTION_DELETE',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                succeeded: true
            }
        };
    }

    deleteFailed(nameSpace, transactionId, errors) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'UPDATE_TRANSACTION_DELETE',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                failed: true,
                errors: errors
            }
        };
    }

    /*
     * Transaction LOGIN actions
     */

    loginStart(nameSpace, transactionId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'SET_TRANSACTION_LOGIN',
            id: transactionId,
            itemType: 'user'
        };
    }

    loginSucceeded(nameSpace, transactionId, userId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'UPDATE_TRANSACTION_LOGIN',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                succeeded: true,
                itemsIds: [userId]
            }
        };
    }

    loginFailed(nameSpace, transactionId, errors, validationErrors) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'UPDATE_TRANSACTION_LOGIN',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                failed: true,
                errors: errors,
                validationErrors: validationErrors
            }
        };
    }

    /*
     * Transaction REGISTER actions
     */

    registerStart(nameSpace, transactionId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'REGISTER_TRANSACTION_REGISTER',
            id: transactionId,
            itemType: 'user'
        };
    }

    registerSucceeded(nameSpace, transactionId, userId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'UPDATE_TRANSACTION_REGISTER',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                succeeded: true,
                itemsIds: [userId]
            }
        };
    }

    registerFailed(nameSpace, transactionId, errors) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'UPDATE_TRANSACTION_REGISTER',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                failed: true,
                errors: errors
            }
        };
    }
};
