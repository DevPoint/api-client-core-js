
import { Observable, ObjectObserver } from '../observable';
import ViewLoadingMeta from './ViewLoadingMeta';

class View extends Observable {

    constructor(viewId, itemType, loadingMeta) {
        super();
        this._viewId = viewId;
        this._itemType = itemType;
        this._ready = false;
        this._loading = false;
        this._succeeded = false;
        this._failed = false;
        this._outdated = false;
        this._loadingMeta = new ViewLoadingMeta('full', 0, 0);
        this._itemsIds = [];
    }

    _createObserver() {
        return new ObjectObserver();
    }

    get changed() {
        let changed = false;
        if (this._observer) {
            changed = this._observer.changed;
            changed = changed || this._loadingMeta.changed();
        }
        return changed;
    }

    markAsChanged() {
        if (this._observer) {
            this._observer.markAsChanged();
        }
        if (this._parentObserver) {
            this._parentObserver.markAsChanged();
        }
    }

    clearChanged() {
        super.clearChanged();
        this._loadingMeta.clearChanged();
        return this;
    }

    get itemType() {
        return this._builder.itemType;
    }

    get viewId() {
        return this._viewId;
    }

    get ready() {
        return this._ready;
    }

    get loading() {
        return this._loading;
    }

    get succeeded() {
        return this._succeeded;
    }

    get failed() {
        return this._failed;
    }

    get outdated() {
        return this._outdated;
    }

    get loadingMeta() {
        return this._loadingMeta;
    }

    get itemsIds() {
        return this._itemsIds;
    }

    get itemId() {
        return this._itemsIds && this._itemsIds.length == 1 ? this._itemsIds[0] : null;
    }

    get firstId() {
        return this._itemsIds && this._itemsIds.length ? this._itemsIds[0] : null;
    }

    get lastId() {
        return this._itemsIds && this._itemsIds.length ? this._itemsIds[this._itemsIds.length-1] : null;
    }

    setReady(ready) {
        this._ready = ready;
        this._markAsChanged();
        return this;
    }

    setSucceeded(succeeded) {
        this._succeeded = succeeded;
        this._markAsChanged();
        return this;
    }

    setFailed(failed) {
        this._failed = failed;
        this._markAsChanged();
        return this;
    }

    setOutdated(outdated) {
        this._outdated = outdated;
        this._markAsChanged();
        return this;
    }

    setLoading(loading) {
        this._loading = loading;
        this._markAsChanged();
        return this;
    }

    updateLoadingMeta(loadingMeta) {
        for (let metaPropKey in loadingMeta) {
            this._loadingMeta[metaPropKey] = loadingMeta[metaPropKey];
        }
        return this;
    }

    setItemsIds(itemsIds) {
        this._itemsIds = itemsIds;
        this._markAsChanged();
        return this;
    }

    handleLoadingStart() {
        this.setLoading(true)
            .setFailed(false)
            .updateLoadingMeta({
                totalCount: 0,
                errors: []
            });
    }

    handleLoadingReady(items, meta) {
        this.setItems(items)
            .setReady(true)
            .setOutdated(false)
            .setLoading(false)
            .setFailed(false)
            .updateLoadingMeta({
                eagerType: meta.eagerType,
                offset: meta.offset,
                count: meta.count,
                pageSize: meta.pageSize,
                totalCount: meta.totalCount,
                errors: []
            });
    }

    handleLoadingCanceled() {
        this.setLoading(false)
            .setFailed(false);
    }

    handleFailed(errors) {
        this.setLoading(false);
            .setFailed(true)
            .updateLoadingMeta({
                totalCount: 0,
                errors: errors.slice(0)
            });
    }
}

export default View;
