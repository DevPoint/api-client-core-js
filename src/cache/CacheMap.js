
import { ObservableObject } from '../observable';

class CacheMap extends ObservableObject {

    constructor(cacheMapId) {
        this._cacheMapId = cacheMapId;
        this._entries = {};
    }

    _remove(entryId) {
        const entry = this.find(entryId);
        delete this._entries[entryId];
        this._markAsChanged();
    }

    get cacheMapId() {
        return this._cacheMapId;
    }

    exists(entryId) {
        return this._entries.hasOwnProperty(entryId);
    }

    find(entryId) {
        return this.exists(entryId) 
            ? this._entries[entryId] : undefined;
    }

    set(entryId, entry) {
        if (this.exists(entryId)) {
            this._remove(entryId);
        }
        this._entries[entryId] = entry;
        this._markAsChanged();
        return this;
    }

    remove(entryId) {
        if (this.exists(entryId)) {
            this._remove(entryId);
        }
        return this;
    }

}

export default CacheMap; 
