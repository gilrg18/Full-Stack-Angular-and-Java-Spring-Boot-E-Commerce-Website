import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  //by default Spring Data Rest only return the first 20 items, change page size to 100 with ?size=100
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {}

  getProductList(theCategoryId: number): Observable<Product[]> {
    //build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    console.log(searchUrl);
    //Returns an observable, Map the JSON data from Spring Data REST to Product array
    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}
//Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
