
export default {

    /*
     * Transaction INSERT actions
     */

    insertStart(nameSpace, transactionId, itemType, data) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'SET_TRANSACTION_INSERT',
            id: transactionId,
            itemType: itemType,
            data: data,
            payload: {
                type: 'insert',
                ready: false,
                processing: true,
                succeeded: false,
                failed: false,
                itemId: null,
                errors: [],
                validationErrors: {}
            }
        };
    }

    insertSucceeded(nameSpace, transactionId, itemId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_INSERT',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                succeeded: true,
                itemId: itemId,
                errors: [],
                validationErrors: {}
            }
        };
    }

    insertFailed(nameSpace, transactionId, errors, validationErrors) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_INSERT',
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

    updateStart(nameSpace, transactionId, itemType, itemId, data) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'SET_TRANSACTION_UPDATE',
            id: transactionId,
            itemType: itemType,
            itemId: itemId,
            data: data,
            payload: {
                type: 'update',
                ready: false,
                processing: true,
                succeeded: false,
                failed: false,
                errors: [],
                validationErrors: {}
            }
        };
    }

    updateSucceeded(nameSpace, transactionId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_UPDATE',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                succeeded: true,
                errors: [],
                validationErrors: {}
            }
        };
    }

    updateFailed(nameSpace, transactionId, errors, validationErrors) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_UPDATE',
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
            type: nameSpacePrefix . 'SET_TRANSACTION_DELETE',
            id: transactionId,
            itemType: itemType,
            payload: {
                type: 'delete',
                ready: false,
                processing: true,
                failed: false,
                itemId: itemId,
                errors: []
            }
        };
    }

    deleteSucceeded(nameSpace, transactionId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_DELETE',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                succeeded: true,
                errors: []
            }
        };
    }

    deleteFailed(nameSpace, transactionId, errors) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_DELETE',
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

    loginStart(nameSpace, transactionId, itemType, credentials) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'SET_TRANSACTION_LOGIN',
            id: transactionId,
            itemType: itemType,
            credentials: credentials,
            payload: {
                type: 'login',
                ready: false,
                processing: true,
                succeeded: false,
                failed: false,
                userId: null,
                errors: [],
                validationErrors: {}
            }
        };
    }


    loginSucceeded(nameSpace, transactionId, userId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_LOGIN',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                succeeded: true,
                userId: userId,
                errors: [],
                validationErrors: {}
            }
        };
    }

    loginFailed(nameSpace, transactionId, errors, validationErrors) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_LOGIN',
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

    registerStart(nameSpace, transactionId, itemType, credentials) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'REGISTER_TRANSACTION_REGISTER',
            id: transactionId,
            itemType: itemType,
            credentials: credentials,
            payload: {
                type: 'register',
                ready: false,
                processing: true,
                succeeded: false,
                failed: false,
                token: '',
                errors: [],
            }
        };
    }

    registerSucceeded(nameSpace, transactionId, userId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_REGISTER',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                succeeded: true,
                userId: userId,
                errors: '',
            }
        };
    }

    registerFailed(nameSpace, transactionId, error) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_REGISTER',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                failed: true,
                errors: [error]
            }
        };
    }
};
