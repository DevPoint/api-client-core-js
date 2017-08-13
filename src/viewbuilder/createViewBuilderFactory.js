
function createViewBuilderFactory(filterFactory, sortFactory) {

    const _createBuilder = function(itemType, viewHandler) {

        let _view = null;

        let _eagerType = 'full';

        let _offset = 0;

        let _count = 0;

        let _pageSize = 0;

        const _filters = [];

        const _sorts = [];

        const _getEagerType = function() { return _eagerType; };

        const _getOffset = function() { return _offset; };

        const _getCount = function() { return _count; };

        const _getPageSize = function() { return _pageSize; };

        const _getFilters = function() { return _filters; };
        
        const _getSorts = function() { return _sorts; };

        const _buildEagerHash = function() {
            return _getEagerType() ? 'eager=' + _getEagerType() : '';
        };

        const _buildOffsetHash = function() {
            return _getOffset() ? 'offs=' + _getOffset() : '';
        };

        const _buildCountHash = function() {
            return _getCount() ? 'cnt=' + _getCount() : '';
        };

        const _buildPageSizeHash = function() {
            return _getPageSize() ? 'psz=' + _getPageSize() : '';
        };

        const _buildFiltersHash = function() {
            const filterHashes = _getFilters().map(filter => filter.hash());
            return filterHashes.length ? 'filters=' + filterHashes.join(',') : '';
        };

        const _buildSortsHash = function() {
            const sortHashes = _getSorts().map(sort => sort.hash());
            return sortHashes.length ? 'sorts=' + sortHashes.join(',') : '';
        };

        const _buildHash = function() {
            const hashes = [
                _buildEagerHash(),
                _buildOffsetHash(),
                _buildCountHash(),
                _buildPageSizeHash(),
                _buildFiltersHash(),
                _buildSortsHash()
            ];
            return hashes.join('&');
        };

        return {

            hasView: function() {
                return !!_view;
            },

            view: function() {
                if (!this.hasView())
                {
                    _view = viewHandler.createView(itemType, {
                        getEagerType: _getEagerType,
                        getOffset: _getOffset,
                        getCount: _getCount,
                        getPageSize: _getPageSize,
                        getFilters: _getFilters,
                        getSorts: _getSorts,
                        hash: _buildHash,
                    });
                }
                return _view;
            },

            hash: function() {
                return _buildHash();
            };

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

            eagerType: function(eagerType) {
                if (!this.hasView()) {
                    _eagerType = eagerType;
                }
                return this;
            },

            paginate: function(page, pageSize) {
                if (!this.hasView()) {
                    _offset = (page * pageSize) - pageSize;
                    _count = pageSize;
                    _pageSize = pageSize;
                }
                return this;
            },

            limit: function(offset, count) {
                if (!this.hasView()) {
                    _offset = offset;
                    _count = count;
                    _pageSize = 0;
                }
                return this;
            },

            viewId: function() {
                return view().viewId();
            },

            ready: function() {
                return view().ready();
            },

            outdated: function() {
                return view().outdated();
            },

            itemType: function() {
                return viewHandler.itemType();
            },

            load: function() {
                view().load();
            },

            loading: function() {
                return _loading;
            },

            loadingFailed: function() {
                return _loadingFailed;
            },

            loadingMetaOffset: function() {
                return view().loadingMetaOffset();
            },

            loadingMetaCount: function() {
                return view().loadingMetaCount();
            },

            loadingMetaPage: function() {
                return view().loadingMetaPage();
            },

            loadingMetaPageSize: function() {
                return view().loadingMetaPageSize();
            },

            loadingMetaTotalCount: function() {
                return view().loadingMetaTotalCount();
            },

            hash: function() {
                return view().hash();
            },

            items: function() {
                return view().items();
            },

            first: function() {
                return view().first();
            },

            last: function() {
                return view().last();
            },

        }
    }

    return {

        createBuilder: _createBuilder,

    };
}

export default createViewBuilderFactory; 
