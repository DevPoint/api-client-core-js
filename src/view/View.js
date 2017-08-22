
import { ObservableObject } from '../observable';
import ViewLoadingMeta from './ViewLoadingMeta';

class View extends ObservableObject {

    constructor(viewId, itemType) {
        super();
        this._viewId = viewId;
        this._itemType = itemType;
        this._builder = null;
        this._ready = false;
        this._outdated = false;
        this._loading = false;
        this._loadingFailed = false;
        this._loadingMeta = new ViewLoadingMeta('full', 0, 0);
        this._itemIds = [];
    }

    get changed() {
        let changed = super.changed();
        if (!changed) {
            changed = this._loadingMeta.changed();
        }
        return changed;
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

    get builder() {
        return this._builder;
    }

    get ready() {
        return this._ready;
    }

    get outdated() {
        return this._outdated;
    }

    get loading() {
        return this._loading;
    }

    get loadingFailed() {
        return this._loadingFailed;
    }

    get loadingMeta() {
        return this._loadingMeta;
    }

    get itemIds() {
        return this._itemIds;
    }

    get itemId() {
        return this._itemIds && this._itemIds.length == 1 ? this._itemIds[0] : null;
    }

    get firstId() {
        return this._itemIds && this._itemIds.length ? this._itemIds[0] : null;
    }

    get lastId() {
        return this._itemIds && this._itemIds.length ? this._itemIds[this._itemIds.length-1] : null;
    }

    setBuilder(builder) {
        this._builder = builder;
        this._markAsChanged();
        return this;
    }

    setReady(ready) {
        this._ready = ready;
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

    setLoadingFailed(loadingFailed) {
        this._loadingFailed = loadingFailed;
        this._markAsChanged();
        return this;
    }

    updateLoadingMeta(loadingMeta) {
        for (let metaPropKey in loadingMeta) {
            this._loadingMeta[metaPropKey] = loadingMeta[metaPropKey];
        }
        return this;
    }

    setItemIds(itemIds) {
        this._itemIds = itemIds;
        this._markAsChanged();
        return this;
    }

    handleLoadingStart() {
        this.setLoading(true)
            .setLoadingFailed(false)
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
            .setLoadingFailed(false)
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
            .setLoadingFailed(false);
    }

    handleLoadingFailed(errors) {
        this.setLoading(false);
            .setLoadingFailed(true)
            .updateLoadingMeta({
                totalCount: 0,
                errors: errors.slice(0)
            });
    }
}

export default View;
