
import { ObservableObject } from '../../src/observable';

class Person extends ObservableObject { 

    constructor() {
        this._firstName = '';
        this._lastName = '';
    }

    set firstName(value) {
        this._firstName = value;
        this._markAsChanged()
    }

    get firstName() {
        return this._firstName;
    }

    set lastName(value) {
        this._lastName = value;
        this._markAsChanged()
    }

    get lastName() {
        return this._lastName;
    }

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
