
function createViewFactory() {

    const _createView: function(viewId, itemType, viewBuilder, viewHandler) {

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

            get viewId() {
                _markAsRead('viewId');
                return viewId;
            },

            get itemType() {
                _markAsRead('itemType');
                return itemType;
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
                return this.observer !== null;
            },

            get observer() {
                _markAsRead('observer');
                return _observer;
            },

            setReady: function(ready) {
                _ready = ready;
                _markAsChanged('ready');
            },

            setOutdated: function(outdated) {
                _outdated = outdated;
                _markAsChanged('outdated');
            },

            setLoading: function(loading) {
                _loading = loading;
                _markAsChanged('loading');
            },

            setLoadingFailed: function(loadingFailed) {
                _loadingFailed = loadingFailed;
                _markAsChanged('loadingFailed');
            },

            updateLoadingMeta: function(loadingMeta) {
                for (let propKey in loadingMeta) {
                    const viewPropKey = 'loadingMeta' + propKey.charAt(0).toUpperCase() + propKey.slice(1);
                    _loadingMeta[propKey] = loadingMeta[propKey];
                    _markAsChanged(viewPropKey);
                }
            },

            setItemsHash: function(itemsHash) {
                _itemsHash = itemsHash;
                _markAsChanged('itemsHash');
            },

            setItems: function(items) {
                _items = items;
                _markAsChanged('items');
            },

            handleLoadingReady: function(items, itemsHash, meta) {
                this.setItemsHash(itemsHash);
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
            },

            handleLoadingCanceled: function() {
                this.setLoading(false);
                this.setLoadingFailed(false);
            },

            handleLoadingFailed: function(errors) {
                this.setLoading(false);
                this.setLoadingFailed(true);
                this.updateLoadingMeta({
                    totalCount: 0,
                    errors: errors.slice(0)
                });
            },

            load: function() {
                this.setLoading(true);
                this.setLoadingFailed(false);
                this.updateLoadingMeta({
                    totalCount: 0,
                    errors: []
                });
                viewHandler.load(viewBuilder, this);
                return this;
            },

            addObserverListener: function(listener) {
                if (!this.observed) {
                    _observer = viewHandler.createObserver();
                }
                this.observer.addListener(listener);
                _markAsChanged('observer');
                return this;
            },

            removeObserverListener: function(listener) {
                if (this.observed) {
                    this.observer.removeListener(listener);
                    if (this.observer.listeners.length == 0) {
                        _observer = null;
                    }
                    _markAsChanged('observer');
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
