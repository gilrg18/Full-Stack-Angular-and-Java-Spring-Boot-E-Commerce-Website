"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer_1 = require("./Customer");
var myCustomer2 = new Customer_1.Customer2('Gil', 'Be');
// myCustomer.firstName = 'Gil';
// myCustomer.lastName = 'Be';
//ts calls getters and setters methods behind the scenes
console.log(myCustomer2.firstName + ' ' + myCustomer2.lastName);
