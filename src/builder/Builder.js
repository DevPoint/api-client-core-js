
class Builder {

    constructor(itemType, sortFactory, filterFactory, relationBuilderFactory) {
        this._itemType = itemType;
        this._sortFactory = sortFactory;
        this._filterFactory = filterFactory;
        this._relationBuilderFactory = relationBuilderFactory;
        this._eagerType = 'full';
        this._offset = 0;
        this._count = 0;
        this._pageSize = 0;
        this._filters = [];
        this._sorts = [];
        this._relations = {};
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

    get relations() { 
        return this._relations;
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

    setRelation(relationName, relation) {
        this._relations[relationName] = relation;
        return this;
    }

    relation(relationName, relationType, relationItemType) {
        return setRelation(
            relationName,
            this._relationBuilderFactory.createRelation(relationType, relationItemType));
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

    buildEagerTypeHash() {
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

    buildRelationsHash() {
        const relationHashes = [];
        for (let relationName in this.relations) {
            relationHashes.push(
                `${relation}(${this.relations[relationName].hash()})`);
        }
        return relationHashes.length ? 'relations=' + relationHashes.join(',') : '';
    }

    buildHash() {
        const hashes = [
            this.buildEagerTypeHash(),
            this.buildOffsetHash(),
            this.buildCountHash(),
            this.buildPageSizeHash(),
            this.buildFiltersHash(),
            this.buildSortsHash(),
            this.buildRelationsHash()
        ];
        return hashes.join('&');
    }
}

export default Builder;