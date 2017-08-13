
function createViewFactory() {

    const _createView = function(viewId, itemType, builderProxy, viewHandler) {

        let _ready = false;

        let _outdated = false;

        let _loading = false;

        let _loadingFailed = false;

        let _loadingMeta = {
            eagerType: builderProxy.getEagerType(),
            offset: builderProxy.getOffset(),
            count: builderProxy.getCount(),
            pageSize: builderProxy.getPageSize(),
            totalCount: 0,
            errors: []
        };

        let _hash = '';

        let _items = [];

        const _setReady = function(ready) {
            _ready = ready;
            viewHandler.markAsChanged(viewId, 'ready');
        };

        const _setOutdated = function(outdated) {
            _outdated = outdated;
            viewHandler.markAsChanged(viewId, 'outdated');
        };

        const _setLoading = function(loading) {
            _loading = loading;
            viewHandler.markAsChanged(viewId, 'loading');
        };

        const _setLoadingFailed = function(loadingFailed) {
            _loadingFailed = loadingFailed;
            viewHandler.markAsChanged(viewId, 'loadingFailed');
        };

        const _updateLoadingMeta = function(loadingMeta) {
            for (let propKey in loadingMeta) {
                const viewHandlerPropKey = 'loadingMeta' + propKey.charAt(0).toUpperCase() + propKey.slice(1);
                _loadingMeta[propKey] = loadingMeta[propKey];
                viewHandler.markAsChanged(viewId, viewHandlerPropKey);
            }
        };

        const _setItems = function(items) {
            _items = items;
            viewHandler.markAsChanged(viewId, 'items');
        };

        const _setHash = function(hash) {
            _hash = hash;
            viewHandler.markAsChanged(viewId, 'hash');
        };

        const _handleLoadingReady = function(items, meta) {
            _setItems(items);
            _setReady(true);
            _setOutdated(false);
            _setLoading(false);
            _setLoadingFailed(false);
            _updateLoadingMeta({
                eagerType: meta.eagerType,
                offset: meta.offset,
                count: meta.count,
                pageSize: meta.pageSize,
                totalCount: meta.totalCount,
                errors: []
            });
        };

        const _handleLoadingCanceled = function() {
            _setLoading(false);
            _setLoadingFailed(false);
        };

        const _handleLoadingFailed = function(errors) {
            _setLoading(false);
            _setLoadingFailed(true);
            _updateLoadingMeta({
                totalCount: 0,
                errors: errors.slice(0)
            });
        };

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

            load() {
                _setLoading(true);
                _setLoadingFailed(false);
                _updateLoadingMeta({
                    totalCount: 0,
                    errors: []
                });
                viewHandler.load({
                    eagerType: builderProxy.getEagerType(),
                    offset: builderProxy.getOffset(),
                    count: builderProxy.getCount(),
                    pageSize: builderProxy.getPageSize(),
                    filters: builderProxy.getFilters(),
                    sorts: builderProxy.getSorts(),
                    onLoaded: _handleLoadingReady,
                    onCanceled: _handleLoadingCanceled,
                    onFailed: _handleLoadingFailed
                });
                return this;
            },

            markAsOutdated() {
                _setOutdated(true);
                return this;
            }
        }
    }

    return {

        createView: _createView,

    };

}

export default createViewFactory; 
