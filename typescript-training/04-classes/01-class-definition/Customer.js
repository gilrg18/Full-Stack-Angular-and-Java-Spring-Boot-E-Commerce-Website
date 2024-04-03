"use strict";
class Customer {
    constructor(first, last) {
        this.firstName = first;
        this.lastName = last;
    }
}
let myCustomer = new Customer('Gil', 'Be');
// myCustomer.firstName = 'Gil';
// myCustomer.lastName = 'Be';
console.log(myCustomer.firstName + ' ' + myCustomer.lastName);
