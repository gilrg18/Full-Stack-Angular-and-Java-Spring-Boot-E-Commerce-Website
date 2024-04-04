import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {}

  getProductList(): Observable<Product[]> {
    //Returns an observable, Map the JSON data from Spring Data REST to Product array
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

//Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
