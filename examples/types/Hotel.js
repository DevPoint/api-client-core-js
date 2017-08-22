
import { ObservableObject } from '../../src/observable';

class Hotel extends ObservableObject { 

    constructor() {
        this._name = '';
        this._street = '';
        this._city = '';
        this._postalCode = '';
        this._email = '';
        this._phone = '';
        this._website = '';
    }

    set name(value) {
        this._name = value;
        this._markAsChanged()
    }

    get name() {
        return this._name;
    }

    set street(value) {
        this._street = value;
        this._markAsChanged()
    }

    get street() {
        return this._street;
    }

    set postalCode(value) {
        this._postalCode = value;
        this._markAsChanged()
    }

    get postalCode() {
        return this._postalCode;
    }

    set email(value) {
        this._email = value;
        this._markAsChanged()
    }

    get email() {
        return this._email;
    }

    set phone(value) {
        this._phone = value;
        this._markAsChanged()
    }

    get phone() {
        return this._phone;
    }

    set website(value) {
        this._website = value;
        this._markAsChanged()
    }

    get website() {
        return this._website;
    }
}
