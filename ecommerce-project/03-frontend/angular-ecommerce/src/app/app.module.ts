import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import {Routes, RouterModule} from '@angular/router';
const routes: Routes = [
  //Path to match , when path matches - create a new instance of component
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category/', component: ProductListComponent},
  {path: 'products/', component: ProductListComponent},
  //When the path is empty, match the FULL path not just the prefix(default pathMatch value)
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  //generic wildcard ** if it doesnt match any of the above routes
  {path: '**', redirectTo: '/products', pathMatch: 'full'},
]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }