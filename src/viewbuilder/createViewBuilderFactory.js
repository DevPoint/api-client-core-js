
function createViewBuilderFactory(filterFactory, sortFactory) {

    const _createBuilder = function(itemType, viewHandler) {

        let _view = null;

        let _eagerType = 'full';

        let _offset = 0;

        let _count = 0;

        let _pageSize = 0;

        const _filters = [];

        const _sorts = [];

        return {

            hasView: function() {
                return !!_view;
            },

            view: function() {
                if (!this.hasView()) {
                    _view = viewHandler.createView(itemType, this);
                }
                return _view;
            },

            get viewId() {
                return this.view().viewId;
            },

            get ready() {
                return this.view().ready;
            },

            get outdated() {
                return this.view().outdated;
            },

            get itemType() {
                return viewHandler.itemType;
            },

            get loading() {
                return this.view().loading;
            },

            get loadingFailed() {
                return this.view().loadingFailed;
            },

            get loadingMetaOffset() {
                return this.view().loadingMetaOffset;
            },

            get loadingMetaCount() {
                return this.view().loadingMetaCount;
            },

            get loadingMetaPage() {
                return this.view().loadingMetaPage;
            },

            get loadingMetaPageSize() {
                return this.view().loadingMetaPageSize;
            },

            get loadingMetaTotalCount() {
                return this.view().loadingMetaTotalCount;
            },

            get itemsHash() {
                return this.view().itemsHash;
            },

            get items() {
                return this.view().items;
            },

            get first() {
                return this.view().first;
            },

            get last() {
                return this.view().last;
            },

            setReady: function(ready) {
                this.view().setReady(ready);
                return this;
            },

            setOutdated: function(outdated) {
                this.view().setOutdated(outdated);
                return this;
            },

            setLoading: function(loading) {
                this.view().setLoading(loading);
                return this;
            },

            setLoadingFailed: function(loadingFailed) {
                this.view().setLoadingFailed(loadingFailed);
                return this;
            },

            updateLoadingMeta: function(loadingMeta) {
                this.view().updateLoadingMeta(loadingMeta);
                return this;
            },

            setItemsHash: function(itemsHash) {
                this.view().setItemsHash(itemsHash);
                return this;
            },

            setItems: function(items) {
                this.view().setItems(items);
                return this;
            },

            handleLoadingReady: function(items, itemsHash, meta) {
                this.view().handleLoadingReady(items, itemsHash, meta);
                return this;
            },

            handleLoadingCanceled: function() {
                this.view().handleLoadingReady();
                return this;
            },

            handleLoadingFailed: function(errors) {
                this.view().handleLoadingFailed(errors);
                return this;
            },

            load: function() {
                this.view().load();
                return this;
            },

            get eagerType() { 
                return _eagerType; 
            },

            get offset() { 
                return _offset; 
            },

            get count() { 
                return _count; 
            },

            get pageSize() { 
                return _pageSize; 
            },

            get filters() { 
                return _filters; 
            },
            
            get sorts() { 
                return _sorts; 
            },

            addFilter: function(filter) {
                if (!this.hasView()) {
                    _filters[] = filter;
                }
                return this;
            },

            filterId: function(id) {
                return this.addFilter(filterFactory.createFilterId(id))
            },

            filterIds: function(ids) {
                return this.addFilter(filterFactory.createFilterIds(ids))
            },

            filterExp: function(key, operator, value) {
                return this.addFilter(filterFactory.createFilterExp(key, operator, value))
            },
            
            filterIn: function(key, values) {
                return this.addFilter(filterFactory.createFilterIn(key, values))
            },

            addSort: function(sort) {
                if (!this.hasView()) {
                    _sorts[] = sort;
                }
                return this;
            },

            sort: function(key, order) {
                return this.addSort(sortFactory.createSort(key, order));
            },

            setEagerType: function(eagerType) {
                if (!this.hasView()) {
                    _eagerType = eagerType;
                }
                return this;
            },

            setPagination: function(page, pageSize) {
                if (!this.hasView()) {
                    _offset = (page * pageSize) - pageSize;
                    _count = pageSize;
                    _pageSize = pageSize;
                }
                return this;
            },

            setLimit: function(offset, count) {
                if (!this.hasView()) {
                    _offset = offset;
                    _count = count;
                    _pageSize = 0;
                }
                return this;
            },

            buildEagerHash: function() {
                return this.eagerType ? 'eager=' + this.eagerType : '';
            },

            buildOffsetHash: function() {
                return this.offset ? 'offs=' + this.offset : '';
            },

            buildCountHash: function() {
                return this.count ? 'cnt=' + this.count : '';
            },

            buildPageSizeHash: function() {
                return this.pageSize ? 'psz=' + this.pageSize : '';
            },

            buildFiltersHash: function() {
                const filterHashes = this.filters.map(filter => filter.hash());
                return filterHashes.length ? 'filters=' + filterHashes.join(',') : '';
            },

            buildSortsHash: function() {
                const sortHashes = this.sorts.map(sort => sort.hash());
                return sortHashes.length ? 'sorts=' + sortHashes.join(',') : '';
            },

            buildHash: function() {
                const hashes = [
                    this.buildEagerHash(),
                    this.buildOffsetHash(),
                    this.buildCountHash(),
                    this.buildPageSizeHash(),
                    this.buildFiltersHash(),
                    this.buildSortsHash()
                ];
                return hashes.join('&');
            };

            load: function() {
                view().load();
            },
        }
    }

    return {

        createBuilder: _createBuilder,

    };
}

export default createViewBuilderFactory; 
