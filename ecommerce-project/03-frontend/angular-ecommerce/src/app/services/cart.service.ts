import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  //Subject is a subclass of observable and we can use it to publish events in our code
  //and the event will be sent to all subscribers
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>()

  constructor() { 
    this.cartItems = JSON.parse(sessionStorage.getItem('cartItems')!) != null ? JSON.parse(sessionStorage.getItem('cartItems')!):[];
  }

  persistCartItems(){
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  addToCart(theCartItem: CartItem){
    //check if we already have the item in our cart
    let existingCartItem: CartItem | undefined; //= new CartItem(new Product(-1,'1','Not Found!','1',1,'',true,1,new Date(),new Date()));

    if(this.cartItems.length>0){
      //find the item in the cart based on the item id
      // for(let tempCartItem of this.cartItems){
      //   if(tempCartItem.id === theCartItem.id){
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }
      //Refactoring the for loop using Array.find() method
      //Returns the first element in an array that passes a given test
      //Returns undefined if doesnt find any element that passes the test
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
      //check if we found it
    }

    if(existingCartItem != undefined){
      //increment the quantity of that item
      existingCartItem.quantity++;
    }else{
      this.cartItems.push(theCartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals(){
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    //publish the new values with next() ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugging
    this.logCartData(totalPriceValue, totalQuantityValue)
    this.persistCartItems();
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number){
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, 
      unitPrice: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`)
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('---------------');
  }

  decrementQuantity(cartItem: CartItem){
    cartItem.quantity--;
    if(cartItem.quantity === 0){
      this.remove(cartItem);
    }else{
      this.computeCartTotals();
    }
  }

  remove(cartItem: CartItem){
    //get index of item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);
    //if found, remove the item from the array at the given index
    if(itemIndex> -1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

}

