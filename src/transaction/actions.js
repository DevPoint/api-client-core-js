
export default {

    /*
     * Transaction INSERT actions
     */

    insertStart: function(nameSpace, transactionId, itemType) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'SET_TRANSACTION_INSERT',
            id: transactionId,
            itemType: itemType
        };
    },

    insertSucceeded: function(nameSpace, transactionId, itemId) {
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
    },

    insertFailed: function(nameSpace, transactionId, errors, validationErrors) {
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
    },

    /*
     * Transaction UPDATE actions
     */

    updateStart: function(nameSpace, transactionId, itemType, itemId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'SET_TRANSACTION_UPDATE',
            id: transactionId,
            itemType: itemType,
            payload: {
                itemsIds: [itemId]
            }
       };
    },

    updateSucceeded: function(nameSpace, transactionId) {
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
    },

    updateFailed: function(nameSpace, transactionId, errors, validationErrors) {
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
    },

    /*
     * Transaction DELETE actions
     */

    deleteStart: function(nameSpace, transactionId, itemType, itemId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'SET_TRANSACTION_DELETE',
            id: transactionId,
            itemType: itemType,
            payload: {
                itemsIds: [itemId]
            }
        };
    },

    deleteSucceeded: function(nameSpace, transactionId) {
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
    },

    deleteFailed: function(nameSpace, transactionId, errors) {
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
    },

    /*
     * Transaction LOGIN actions
     */

    loginStart: function(nameSpace, transactionId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'SET_TRANSACTION_LOGIN',
            id: transactionId,
            itemType: 'user'
        };
    },

    loginSucceeded: function(nameSpace, transactionId, userId) {
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
    },

    loginFailed: function(nameSpace, transactionId, errors, validationErrors) {
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
    },

    /*
     * Transaction REGISTER actions
     */

    registerStart: function(nameSpace, transactionId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'REGISTER_TRANSACTION_REGISTER',
            id: transactionId,
            itemType: 'user'
        };
    },

    registerSucceeded: function(nameSpace, transactionId, userId) {
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
    },

    registerFailed: function(nameSpace, transactionId, errors) {
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
