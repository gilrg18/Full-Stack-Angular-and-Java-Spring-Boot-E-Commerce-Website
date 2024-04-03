export class Customer2 {
    //by default all properties are public
    //parameter properties to avoid boilerplate code!
//    private _firstName: string;
//    private _lastName: string;

//     constructor(first: string, last: string){
//         this._firstName = first;
//         this._lastName= last;
//     }
    constructor(private _firstName: string, private _lastName: string){
        //typescript autoassigns the properties behind the scenes
    }

    get firstName() : string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value
    } 

    get lastName() : string {
        return this._lastName;
    }

    set lastName(value: string){
        this._lastName = value
    }
}

