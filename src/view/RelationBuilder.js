
import Builder from './Builder';

class RelationBuilder extends Builder {

    constructor(type, itemType, sortFactory, filterFactory, relationBuilderFactory) {
        super(itemType, sortFactory, filterFactory, relationBuilderFactory);
        this._type = type;
    }

    get type() {
        return this._type;
    }
}

export default RelationBuilder;