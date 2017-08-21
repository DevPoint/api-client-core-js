
class Builder {

    constructor(itemType, sortFactory, filterFactory) {
        this._itemType = itemType;
        this._sortFactory = sortFactory;
        this._filterFactory = filterFactory;
        this._eagerType = 'full';
        this._offset = 0;
        this._count = 0;
        this._pageSize = 0;
        this._filters = [];
        this._sorts = [];
    }

    get itemType() {
        return this._itemType;
    }

    get eagerType() { 
        return this._eagerType; 
    }

    get offset() { 
        return this._offset; 
    }

    get count() { 
        return this._count; 
    }

    get pageSize() { 
        return this._pageSize; 
    }

    get filters() { 
        return this._filters; 
    }
    
    get sorts() { 
        return this._sorts; 
    }

    addFilter(filter) {
        this._filters[] = filter;
        return this;
    }

    filterId(id) {
        return this.addFilter(
            this._filterFactory.createFilterId(id))
    }

    filterIds(ids) {
        return this.addFilter(
            this._filterFactory.createFilterIds(ids))
    }

    filterExp(key, operator, value) {
        return this.addFilter(
            this._filterFactory.createFilterExp(key, operator, value))
    }
    
    filterIn(key, values) {
        return this.addFilter(
            this._filterFactory.createFilterIn(key, values))
    }

    addSort(sort) {
        this._sorts[] = sort;
        return this;
    }

    sort(key, order) {
        return this.addSort(
            this._sortFactory.createSort(key, order));
    }

    setEagerType(eagerType) {
        this._eagerType = eagerType;
        return this;
    }

    setPagination(page, pageSize) {
        this._offset = (page * pageSize) - pageSize;
        this._count = pageSize;
        this._pageSize = pageSize;
        return this;
    }

    setLimit(offset, count) {
        this._offset = offset;
        this._count = count;
        this._pageSize = 0;
        return this;
    }

    buildEagerHash() {
        return this.eagerType ? 'eager=' + this.eagerType : '';
    }

    buildOffsetHash() {
        return this.offset ? 'offs=' + this.offset : '';
    }

    buildCountHash() {
        return this.count ? 'cnt=' + this.count : '';
    }

    buildPageSizeHash() {
        return this.pageSize ? 'psz=' + this.pageSize : '';
    }

    buildFiltersHash() {
        const filterHashes = this.filters.map(filter => filter.hash());
        return filterHashes.length ? 'filters=' + filterHashes.join(',') : '';
    }

    buildSortsHash() {
        const sortHashes = this.sorts.map(sort => sort.hash());
        return sortHashes.length ? 'sorts=' + sortHashes.join(',') : '';
    }

    buildHash() {
        const hashes = [
            this.buildEagerHash(),
            this.buildOffsetHash(),
            this.buildCountHash(),
            this.buildPageSizeHash(),
            this.buildFiltersHash(),
            this.buildSortsHash()
        ];
        return hashes.join('&');
    }
}

export default Builder;