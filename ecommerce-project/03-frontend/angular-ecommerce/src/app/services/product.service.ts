import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //by default Spring Data Rest only return the first 20 items, change page size to 100 with ?size=100
  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category'

  constructor(private httpClient: HttpClient) {}

  getProductList(theCategoryId: number): Observable<Product[]> {
    //build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    //console.log(searchUrl);
    //Returns an observable, Map the JSON data from Spring Data REST to Product array
    return this.getProducts(searchUrl);
  }


  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }


  searchProducts(theKeyword: string): Observable<Product[]> {
    const trimmedKeyword = theKeyword.trim();
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${trimmedKeyword}`;
    return this.getProducts(searchUrl);
  }


  //Refactoring code into getProducts()
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

//Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
