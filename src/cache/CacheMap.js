
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

    clearChanged() {
        super.clearChanged();
        if (this.observed) {
            for (let entryId in this._entries) {
                this._entries[entryId].clearChanged();
            }
        }
        return this;
    }

    exists(entryId) {
        return this._entries.hasOwnProperty(entryId);
    }

    find(entryId) {
        return this.exists(entryId) 
            ? this._entries[entryId] : null;
    }

    set(entryId, entry) {
        this._entries[entryId] = entry;
        this._markAsChanged();
        return this;
    }

    clear(entryId) {
        delete this._entries[entryId];
        this._markAsChanged();
        return this;
    }
}

export default CacheMap; 
