
import { ObservableObject } from '../observable';

class CacheMap extends ObservableObject {

    constructor() {
        this._entries = {};
    }

    get changed() {
        let changed = super.changed();
        if (!changed) {
            for (let entryId in this._entries) {
                if (this._entries[entryId].changed()) {
                    changed = true;
                    break;
                }
            }
        }
        return changed;
    }

    clearAllChances() {
        super.clearAllChances();
        if (this.observed) {
            for (let entryId in this._entries) {
                this._entries[entryId].clearAllChances();
            }
        }
        return this;
    }

    exists(entryId) {
        this._markAsRead(entryId);
        return this._entries.hasOwnProperty(entryId);
    }

    find(entryId) {
        this._markAsRead(entryId);
        return this.exists(entryId) 
            ? this._entries[entryId] : null;
    }

    set(entryId, entry) {
        this._entries[entryId] = entry;
        this._markAsChanged(entryId);
        return this;
    }

    clear(entryId) {
        delete this._entries[entryId];
        this._markAsChanged(entryId);
        return this;
    }
}

export default CacheMap; 
