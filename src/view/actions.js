
export default {

    loadingStart(nameSpace, viewId, itemType, loadingMeta) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'SET_VIEW',
            id: viewId,
            itemType: itemType,
            payload: {
                loadingMeta: {
                    eagerType: loadingMeta.eagerType,
                    offset: loadingMeta.offset,
                    count: loadingMeta.count,
                    pageSize: loadingMeta.pageSize
                }
            }
        };
    }

    loadingSucceeded(nameSpace, viewId, loadingMeta, itemsIds) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'UPDATE_VIEW',
            id: viewId,
            payload: {
                ready: true,
                loading: false,
                succeeded: true,
                loadingMeta: {
                    totalCount: loadingMeta.totalCount
                }
                itemsIds: itemsIds
            }
        };
    }

    loadingFailed(nameSpace, viewId, errors) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'UPDATE_VIEW',
            id: viewId,
            payload: {
                ready: true,
                loading: false,
                failed: true,
                errors: errors
            }
        };
    }
};
