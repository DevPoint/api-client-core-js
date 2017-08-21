
import Builder from './Builder';

class RelationBuilder extends Builder {

    constructor(type, itemType, sortFactory, filterFactory) {
        super(itemType, sortFactory, filterFactory);
        this._type = type;
    }

    get type() {
        return this._type;
    }
}

export default RelationBuilder;