
export default {

    /*
     * Transaction INSERT actions
     */

    insertStart: function(nameSpace, transactionId, itemType, data) {
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
                failed: false,
                itemId: null,
                errors: [],
                validationErrors: {}
            }
        };
    },

    insertReady: function(nameSpace, transactionId, itemId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_INSERT',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                failed: false,
                itemId: itemId,
                errors: [],
                validationErrors: {}
            }
        };
    },

    insertFailed: function(nameSpace, transactionId, errors, validationErrors) {
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
    },

    /*
     * Transaction UPDATE actions
     */

    updateStart: function(nameSpace, transactionId, itemType, itemId, data) {
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
                failed: false,
                errors: [],
                validationErrors: {}
            }
        };
    },

    updateReady: function(nameSpace, transactionId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_UPDATE',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                failed: false,
                errors: [],
                validationErrors: {}
            }
        };
    },

    updateFailed: function(nameSpace, transactionId, errors, validationErrors) {
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
    },

    /*
     * Transaction DELETE actions
     */

    deleteStart: function(nameSpace, transactionId, itemType, itemId) {
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
    },

    deleteReady: function(nameSpace, transactionId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_DELETE',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                failed: false,
                errors: []
            }
        };
    },

    deleteFailed: function(nameSpace, transactionId, errors) {
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
    },

    /*
     * Transaction LOGIN actions
     */

    loginStart: function(nameSpace, transactionId, itemType, credentials) {
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
                failed: false,
                userId: null,
                errors: [],
                validationErrors: {}
            }
        };
    },


    loginReady: function(nameSpace, transactionId, userId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_LOGIN',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                failed: false,
                userId: userId,
                errors: [],
                validationErrors: {}
            }
        };
    },

    loginFailed: function(nameSpace, transactionId, errors, validationErrors) {
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
    },

    /*
     * Transaction REGISTER actions
     */

    registerStart: function(nameSpace, transactionId, itemType, credentials) {
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
                failed: false,
                token: '',
                errors: [],
            }
        };
    },

    registerReady: function(nameSpace, transactionId, userId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_TRANSACTION_REGISTER',
            id: transactionId,
            payload: {
                ready: true,
                processing: false,
                failed: false,
                userId: userId,
                errors: '',
            }
        };
    },

    registerFailed: function(nameSpace, transactionId, error) {
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
    },
};
