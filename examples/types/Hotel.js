
import { ObservableObject } from '../../src/observer';

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
        this._markAsChanged('name');
        return this;
    }

    get name() {
        this._markAsRead('name');
        return this._name;
    }

    set street(value) {
        this._street = value;
        this._markAsChanged('street');
        return this;
    }

    get street() {
        this._markAsRead('street');
        return this._street;
    }

    set postalCode(value) {
        this._postalCode = value;
        this._markAsChanged('postalCode');
        return this;
    }

    get postalCode() {
        this._markAsRead('postalCode');
        return this._postalCode;
    }

    set email(value) {
        this._email = value;
        this._markAsChanged('email');
        return this;
    }

    get email() {
        this._markAsRead('email');
        return this._email;
    }

    set phone(value) {
        this._phone = value;
        this._markAsChanged('phone');
        return this;
    }

    get phone() {
        this._markAsRead('phone');
        return this._phone;
    }

    set website(value) {
        this._website = value;
        this._markAsChanged('website');
        return this;
    }

    get website() {
        this._markAsRead('website');
        return this._website;
    }
}
