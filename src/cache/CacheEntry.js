
import CachePropType from './CachePropType';
import Observable from '../observable/Observable';
import ObjectObserver from './observable/ObjectObserver';

class CacheEntry extends Observable { 

    constructor(type, data) {
        super();
        this._observer = this._createObserver();
        this._observerLocked = true;
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
    }

    _createObserver() {
        return new ObjectObserver();
    }

    get changed() {
        return this._observer.changed;
    }

    markAsChanged() {
        this._observer.markAsChanged();
        if (this._parentObserver !== null) {
            this._parentObserver.markAsChanged();
        }
    }

    update(data) {
        const type = this._type;
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
    }

    toObject() {
        const result = {};
        const type = this._type;
        for (let propKey in type) {
            const propType = type[propKey];
            if (propType instanceof CachePropType) {
                result[propKey] = this[propKey];
            }
        }
        return result;
    }
}

default export CacheEntry;
