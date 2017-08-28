
function ObservablePropType(name, default, base) {
    this.base = base;
    this.name = name;
    this.default = default;
    this._readOnly = false;
    this._setter = '';
    get typeOfName() {
        return this.base ? this.base.typeOfName : this.name;
    }
    get readOnly() {
    	return this._readOnly;
    }
    setReadOnly(value) {
    	this._readOnly = value;
    	return this;
    }
    get setter() {
    	return this._setter;
    }
    setSetter(value) {
    	this._setter = value;
    	return this;
    }
}

export default ObservablePropType;
