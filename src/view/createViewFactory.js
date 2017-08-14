
function createViewFactory() {

    const _createView: function(viewBuilder, viewHandler) {

        const _itemType = viewBuilder.itemType;

        let _ready = false;

        let _outdated = false;

        let _loading = false;

        let _loadingFailed = false;

        let _loadingMeta = {
            eagerType: viewBuilder.eagerType,
            offset: viewBuilder.offset,
            count: viewBuilder.count,
            pageSize: viewBuilder.pageSize,
            totalCount: 0,
            errors: []
        };

        let _items = [];

        let _itemsHash = '';

        let _observer = null;

        const _markAsRead = function(propKey) {
            if (_observer !== null) {
                _observer.markAsRead(propKey);
            }
        };

        const _markAsChanged = function(propKey) {
            if (_observer !== null) {
                _observer.markAsChanged(propKey);
            }
        };

        return {

            get itemType() {
                _markAsRead('itemType');
                return _itemType;
            },

            get viewId() {
                _markAsRead('viewId');
                return viewId;
            },

            get ready() {
                _markAsRead('ready');
                return _ready;
            },

            get outdated() {
                _markAsRead('outdated');
                return _outdated;
            },

            get loading() {
                _markAsRead('loading');
                return _loading;
            },

            get loadingFailed() {
                _markAsRead('loadingFailed');
                return _loadingFailed;
            },

            get loadingMetaOffset() {
                _markAsRead('loadingMetaOffset');
                return _loadingMeta.offset;
            },

            get loadingMetaCount() {
                _markAsRead('loadingMetaCount');
                return _loadingMeta.count;
            },

            get loadingMetaPageSize() {
                return _loadingMeta.pageSize;
            },

            get loadingMetaPage() {
                _markAsRead('loadingMetaPage');
                return this.loadingMetaPageSize ? (this.loadingMetaCount / this.loadingMetaPageSize + 1) : 0;
            },

            get loadingMetaTotalCount() {
                _markAsRead('loadingMetaTotalCount');
                return _loadingMeta.totalCount;
            },

            get itemsHash() {
                _markAsRead('itemsHash');
                return _itemsHash;
            },

            get items() {
                _markAsRead('items');
                return _items;
            },

            get item() {
                _markAsRead('item');
                _markAsRead('items');
                return _items && _items.length == 1 ? _items[0] : null;
            },

            get first() {
                _markAsRead('first');
                _markAsRead('items');
                return _items && _items.length ? _items[0] : null;
            },

            get last() {
                _markAsRead('last');
                _markAsRead('items');
                return _items && _items.length ? _items[_items.length-1] : null;
            },

            get observed() {
                _markAsRead('observed');
                return (this.observer !== null);
            },

            get listeners() {
                _markAsRead('listeners');
                return (this.observed) ? _observer.listeners : [];
            },

            get changed() {
                _markAsRead('changed');
                return (this.observed) ? _observer.changed : false;
            },

            setReady: function(ready) {
                _ready = ready;
                _markAsChanged('ready');
                return this;
            },

            setOutdated: function(outdated) {
                _outdated = outdated;
                _markAsChanged('outdated');
                return this;
            },

            setLoading: function(loading) {
                _loading = loading;
                _markAsChanged('loading');
                return this;
            },

            setLoadingFailed: function(loadingFailed) {
                _loadingFailed = loadingFailed;
                _markAsChanged('loadingFailed');
                return this;
            },

            updateLoadingMeta: function(loadingMeta) {
                for (let metaPropKey in loadingMeta) {
                    _loadingMeta[metaPropKey] = loadingMeta[metaPropKey];
                    _markAsChanged(
                        'loadingMeta' + 
                        metaPropKey.charAt(0).toUpperCase() + 
                        metaPropKey.slice(1));
                }
                return this;
            },

            setItemsHash: function(itemsHash) {
                _itemsHash = itemsHash;
                _markAsChanged('itemsHash');
                return this;
            },

            setItems: function(items) {
                _items = items;
                _markAsChanged('items');
                return this;
            },

            handleLoadingReady: function(items, itemsHash, meta) {
                this.setItemsHash(itemsHash)
                    .setItems(items)
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
            },

            handleLoadingCanceled: function() {
                this.setLoading(false)
                    .setLoadingFailed(false);
            },

            handleLoadingFailed: function(errors) {
                this.setLoading(false);
                    .setLoadingFailed(true)
                    .updateLoadingMeta({
                        totalCount: 0,
                        errors: errors.slice(0)
                    });
            },

            load: function() {
                this.setLoading(true)
                    .setLoadingFailed(false)
                    .updateLoadingMeta({
                        totalCount: 0,
                        errors: []
                    });
                viewHandler.load(viewBuilder, this);
                return this;
            },

            addListener: function(listener) {
                if (!this.observed) {
                    _observer = viewHandler.createObserver();
                    _markAsChanged('observed');
                }
                _observer.addListener(listener);
                _markAsChanged('listeners');
                return this;
            },

            removeListener: function(listener) {
                if (this.observed) {
                    _observer.removeListener(listener);
                    _markAsChanged('listeners');
                    if (_observer.listeners.length == 0) {
                        _observer = null;
                        _markAsChanged('observed');
                    }
                }
                return this;
            },

            clearAllChances: function() {
                if (this.observed) {
                    _observer.clearAllChances();
                    _markAsChanged('changed');
                }
                return this;
            }
        }
    }

    return {

        createView: _createView,

    };

}

export default createViewFactory; 
