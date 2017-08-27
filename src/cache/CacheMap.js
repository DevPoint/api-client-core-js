
import { Observable, ObservableObject } from '../observable';
import CacheMapException from './CacheMapException';
import CachePropType from './CachePropType';
import CacheEntry from './CacheEntry';

class CacheMap extends ObservableObject {

    constructor(cacheMapId, cacheEntryType, entriesAreObservables) {
        this._cacheMapId = cacheMapId;
        this._cacheEntryType = cacheEntryType;
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

    createEntry(data) {
        const CacheEntryClass = function(type, data) {
            CachEntry.call(this);
            this._type = type;
            for (let propKey in type) {
                const propType = type[propKey];
                if (propType instanceof CachePropType) {
                    this[propKey] = propType.default;
                }
            }
            for (let propKey in data) {
                if (type.hasOwnProperty(propKey)) {
                    const propType = type[propKey];
                    if (propType instanceof CachePropType) {
                        this[propKey] = data[propKey];
                    }
                }
            }
        };
        CacheEntryClass.prototype = CacheEntry;
        CacheEntryClass.toObject = function() {
            const result = {};
            const type = this._type;
            for (let propKey in type) {
                const propType = type[propKey];
                if (propType instanceof CachePropType) {
                    result[propKey] = this[propKey];
                }
            }
            return result;
        };
        CacheEntryClass.update = function(data) {
            const type = this._type;
            for (let propKey in data) {
                if (type.hasOwnProperty(propKey)) {
                    const propType = type[propKey];
                    if (propType instanceof CachePropType) {
                        this[propKey] = data[propKey];
                    }
                }
            }
        };
        return new CachEntryClass(this._cacheEntryType, data);
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
