
import { Observable, ObservableObject } from '../observable';
import CacheMapException from './CacheMapException';
import CacheConstructorType from './CacheConstructorType';
import CachePropType from './CachePropType';
import CacheEntry from './CacheEntry';

class CacheMap extends ObservableObject {

    constructor(cacheMapId, entryType, entriesAreObservables) {
        this._cacheMapId = cacheMapId;
        this._entryType = entryType;
        this._entriesAreObservables = entriesAreObservables;
        this._entries = {};
    }

    _remove(entryId) {
        const entry = this.find(entryId);
        if (this._entriesAreObservables) {
            if (!entry instanceof Observable) {
                throw new CacheMapException('Cache entry must be instanceof Observable!');
            }
            entry.removeParentObserver(this.observer);
        }
        delete this._entries[entryId];
        this._markAsChanged();
    }

    get cacheMapId() {
        return this._cacheMapId;
    }

    get entriesAreObservables() {
        return this._entriesAreObservables;
    }

    createEntry(payload) {
        const entry = new CacheEntry();
        for (let propKey in this._entryType) {
            const propType = this._entryType[propKey];
            if (propType instanceof CachePropType) {
                entry[propKey] = propType.default;
            }
        }
        if (this.entryType.construct && 
            this.entryType.construct instanceof CacheConstructorType) {
            for (let propKey in this.entryType.construct.propKeys) {
                entry[propKey] = payload[propKey];
            } 
        }
        return entry;
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
        if (this._entriesAreObservables) {
            if (!entry instanceof Observable) {
                throw new CacheMapException('Cache entry must be instanceof Observable!');
            }
            entry.addParentObserver(this.observer);
        }
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
