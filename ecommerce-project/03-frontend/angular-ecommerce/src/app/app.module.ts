import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import {Routes, RouterModule, Router} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import {OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG, OktaAuthGuard} from '@okta/okta-angular'
import {OktaAuth} from '@okta/okta-auth-js'
import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector){
  //Use injector to access any service available within your application, 
  //in this case, the service for the router
  const router = injector.get(Router)

  //Redirect the user to your custom login page
  router.navigate(['/login']);
}

const routes: Routes = [
  //If authenticated, give access to the route, else send the user to the login page.
  {path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard],
                    data: {onAuthRequired: sendToLoginPage}
  },
  //Path to match , when path matches - create a new instance of component
  //Once the user is authenticated, they are redirected to your app, Normally you would need to parse
  //the response and store the OAth + OIDC tokens. The OktaCallbackComponent does this for you.
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id/:name', component: ProductListComponent},
  {path: 'category/', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  //When the path is empty, match the FULL path not just the prefix(default pathMatch value)
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  //generic wildcard ** if it doesnt match any of the above routes
  {path: '**', redirectTo: '/products', pathMatch: 'full'},
]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, {provide: OKTA_CONFIG, useValue: {oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
