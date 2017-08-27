
const assign = Object.assign;

class CacheEntryDispatcher  {

    constructor(CacheEntryClass) {
        this._CacheEntryClass = CacheEntryClass;
    }

    _cloneObject(object) {
        return assign({}, object);
    }

    _cloneArray(array) {
        return array.slice(0);
    }

    _createCacheEntry(payload) {
        const CacheEntryClass = this._CacheEntryClass;
        return new CacheEntryClass(payload);
    }

    _updateCacheEntry(cacheEntry, payload) {
        cacheEntry.fill(payload);
        return this;
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
                    const newCacheEntry = this._createCacheEntry(action.payload[i]);
                    newCacheEntry.markAsChanged();
                    cacheMap.set(this._getCacheEntryId(cacheEntry), cacheEntry);
                }
            }
            else {
                const newCacheEntry = this._createCacheEntry(action.payload);
                newCacheEntry.markAsChanged();
                cacheMap.set(this._getCacheEntryId(cacheEntry), cacheEntry);
            }
        }
        else if (actionTypeFrags[0] === 'UPDATE') {
            const cacheEntry = cacheMap.find(action.id);
            if (cacheEntry) {
                this._updateCacheEntry(cacheEntry, action.payload);
                cacheMap.markAsChanged();
            }
        }
        else if (actionTypeFrags[0] === 'REMOVE') {
            cacheMap.remove(action.id);
        }
    }
}

export default CacheEntryDispatcher;