
import CacheEntry from './CacheEntry';
import CachePropType from './CachePropType';

class CacheDispatcherFactory {

    _createCacheEntryClass(cacheEntryType) {
        const CacheEntryClass = function(data) {
            CacheEntry.call(this);
            const type = this.prototype.type;
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
        }
        CacheEntryClass.prototype = CacheEntry;
        CacheEntryClass.type  = cacheEntryType;     
        CacheEntryClass.update = function(data) {
            const type = this.prototype.type;
            for (let propKey in data) {
                if (type.hasOwnProperty(propKey)) {
                    const propType = type[propKey];
                    if (propType instanceof CachePropType) {
                        this[propKey] = data[propKey];
                    }
                }
            }
            this.markAsChanged();
            return this;
        };
        CacheEntryClass.toObject = function() {
            const result = {};
            const type = this.prototype.type;
            for (let propKey in type) {
                const propType = type[propKey];
                if (propType instanceof CachePropType) {
                    result[propKey] = this[propKey];
                }
            }
            return result;
        }
        return CacheEntryClass;
    }

    createDispatchers() {
        const cacheDispatchers = {};
        return cacheDispatchers;
    }
}
