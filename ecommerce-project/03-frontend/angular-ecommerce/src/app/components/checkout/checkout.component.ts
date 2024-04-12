import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
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
  constructor(private formBuilder: FormBuilder, 
              private ecommerceShopFormService: EcommerceShopFormService) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      //customer is the name of the key of this formgroup
      customer: this.formBuilder.group({
        //key:[initial value]
        firstName: [''],
        lastName: [''],
        email: [''],
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
    }else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  
  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log('Email: ', this.checkoutFormGroup.get('customer')!.value.email);
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

}
