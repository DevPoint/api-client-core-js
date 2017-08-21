
import { ObservableObject } from '../observer';

class View extends ObservableObject {

    constructor(viewId, builder, handler) {
        super();
        this._handler = handler;
        this._viewId = viewId;
        this._builder = builder;
        this._ready = false;
        this._outdated = false;
        this._released = false;
        this._loading = false;
        this._loadingFailed = false;
        this._loadingMeta = {
            eagerType: builder.eagerType,
            offset: builder.offset,
            count: builder.count,
            pageSize: builder.pageSize,
            totalCount: 0,
            errors: []
        };
        this._items = [];
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

    get loadingMetaOffset() {
        this._markAsRead('loadingMetaOffset');
        return this._loadingMeta.offset;
    }

    get loadingMetaCount() {
        this._markAsRead('loadingMetaCount');
        return this._loadingMeta.count;
    }

    get loadingMetaPageSize() {
        return this._loadingMeta.pageSize;
    }

    get loadingMetaPage() {
        this._markAsRead('loadingMetaPage');
        return this.loadingMetaPageSize ? (this.loadingMetaCount / this.loadingMetaPageSize + 1) : 0;
    }

    get loadingMetaTotalCount() {
        this._markAsRead('loadingMetaTotalCount');
        return this._loadingMeta.totalCount;
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
            this._markAsChanged(
                'loadingMeta' + 
                metaPropKey.charAt(0).toUpperCase() + 
                metaPropKey.slice(1));
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

    load() {
        this._handler.load(this);
        return this;
    }

    cancelLoading() {
        this._handler.cancelLoading();
        return this;
    }

    release() {
        if (!this.loading) {
            this.setReady(false)
                .setOutdated(false)
                .setLoading(false)
                .setLoadingFailed(false)
                .updateLoadingMeta({
                    eagerType: builder.eagerType,
                    offset: builder.offset,
                    count: builder.count,
                    pageSize: builder.pageSize,
                    totalCount: 0,
                    errors: []
                })
                .setItems([]);
            this._released = true;
            this._markAsChanged('released');
        }
        return this;
    }
}

export default View;
