
function createViewFactory() {

    const _createView: function(viewId, itemType, viewBuilderProxy, viewHandler) {

        let _ready = false;

        let _outdated = false;

        let _loading = false;

        let _loadingFailed = false;

        let _loadingMeta = {
            eagerType: viewBuilderProxy.getEagerType(),
            offset: viewBuilderProxy.getOffset(),
            count: viewBuilderProxy.getCount(),
            pageSize: viewBuilderProxy.getPageSize(),
            totalCount: 0,
            errors: []
        };

        let _hash = '';

        let _items = [];

        return {

            get viewId() {
                viewHandler.markAsRead(viewId, 'viewId');
                return viewId;
            },

            get itemType() {
                viewHandler.markAsRead(viewId, 'itemType');
                return itemType;
            },

            get ready() {
                viewHandler.markAsRead(viewId, 'ready');
                return _ready;
            },

            get outdated() {
                viewHandler.markAsRead(viewId, 'outdated');
                return _outdated;
            },

            get loading() {
                viewHandler.markAsRead(viewId, 'loading');
                return _loading;
            },

            get loadingFailed() {
                viewHandler.markAsRead(viewId, 'loadingFailed');
                return _loadingFailed;
            },

            get loadingMetaOffset() {
                viewHandler.markAsRead(viewId, 'loadingMetaOffset');
                return _loadingMeta.offset;
            },

            get loadingMetaCount() {
                viewHandler.markAsRead(viewId, 'loadingMetaCount');
                return _loadingMeta.count;
            },

            get loadingMetaPageSize() {
                return _loadingMeta.pageSize;
            },

            get loadingMetaPage() {
                viewHandler.markAsRead(viewId, 'loadingMetaPage');
                return this.loadingMetaPageSize ? (this.loadingMetaCount / this.loadingMetaPageSize + 1 : 0;
            },

            get loadingMetaTotalCount() {
                viewHandler.markAsRead(viewId, 'loadingMetaTotalCount');
                return _loadingMeta.totalCount;
            },

            get hash() {
                viewHandler.markAsRead(viewId, 'hash');
                return _hash;
            },

            get items() {
                viewHandler.markAsRead(viewId, 'items');
                return _items;
            },

            get item() {
                viewHandler.markAsRead(viewId, 'item');
                viewHandler.markAsRead(viewId, 'items');
                return _items && _items.length == 1 ? _items[0] : null;
            },

            get first() {
                viewHandler.markAsRead(viewId, 'first');
                viewHandler.markAsRead(viewId, 'items');
                return _items && _items.length ? _items[0] : null;
            },

            get last() {
                viewHandler.markAsRead(viewId, 'last');
                viewHandler.markAsRead(viewId, 'items');
                return _items && _items.length ? _items[_items.length-1] : null;
            },

            setReady(ready) {
                _ready = ready;
                viewHandler.markAsChanged(viewId, 'ready');
            };

            setOutdated(outdated) {
                _outdated = outdated;
                viewHandler.markAsChanged(viewId, 'outdated');
            };

            setLoading(loading) {
                _loading = loading;
                viewHandler.markAsChanged(viewId, 'loading');
            };

            setLoadingFailed(loadingFailed) {
                _loadingFailed = loadingFailed;
                viewHandler.markAsChanged(viewId, 'loadingFailed');
            };

            updateLoadingMeta(loadingMeta) {
                for (let propKey in loadingMeta) {
                    const viewHandlerPropKey = 'loadingMeta' + propKey.charAt(0).toUpperCase() + propKey.slice(1);
                    _loadingMeta[propKey] = loadingMeta[propKey];
                    viewHandler.markAsChanged(viewId, viewHandlerPropKey);
                }
            };

            setItems(items) {
                _items = items;
                viewHandler.markAsChanged(viewId, 'items');
            };

            setHash(hash) {
                _hash = hash;
                viewHandler.markAsChanged(viewId, 'hash');
            };

            handleLoadingReady(items, meta) {
                this.setItems(items);
                this.setReady(true);
                this.setOutdated(false);
                this.setLoading(false);
                this.setLoadingFailed(false);
                this.updateLoadingMeta({
                    eagerType: meta.eagerType,
                    offset: meta.offset,
                    count: meta.count,
                    pageSize: meta.pageSize,
                    totalCount: meta.totalCount,
                    errors: []
                });
            };

            handleLoadingCanceled() {
                this.setLoading(false);
                this.setLoadingFailed(false);
            };

            handleLoadingFailed(errors) {
                this.setLoading(false);
                this.setLoadingFailed(true);
                this.updateLoadingMeta({
                    totalCount: 0,
                    errors: errors.slice(0)
                });
            };

            load() {
                this.setLoading(true);
                this.setLoadingFailed(false);
                this.updateLoadingMeta({
                    totalCount: 0,
                    errors: []
                });
                viewHandler.load(viewBuilderProxy, this);
                return this;
            },

            markAsOutdated() {
                this.setOutdated(true);
                return this;
            }
        }
    }

    return {

        createView: _createView,

    };

}

export default createViewFactory; 
