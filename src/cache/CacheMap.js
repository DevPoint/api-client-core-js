
import { ObservableObject } from '../observable';

class CacheMap extends ObservableObject {

    constructor(cacheMapId) {
        this._cacheMapId = cacheMapId;
        this._entries = {};
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
        this._entries[entryId] = entry;
        this._markAsChanged();
        return this;
    }

    remove(entryId) {
        delete this._entries[entryId];
        this._markAsChanged();
        return this;
    }

    findAllChanged() {
        const changedEntries = [];
        for (let entryId in this._entries) {
            const entry = this._entries[entryId];
            if (entry.changed()) {
                changedEntries.push(entry));
                break;
            }
        }
        return changedEntries;
    }
}

export default CacheMap; 
