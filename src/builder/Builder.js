
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
        this._filters.push(filter);
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
        this._sorts.push(sort);
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
}

export default Builder;