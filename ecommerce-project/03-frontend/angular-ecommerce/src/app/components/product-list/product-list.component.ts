import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;

  //New properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string= "";

  //Inject our product service to this component, Inject the ActivatedRoute
  //The current active route that loaded the component. Useful for accessing route parameters
  constructor(private productService: ProductService, private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })
  }

  listProducts() {
    //check if this route has a parameter for keyword, if it does, it means we are performing a search
    //{path: 'search/:keyword', ...}
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //if we have a different keyword than previous
    //then set thePageNumber to 1
    if(this.previousKeyword!= theKeyword){
      this.thePageNumber=1;
    }
    this.previousKeyword=theKeyword;
    console.log(`keyword: ${theKeyword}, thePageNumber: ${this.thePageNumber}`);
    //now searh for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber - 1,
      this.thePageSize, theKeyword).subscribe(this.processResult());
  }

  handleListProducts(){
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

    //Check if we have a different category than previous
    //Angular will reuse a component if it is currently being viewed

    //if we have a different category id than previous
    //then set thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId= ${this.currentCategoryId}, thePageNumber= ${this.thePageNumber}`);

    //Method is invoked once you 'subscribe'
    //Now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber-1,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(
                                                //refactoring this data
                                               this.processResult()
                                               );
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;  
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult(){
    //take the json response and map it to fields in this class
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize =data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  //Update productlistcomponent with the click handler
  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}
