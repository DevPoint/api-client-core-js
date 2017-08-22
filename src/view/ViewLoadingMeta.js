
import { ObservableObject } from '../observable';

class ViewLoadingMeta extends ObservableObject {

    constructor(eagerType, offset, count, pageSize) {
        super();
        this._eagerType = eagerType;
        this._offset = offset;
        this._count = count;
        this._pageSize = pageSize;
        this._totalCount = 0;
    }

    set offset(value) {
        this._offset = value;
        this._markAsChanged();
    }

    get offset() {
        return this._offset;
    }

    set count(value) {
        this._count = value;
        this._markAsChanged();
    }

    get count() {
        return this._count;
    }

    set pageSize(value) {
        this._pageSize = value;
        this._markAsChanged();
    }

    get pageSize() {
        return this._pageSize;
    }

    set page(value) {
        this._page = value;
        this._markAsChanged();
    }

    get page() {
        return this.pageSize ? (this.count / this.pageSize + 1) : 0;
    }

    get totalCount() {
        return this._totalCount;
    }
}

export default ViewLoadingMeta;
