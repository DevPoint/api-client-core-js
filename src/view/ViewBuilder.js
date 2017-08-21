
import Builder from './Builder';

class ViewBuilder extends Builder {

    constructor(itemType, sortFactory, filterFactory, relationBuilderFactory) {
        super(itemType, sortFactory, filterFactory);
        this._relationBuilderFactory = relationBuilderFactory;
        this._relations = {};
    }

    addRelation(relationName, relationType, relationItemType) {
        this._relations[relationName] = 
            this._relationBuilderFactory->createRelation(relationType, relationItemType);
        return this;
    }

    buildRelationsHash() {
        const relationHashes = [];
        for (let relationName in this._relations) {
            relationHashes.push(
                `${relation}(${this._relations[relationName].hash()})`);
        }
        return relationHashes.length ? 'relations=' + relationHashes.join(',') : '';
    }

    buildHash() {
        const hashes = [
            this.buildEagerHash(),
            this.buildOffsetHash(),
            this.buildCountHash(),
            this.buildPageSizeHash(),
            this.buildFiltersHash(),
            this.buildSortsHash(),
            this.buildRelationsHash(),
        ];
        return hashes.join('&');
    }
}

export default ViewBuilder;