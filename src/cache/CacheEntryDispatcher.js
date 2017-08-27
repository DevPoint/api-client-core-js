
const assign = Object.assign;

class CacheEntryDispatcher  {

    _cloneObject(object) {
        return assign({}, object);
    }

    _cloneArray(array) {
        return array.slice(0);
    }

    _createCacheEntry(cacheMap, payload) {
        return cacheEntry.createEntry(payload);
    }

    _getCacheEntryId(cacheEntry) {
        return cacheEntry.id;
    }

    dispatch(cacheMap, action) {
        const actionTypeFrags = action.split('_');
        if (actionTypeFrags[0] === 'SET' || actionTypeFrags[0] === 'ADD') {
            if (actionTypeFrags.length >= 4 && actionTypeFrags[3] === 'MANY') {
                const entryCount = action.payload.length;
                for (let i = 0; i < entryCount; i++) {
                    const newCacheEntry = this._createCacheEntry(cacheMap, action.payload[i]);
                    this._updateCacheEntry(newCacheEntry, action.payload[i]);
                    cacheMap.set(this._getCacheEntryId(cacheEntry), cacheEntry);
                }
            }
            else {
                const newCacheEntry = this._createCacheEntry(cacheMap, action.payload);
                this._updateCacheEntry(newCacheEntry, action.payload);
                cacheMap.set(this._getCacheEntryId(cacheEntry), cacheEntry);
            }
        }
        else if (actionTypeFrags[0] === 'UPDATE') {
            const cacheEntry = cacheMap.find(action.id);
            if (cacheEntry) {
                this._updateCacheEntry(cacheEntry, action.payload);
            }
            cacheMap.markAsChanged();
        }
        else if (actionTypeFrags[0] === 'REMOVE') {
            cacheMap.remove(action.id);
        }
    }
}

export default CacheEntryDispatcher;