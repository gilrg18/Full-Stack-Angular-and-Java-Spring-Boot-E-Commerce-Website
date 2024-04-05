import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName: string = "";
  //Inject our product service to this component, Inject the ActivatedRoute
  //The current active route that loaded the component. Useful for accessing route parameters
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })
  }

  listProducts() {
    //check if "id" parameter is available
    //this.use the activated route.state of route at this given moment in time.map of alll the route parameters
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id'); //'category/:id'
    
    if(hasCategoryId){
      //get the 'id' param string and convert string to a number using the '+' symbol
      // ! is the non-null assertion operator. It tells the compiler that the object is not null.
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }else{
      //category id not available? set default id to 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books'
    }
    //Method is invoked once you 'subscribe'
    //Now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        //assign the data to the products array
        this.products = data;
        console.log("Products:", this.products);
      }
    )
  }


}
