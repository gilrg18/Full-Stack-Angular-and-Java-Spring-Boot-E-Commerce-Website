import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { EcommerceShopFormService } from 'src/app/services/ecommerce-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder, 
              private ecommerceShopFormService: EcommerceShopFormService) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      //customer is the name of the key of this formgroup
      customer: this.formBuilder.group({
        //key:[initial value]
        //FormControl(initialvalue, array of validators)
        //1-class name approach FormControl(...).
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        // Either way works and there is no change in app performance.
        //2-short-cut syntax approach
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    //Populate credit card months
    //this handles the case when the expiring date is the current year, but we really want all 12 months
    const startMonth: number = new Date().getMonth() + 1;//months are 0 based so add +1
    //const startMonth: number = 1;
    this.ecommerceShopFormService.getCreditCardMonths(startMonth).subscribe(data=>{
      console.log(`Credit card months: ${JSON.stringify(data)}`);
      this.creditCardMonths = data;
    })
    //Populate credit card years
    this.ecommerceShopFormService.getCreditCardYears().subscribe(data=>{
      console.log(`Credit card years: ${JSON.stringify(data)}`);
      this.creditCardYears = data;
    })
    
    //Populate countries
    this.ecommerceShopFormService.getCountries().subscribe(
      data=>{
        console.log(`Retrieved countries: ${JSON.stringify(data)}`);
        this.countries = data;
      }
    )
  }
  
  copyShippingAddressToBillingAddress(event:Event){
    const isChecked = (<HTMLInputElement>event.target).checked;
    if(isChecked){
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates = this.shippingAddressStates;
    }else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  
  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log('Email: ', this.checkoutFormGroup.get('customer')!.value.email);
    console.log('Shipping Address Country:', this.checkoutFormGroup.get('shippingAddress')!.value.country.name);
    console.log('Shipping Address State:', this.checkoutFormGroup.get('shippingAddress')!.value.state.name);

  }
  
  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup!.value.expirationYear)
    //if the current year equals the selected year, then start with the current month
    let startMonth: number;
    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1;
    }
    this.ecommerceShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log(`Retrieved card months: ${JSON.stringify(data)}`);
        this.creditCardMonths = data;
      }
    )
  }

  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.ecommerceShopFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName==='shippingAddress'){
          this.shippingAddressStates = data;
          console.log(`shippingAddressStates: ${JSON.stringify(data)}`);
        }
        else{
          this.billingAddressStates = data;
          console.log(`shippingAddressStates: ${JSON.stringify(data)}`);
        }
        //select first item by default
        formGroup?.get('state')?.setValue(data[0]);
      }
    )
  }

}
