import { Customer2 } from "./Customer";

let myCustomer2 = new Customer2('Gil', 'Be');
// myCustomer.firstName = 'Gil';
// myCustomer.lastName = 'Be';

//ts calls getters and setters methods behind the scenes
console.log(myCustomer2.firstName+' '+myCustomer2.lastName);