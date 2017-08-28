
import { Observable, ObservableObject, ObservableException } from '../observable';
import CacheMapException from './CacheMapException';
import CacheEntry from './CacheEntry';

class CacheMap extends ObservableObject {

    constructor(cacheMapId) {
        this._cacheMapId = cacheMapId;
        this._entries = {};
    }

    _remove(entryId) {
        const entry = this.find(entryId);
        if (!(entry instanceof Observable)) {
            throw new ObservableException('Entry not an instance of Observable!');
        }
        entry.removeParentObserver(this.observer);
        delete this._entries[entryId];
        this._markAsChanged();
    }

    get cacheMapId() {
        return this._cacheMapId;
    }

    ids() {
        return Object.keys(this._views);
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
        if (!(entry instanceof Observable)) {
            throw new ObservableException('Entry not an instance of Observable!');
        }
        entry.addParentObserver(this.observer);
        this._markAsChanged();
        return this;
    }

    remove(entryId) {
        if (!this.exists(entryId)) {
            throw new CacheMapException('Try to remove entry which doesn\'t exist!');
        }
        this._remove(entryId);
        return this;
    }
}

export default CacheMap; 
