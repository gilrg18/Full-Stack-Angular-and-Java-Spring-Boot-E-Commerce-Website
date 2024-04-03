"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer2 = void 0;
var Customer2 = /** @class */ (function () {
    //by default all properties are public
    //parameter properties to avoid boilerplate code!
    //    private _firstName: string;
    //    private _lastName: string;
    //     constructor(first: string, last: string){
    //         this._firstName = first;
    //         this._lastName= last;
    //     }
    function Customer2(_firstName, _lastName) {
        this._firstName = _firstName;
        this._lastName = _lastName;
        //typescript autoassigns the properties behind the scenes
    }
    Object.defineProperty(Customer2.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            this._firstName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer2.prototype, "lastName", {
        get: function () {
            return this._lastName;
        },
        set: function (value) {
            this._lastName = value;
        },
        enumerable: false,
        configurable: true
    });
    return Customer2;
}());
exports.Customer2 = Customer2;
