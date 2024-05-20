import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/common/address';
import { CartItem } from 'src/app/common/cart-item';
import { Country } from 'src/app/common/country';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { EcommerceShopFormService } from 'src/app/services/ecommerce-shop-form.service';
import { EcommerceValidators } from 'src/app/validators/ecommerce-validators';

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

  storage: Storage = sessionStorage;
  locStorage: Storage = localStorage;
  constructor(
    private formBuilder: FormBuilder,
    private ecommerceShopFormService: EcommerceShopFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reviewCartDetails();

    //read the user's email from browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);
    this.checkoutFormGroup = this.formBuilder.group({
      //customer is the name of the key of this formgroup
      customer: this.formBuilder.group({
        //key:[initial value]
        //FormControl(initialvalue, array of validators)
        //1-class name approach FormControl(...).
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          EcommerceValidators.notOnlyWhitespace,
        ]),
        // Either way works and there is no change in app performance.
        //2-short-cut syntax approach
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            EcommerceValidators.notOnlyWhitespace,
          ],
        ],
        email: new FormControl(theEmail, [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          EcommerceValidators.notOnlyWhitespace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          EcommerceValidators.notOnlyWhitespace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          EcommerceValidators.notOnlyWhitespace,
        ]),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          EcommerceValidators.notOnlyWhitespace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          EcommerceValidators.notOnlyWhitespace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          EcommerceValidators.notOnlyWhitespace,
        ]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          EcommerceValidators.notOnlyWhitespace,
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]), //only numbers,16 digits
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{3}'),
        ]),
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    //Populate credit card months
    //this handles the case when the expiring date is the current year, but we really want all 12 months
    const startMonth: number = new Date().getMonth() + 1; //months are 0 based so add +1
    //const startMonth: number = 1;
    this.ecommerceShopFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log(`Credit card months: ${JSON.stringify(data)}`);
        this.creditCardMonths = data;
      });
    //Populate credit card years
    this.ecommerceShopFormService.getCreditCardYears().subscribe((data) => {
      console.log(`Credit card years: ${JSON.stringify(data)}`);
      this.creditCardYears = data;
    });

    //Populate countries
    this.ecommerceShopFormService.getCountries().subscribe((data) => {
      console.log(`Retrieved countries: ${JSON.stringify(data)}`);
      this.countries = data;
    });
  }

  //getter Methods to access the form controls
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  //we use these methods in our html template to access our form control
  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }
  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get creditCardNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }
  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }

  copyShippingAddressToBillingAddress(event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    if (isChecked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  onSubmit() {

    if (this.checkoutFormGroup.invalid) {
      //touching all the fields triggers the display of the error messages
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    //set up order
    let order = new Order(this.totalQuantity,this.totalPrice);

    //get cart items
    const cartItems = this.cartService.cartItems;
    //create orderItems from cartItems
    //long way
    // let orderItems: OrderItem[] = [];
    // for(let i = 0; i < cartItems.length; i++){
    //   orderItems[i] = new OrderItem(cartItems[i]);
    // }
    //short way
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem))

    //SET UP PURCHASE:
    //populate purchase - customer
    const customer : Customer = this.checkoutFormGroup.controls['customer'].value;
    
    //populate purchase - shipping address
    const purchaseShippingAddress : Address = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchaseShippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchaseShippingAddress.country))
    purchaseShippingAddress.state = shippingState.name;
    purchaseShippingAddress.country = shippingCountry.name;
    
    //populate purchase - billing address
    const purchaseBillingAddress : Address = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchaseBillingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchaseBillingAddress.country))
    purchaseBillingAddress.state = billingState.name;
    purchaseBillingAddress.country = billingCountry.name;

    //populate purchase - order and orderItems
    let purchase = new Purchase(customer, purchaseShippingAddress, purchaseBillingAddress, order, orderItems);

    //call Rest API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
      //next is success path
      next: response => {
        alert(`Your order has been received. \nOrder tracking number: ${response.orderTrackingNumber}`)
        //reset the cart
        this.resetCart();
      },
      //error is error/exception path
      error: err=>{
        alert(`There was an error: ${err.message}`)
      }
    })

  }

  resetCart(){
    //reset cart data
    this.cartService.cartItems=[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    //reset form data
    this.checkoutFormGroup.reset();
    const resettedCart: CartItem[] = [];;
    this.locStorage.setItem('cartItems', JSON.stringify(resettedCart));
    //navigate back to the products page
    this.router.navigateByUrl("/products");
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup!.value.expirationYear
    );
    //if the current year equals the selected year, then start with the current month
    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.ecommerceShopFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log(`Retrieved card months: ${JSON.stringify(data)}`);
        this.creditCardMonths = data;
      });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.ecommerceShopFormService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
        console.log(`shippingAddressStates: ${JSON.stringify(data)}`);
      } else {
        this.billingAddressStates = data;
        console.log(`shippingAddressStates: ${JSON.stringify(data)}`);
      }
      //select first item by default
      formGroup?.get('state')?.setValue(data[0]);
    });
  }

  reviewCartDetails() {
    //subscribe to cartService.totalQuantity and cartService.totalPrice
    this.cartService.totalQuantity.subscribe((totalQuantity) => {
      this.totalQuantity = totalQuantity;
    });
    this.cartService.totalPrice.subscribe((totalPrice) => {
      this.totalPrice = totalPrice;
    });
  }
}
