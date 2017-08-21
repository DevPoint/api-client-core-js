
import { ObservableObject } from '../observer';

class ViewLoadingMeta extends ObservableObject {

    constructor(eagerType, offset, count, pageSize) {
        super();
        this._eagerType = eagerType;
        this._offset = offset;
        this._count = count;
        this._pageSize = pageSize;
        this._totalCount = 0;
        this._errors = [];
    }

    set offset(value) {
        this._offset = value;
        this._markAsRead('offset');
    }

    get offset() {
        this._markAsRead('offset');
        return this._offset;
    }

    set count(value) {
        this._count = value;
        this._markAsRead('count');
    }

    get count() {
        this._markAsRead('count');
        return this._count;
    }

    set pageSize(value) {
        this._pageSize = value;
        this._markAsRead('pageSize');
    }

    get pageSize() {
        return this._pageSize;
    }

    set page(value) {
        this._page = value;
        this._markAsRead('page');
    }

    get page() {
        this._markAsRead('page');
        return this.pageSize ? (this.count / this.pageSize + 1) : 0;
    }

    get totalCount() {
        this._markAsRead('totalCount');
        return this._totalCount;
    }
}

export default ViewLoadingMeta;
