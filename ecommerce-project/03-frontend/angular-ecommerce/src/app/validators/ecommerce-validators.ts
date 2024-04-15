import { FormControl, ValidationErrors } from "@angular/forms";

export class EcommerceValidators {

    //whitespace validation
    static notOnlyWhitespace(control: FormControl): ValidationErrors | null{
        //check if string only contains whitespace
        if((control.value != null) && (control.value.trim().length < 2)){
            //invalid, return error object
            return { 'notOnlyWhitespace': true}
        }
        else{
            //if the validation check Passes, return null
            return null;
        }
    }
}
