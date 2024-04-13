import { FormControl, ValidationErrors } from "@angular/forms";

export class EcommerceValidators {

    //whitespace validation
    static notOnlyWhitespace(control: FormControl): ValidationErrors | null{
        //check if string only contains whitespace
        if((control.value != null) && (control.value.trim().length === 0)){
            //invalid, return error object
            return { 'notOnlyWhiteSpace': true}
        }
        //if the validation check Passes, return null
        return null;
    }
}
