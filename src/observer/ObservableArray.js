
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

    concat(other1, other2) {
        this._markAsRead();
        return this._wrapped.concat(arguments);
    }

    copyWithin(target, start, end) {
        this._markAsRead();
        return this._wrapped.copyWithin(target, start, end);
    }

    entries() {
        this._markAsRead();
        return this._wrapped.entries();
    }

    every(callback, thisArg) {
        this._markAsRead();
        return this._wrapped.entries(callback, thisArg);
    }
    
    fill(value, start, end) {
        this._markAsChanged();
        this._wrapped.fill(value, start, end);
        return this;
    }
    
    filter(callback, thisArg) {
        this._markAsRead();
        return this._wrapped.filter(callback, thisArg);
    }
    
    find(callback, thisArg) {
        this._markAsRead();
        return this._wrapped.find(callback, thisArg);
    }
    
    findIndex(callback, thisArg) {
        this._markAsRead();
        return this._wrapped.findIndex(callback, thisArg);
    }
    
    forEach(callback, thisArg) {
        this._markAsRead();
        this._wrapped.forEach(callback, thisArg);
    }
    
    includes(searchElement, fromIndex) {
        this._markAsRead();
        return this._wrapped.includes(searchElement, fromIndex);
    }
    
    indexOf(searchElement, fromIndex) {
        this._markAsRead();
        return this._wrapped.indexOf(searchElement, fromIndex);
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
        return this._wrapped.lastIndexOf(searchElement, fromIndex);
    }
    
    map(callback, thisArg) {
        this._markAsRead();
        return this._wrapped.map(callback, thisArg));
    }
    
    pop() {
        this._markAsRead();
        return this._wrapped.pop();
    }
    
    push(element1, element2) {
        this._markAsChanged();
        this._wrapped.push(arguments);
        return this._wrapped.length;
    }
    
    reduce(callback, initialValue) {
        this._markAsRead();
        return this._wrapped.reduce(callback, initialValue);
    }
    
    reduceRight(callback, initialValue) {
        this._markAsRead();
        return this._wrapped.reduce(callback, initialValue);
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
        return this._wrapped.slice(begin, end));
    }
    
    some(callback, thisArg) {
        this._markAsRead();
        return this._wrapped.some(callback, thisArg);
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
