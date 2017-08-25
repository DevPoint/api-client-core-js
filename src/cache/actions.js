
export default {

    /*
     * Cache Entry SET, UPDATE, REMOVE actions
     */

    setCacheEntry(nameSpace, itemType, cacheId, data) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'SET_CACHE_' + itemType.toUpperCase(),
            id: cacheId,
            payload: data
        };
    }

    setCacheEntries(nameSpace, itemType, data) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'SET_CACHE_' + itemType.toUpperCase() + '_MANY',
            payload: data
        };
    }

    updateCacheEntry(nameSpace, itemType, cacheId, data) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'UPDATE_' + itemType.toUpperCase(),
            id: cacheId,
            payload: data
        };
    }

    removeCacheEntry(nameSpace, itemType, cacheId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'REMOVE_CACHE_' + itemType.toUpperCase(),
            id: cacheId
        };
    }
};
