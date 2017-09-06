
export default {

    /*
     * Cache Entry SET, UPDATE, REMOVE actions
     */

    setCacheEntry: function(nameSpace, itemType, cacheId, data) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'SET_CACHE_' + itemType.toUpperCase(),
            id: cacheId,
            payload: data
        };
    },

    setCacheEntries: function(nameSpace, itemType, data) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'SET_CACHE_' + itemType.toUpperCase() + '_MANY',
            payload: data
        };
    },

    updateCacheEntry: function(nameSpace, itemType, cacheId, data) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'UPDATE_' + itemType.toUpperCase(),
            id: cacheId,
            payload: data
        };
    },

    removeCacheEntry: function(nameSpace, itemType, cacheId) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix + 'REMOVE_CACHE_' + itemType.toUpperCase(),
            id: cacheId
        };
    }
};
