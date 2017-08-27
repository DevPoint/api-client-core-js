
function CachePropType(name, default, base) {
    this.base = base;
    this.name = name;
    this.default = default;
    get typeOfName() {
        return this.base ? this.base.typeOfName : this.name;
    }
}

export default CachePropType;
