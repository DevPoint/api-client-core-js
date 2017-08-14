
function createViewBuilderFactory(filterFactory, sortFactory, viewFactory) {

    const _createBuilder = function(itemType, viewHandler) {

        let _eagerType = 'full';

        let _offset = 0;

        let _count = 0;

        let _pageSize = 0;

        const _filters = [];

        const _sorts = [];

        let _locked = false;

        return {

            get itemType() {
                return itemType;
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
                if (!_locked) {
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
                if (!_locked) {
                    _sorts[] = sort;
                }
                return this;
            },

            sort: function(key, order) {
                return this.addSort(sortFactory.createSort(key, order));
            },

            setEagerType: function(eagerType) {
                if (!_locked) {
                    _eagerType = eagerType;
                }
                return this;
            },

            setPagination: function(page, pageSize) {
                if (!_locked) {
                    _offset = (page * pageSize) - pageSize;
                    _count = pageSize;
                    _pageSize = pageSize;
                }
                return this;
            },

            setLimit: function(offset, count) {
                if (!_locked) {
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
            },

            view: function() {
                const view = return viewHandler.createView(this);
                _locked = true;
                return view;
            }
        }
    }

    return {

        createBuilder: _createBuilder,

    };
}

export default createViewBuilderFactory; 
