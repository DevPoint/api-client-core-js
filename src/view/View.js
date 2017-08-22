
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
        this._released = false;
        this._loading = false;
        this._loadingFailed = false;
        this._loadingMeta = new ViewLoadingMeta('full', 0, 0);
        this._items = [];
    }

    get changed() {
        let changed = super.changed();
        if (!changed) {
            changed = this._loadingMeta.changed();
        }
        return changed;
    }

    clearAllChances() {
        super.clearAllChances();
        this._loadingMeta.clearAllChances();
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

    get released() {
        return this._released;
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

    get items() {
        return this._items;
    }

    get item() {
        return this._items && this._items.length == 1 ? this._items[0] : null;
    }

    get first() {
        return this._items && this._items.length ? this._items[0] : null;
    }

    get last() {
        return this._items && this._items.length ? this._items[this._items.length-1] : null;
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

    setItems(items) {
        this._items = items;
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
