class Customer {
    //by default all properties are public
    firstName: string;
    lastName:string;

    constructor(first: string, last: string){
        this.firstName = first;
        this.lastName= last;
    }
}

let myCustomer = new Customer('Gil', 'Be');
// myCustomer.firstName = 'Gil';
// myCustomer.lastName = 'Be';

console.log(myCustomer.firstName+' '+myCustomer.lastName);