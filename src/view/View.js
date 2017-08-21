
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
        this._markAsRead('itemType');
        return this._builder.itemType;
    }

    get viewId() {
        this._markAsRead('viewId');
        return this._viewId;
    }

    get builder() {
        this._markAsRead('builder');
        return this._builder;
    }

    get ready() {
        this._markAsRead('ready');
        return this._ready;
    }

    get outdated() {
        this._markAsRead('outdated');
        return this._outdated;
    }

    get released() {
        this._markAsRead('released');
        return this._released;
    }

    get loading() {
        this._markAsRead('loading');
        return this._loading;
    }

    get loadingFailed() {
        this._markAsRead('loadingFailed');
        return this._loadingFailed;
    }

    get loadingMeta() {
        this._markAsRead('loadingMeta');
        return this._loadingMeta;
    }

    get items() {
        this._markAsRead('items');
        return this._items;
    }

    get item() {
        this._markAsRead('item');
        this._markAsRead('items');
        return this._items && this._items.length == 1 ? this._items[0] : null;
    }

    get first() {
        this._markAsRead('first');
        this._markAsRead('items');
        return this._items && this._items.length ? this._items[0] : null;
    }

    get last() {
        this._markAsRead('last');
        this._markAsRead('items');
        return this._items && this._items.length ? this._items[this._items.length-1] : null;
    }

    setBuilder(builder) {
        this._builder = builder;
        this._markAsChanged('builder');
        return this;
    }

    setReady(ready) {
        this._ready = ready;
        this._markAsChanged('ready');
        return this;
    }

    setOutdated(outdated) {
        this._outdated = outdated;
        this._markAsChanged('outdated');
        return this;
    }

    setLoading(loading) {
        this._loading = loading;
        this._markAsChanged('loading');
        return this;
    }

    setLoadingFailed(loadingFailed) {
        this._loadingFailed = loadingFailed;
        this._markAsChanged('loadingFailed');
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
        this._markAsChanged('items');
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
