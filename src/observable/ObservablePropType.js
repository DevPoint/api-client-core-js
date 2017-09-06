
function ObservablePropType(name, defaultValue, base) {
    this.base = base;
    this.name = name;
    this.default = defaultValue;
    this._readOnly = false;
    this._setter = '';
    Object.defineProperty(this, "typeOfName", {
        get: function() {
            return this.base ? this.base.typeOfName : this.name;
        }
    });
    Object.defineProperty(this, "readOnly", {
        get: function() {
            return this._readOnly;
        }
    });
    Object.defineProperty(this, "setter", {
        get: function() {
            return this._setter;
        }
    });
}

ObservablePropType.prototype.setReadOnly = function(value) {
    this._readOnly = value;
    return this;
};

ObservablePropType.prototype.setSetter = function(value) {
    this._setter = value;
    return this;
};

export default ObservablePropType;
