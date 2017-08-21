
import { ObservableObject } from '../../src/observable';

class Person extends ObservableObject { 

    constructor() {
        this._firstName = '';
        this._lastName = '';
    }

    set firstName(value) {
        this._firstName = value;
        this._markAsChanged('firstName');
    }

    get firstName() {
        this._markAsRead('firstName');
        return this._firstName;
    }

    set lastName(value) {
        this._lastName = value;
        this._markAsChanged('lastName');
    }

    get lastName() {
        this._markAsRead('lastName');
        return this._lastName;
    }

    get fullName() {
        this._markAsRead('fullName');
        return this.firstName + ' ' + this.lastName;
    }
}
