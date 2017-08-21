
import Observable from './Observable';
import ArrayObserver from './ArrayObserver';

class ObservableArray extends Observable { 

    constructor(wrapped) {
        this._wrapped = wrapped ? wrapped : [];
    }

    _createObserver() {
        return new ArrayObserver();
    }

    _markAsRead() {
        if (this._observer !== null) {
            this._observer.markAsRead();
        }
    }

    _markAsChanged() {
        if (this._observer !== null) {
            this._observer.markAsChanged();
        }
    }

    set [index](value) {
        this._wrapped[index] = value;
        this._markAsChanged();
    }

    get [index] {
        this._markAsRead();
        return index >= 0 && index < this._wrapped.length ? this._wrapped[index] : undefined;
    }

    get length() {
        this._markAsRead();
        return this._wrapped.length;
    }

    get plainArray() {
        return this._wrapped;
    }

    concat(other1) {
        this._markAsRead();
        return this._wrapped.concat(arguments);
    }

    copyWithin(target, start, end) {
        this._markAsRead();
        return this._wrapped.copyWithin(arguments);
    }

    entries() {
        this._markAsRead();
        return this._wrapped.entries();
    }

    every(callback, thisArg) {
        this._markAsRead();
        return this._wrapped.entries(arguments);
    }
    
    fill(value, start, end) {
        this._markAsChanged();
        this._wrapped.fill(arguments);
        return this;
    }
    
    filter(callback, thisArg) {
        this._markAsRead();
        return this._wrapped.filter(arguments);
    }
    
    find(callback, thisArg) {
        this._markAsRead();
        return this._wrapped.find(arguments);
    }
    
    findIndex(callback, thisArg) {
        this._markAsRead();
        return this._wrapped.findIndex(arguments);
    }
    
    forEach(callback, thisArg) {
        this._markAsRead();
        this._wrapped.forEach(arguments);
    }
    
    includes(searchElement, fromIndex) {
        this._markAsRead();
        return this._wrapped.includes(arguments);
    }
    
    indexOf(searchElement, fromIndex) {
        this._markAsRead();
        return this._wrapped.indexOf(arguments);
    }
    
    join(separator) {
        this._markAsRead();
        return this._wrapped.join(separator);
    }
    
    keys() {
        this._markAsRead();
        return this._wrapped.keys();
    }
    
    lastIndexOf(searchElement, fromIndex) {
        this._markAsRead();
        return this._wrapped.lastIndexOf(arguments);
    }
    
    map(callback, thisArg) {
        this._markAsRead();
        return this._wrapped.map(arguments));
    }
    
    pop() {
        this._markAsRead();
        return this._wrapped.pop();
    }
    
    push(element1) {
        this._markAsChanged();
        this._wrapped.push(arguments);
        return this._wrapped.length;
    }
    
    reduce(callback, initialValue) {
        this._markAsRead();
        return this._wrapped.reduce(arguments);
    }
    
    reduceRight(callback, initialValue) {
        this._markAsRead();
        return this._wrapped.reduce(arguments);
    }
    
    reverse() {
        this._markAsChanged();
        return this._wrapped.reverse();
    }
    
    shift() {
        this._markAsChanged();
        return this._wrapped.shift();
    }
    
    slice(begin, end) {
        this._markAsRead();
        return this._wrapped.slice(arguments));
    }
    
    some(callback, thisArg) {
        this._markAsRead();
        return this._wrapped.some(arguments);
    }
    
    sort(compareFunction) {
        this._markAsChanged();
        return this._wrapped.sort(compareFunction);
    }
    
    splice(start, deleteCount, item1) {
        this._markAsChanged();
        return this._wrapped.splice(arguments);
    }

    toLocalString() {
        this._markAsRead();
        return this._wrapped.toLocalString();
    }

    toSource() {
        this._markAsRead();
        return this._wrapped.toSource();
    }
    
    toString() {
        this._markAsRead();
        return this._wrapped.toString();
    }

    unshift(element1) {
        this._markAsChanged();
        return this._wrapped.unshift(arguments);
    }

    values() {
        this._markAsRead();
        return this._wrapped.values();
    }
}
