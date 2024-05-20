import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderHistory } from '../common/order-history';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = 'http://localhost:8080/api/orders';

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory>{
    //build URL based on the customer email (findByCustomerEmailOrderByDateCreatedDesc comes from OrderRepository in springboot app)
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;

    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl); // call the rest api
  }
}

interface GetResponseOrderHistory{
  _embedded: { //Unwraps the JSON from Spring Data REST _embedded entry
    orders: OrderHistory[];
  }
}
