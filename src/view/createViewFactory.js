
function createViewFactory() {

    const _createView = function(viewId, itemType, builder, viewHandler, loadingHandler) {

        let _ready = false;

        let _outdated = false;

        let _loading = false;

        let _loadingFailed = false;

        let _loadingMeta = {
            eagerType: builder.getEagerType(),
            offset: builder.getOffset(),
            count: builder.getCount(),
            pageSize: builder.getPageSize(),
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

        const _handleMarkAsOutdated = function() {
            _setOutdated(true);
        };

        return {

            viewId: function() {
                viewHandler.markAsRead(viewId, 'viewId');
                return viewId;
            },

            itemType: function() {
                viewHandler.markAsRead(viewId, 'itemType');
                return itemType;
            },

            ready: function() {
                viewHandler.markAsRead(viewId, 'ready');
                return _ready;
            },

            markAsOutdated: function() {
                loadingHandler.markAsOutdated({
                    onMarkAsOutdated: _handleMarkAsOutdated
                });
            } 

            outdated: function() {
                viewHandler.markAsRead(viewId, 'outdated');
                return _outdated;
            },

            load: function() {
                _setLoading(true);
                _setLoadingFailed(false);
                _updateLoadingMeta({
                    totalCount: 0,
                    errors: []
                });
                loadingHandler.load({
                    eagerType: builder.getEagerType(),
                    offset: builder.getOffset(),
                    count: builder.getCount(),
                    pageSize: builder.getPageSize(),
                    filters: builder.getFilters(),
                    sorts: builder.getSorts(),
                    onLoaded: _handleLoadingReady,
                    onCanceled: _handleLoadingCanceled,
                    onFailed: _handleLoadingFailed
                });
            },

            loading: function() {
                viewHandler.markAsRead(viewId, 'loading');
                return _loading;
            },

            loadingFailed: function() {
                viewHandler.markAsRead(viewId, 'loadingFailed');
                return _loadingFailed;
            },

            loadingMetaOffset: function() {
                viewHandler.markAsRead(viewId, 'loadingMetaOffset');
                return _loadingMeta.offset;
            },

            loadingMetaCount: function() {
                viewHandler.markAsRead(viewId, 'loadingMetaCount');
                return _loadingMeta.count;
            },

            loadingMetaPageSize: function() {
                return _loadingMeta.pageSize;
            },

            loadingMetaPage: function() {
                viewHandler.markAsRead(viewId, 'loadingMetaPage');
                return this.loadingMetaPageSize() ? (this.loadingMetaCount() / this.loadingMetaPageSize()) + 1 : 0;
            },

            loadingMetaTotalCount: function() {
                viewHandler.markAsRead(viewId, 'loadingMetaTotalCount');
                return _loadingMeta.totalCount;
            },

            hash: function() {
                viewHandler.markAsRead(viewId, 'hash');
                return _hash;
            },

            items: function() {
                viewHandler.markAsRead(viewId, 'items');
                return _items;
            },

            item: function() {
                viewHandler.markAsRead(viewId, 'items');
                viewHandler.markAsRead(viewId, 'item');
                return _items && _items.length == 1 ? _items[0] : null;
            },

            first: function() {
                viewHandler.markAsRead(viewId, 'items');
                viewHandler.markAsRead(viewId, 'first');
                return _items && _items.length ? _items[0] : null;
            },

            last: function() {
                viewHandler.markAsRead(viewId, 'items');
                viewHandler.markAsRead(viewId, 'last');
                return _items && _items.length ? _items[_items.length-1] : null;
            }
        }
    }

    return {

        createView: _createView,

    };

}

export default createViewFactory; 
