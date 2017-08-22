
import Observable from './Observable';
import ArrayObserver from './ArrayObserver';

class ObservableArray extends Observable { 

    constructor(wrapped) {
        this._wrapped = wrapped ? wrapped : [];
    }

    get length() {
        return this._wrapped.length;
    }

    get(index) {
        return this._wrapped[index];
    }

    set(index, value) {
        this._wrapped[index] = value;
        this._markAsChanged();
    }

    concat(other1) {
        return this._wrapped.concat(arguments);
    }

    copyWithin(target, start, end) {
        return this._wrapped.copyWithin(arguments);
    }

    entries() {
        return this._wrapped.entries();
    }

    every(callback, thisArg) {
        return this._wrapped.entries(arguments);
    }
    
    fill(value, start, end) {
        this._markAsChanged();
        this._wrapped.fill(arguments);
        return this;
    }
    
    filter(callback, thisArg) {
        return this._wrapped.filter(arguments);
    }
    
    find(callback, thisArg) {
        return this._wrapped.find(arguments);
    }
    
    findIndex(callback, thisArg) {
        return this._wrapped.findIndex(arguments);
    }
    
    forEach(callback, thisArg) {
        this._wrapped.forEach(arguments);
    }
    
    includes(searchElement, fromIndex) {
        return this._wrapped.includes(arguments);
    }
    
    indexOf(searchElement, fromIndex) {
        return this._wrapped.indexOf(arguments);
    }
    
    join(separator) {
        return this._wrapped.join(separator);
    }
    
    keys() {
        return this._wrapped.keys();
    }
    
    lastIndexOf(searchElement, fromIndex) {
        return this._wrapped.lastIndexOf(arguments);
    }
    
    map(callback, thisArg) {
        return this._wrapped.map(arguments));
    }
    
    pop() {
        const result = this._wrapped.pop();
        this._markAsChanged();
        return result;
    }
    
    push(element1) {
        const result = this._wrapped.push(arguments);
        this._markAsChanged();
        return result;
    }
    
    reduce(callback, initialValue) {
        return this._wrapped.reduce(arguments);
    }
    
    reduceRight(callback, initialValue) {
        return this._wrapped.reduce(arguments);
    }
    
    reverse() {
        const result = this._wrapped.reverse();
        this._markAsChanged();
        return result;
    }
    
    shift() {
        const result = this._wrapped.shift();
        this._markAsChanged();
        return result;
    }
    
    slice(begin, end) {
        return this._wrapped.slice(arguments));
    }
    
    some(callback, thisArg) {
        return this._wrapped.some(arguments);
    }
    
    sort(compareFunction) {
        const result = this._wrapped.sort(compareFunction);
        this._markAsChanged();
        return result;
    }
    
    splice(start, deleteCount, item1) {
        this._markAsChanged();
        return this._wrapped.splice(arguments);
    }

    toLocalString() {
        return this._wrapped.toLocalString();
    }

    toSource() {
        return this._wrapped.toSource();
    }
    
    toString() {
        return this._wrapped.toString();
    }

    unshift(element1) {
        const result = this._wrapped.unshift(arguments);
        this._markAsChanged();
        return result;
    }

    values() {
        return this._wrapped.values();
    }
}
