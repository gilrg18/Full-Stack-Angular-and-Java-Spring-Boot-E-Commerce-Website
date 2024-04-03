var Customer2 = /** @class */ (function () {
    function Customer2(first, last) {
        this._firstName = first;
        this._lastName = last;
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
var myCustomer2 = new Customer2('Gil', 'Be');
// myCustomer.firstName = 'Gil';
// myCustomer.lastName = 'Be';
//ts calls getters and setters methods behind the scenes
console.log(myCustomer2.firstName + ' ' + myCustomer2.lastName);
