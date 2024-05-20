import { Component, OnInit, Inject } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string = '';

  storage: Storage = sessionStorage;

  constructor(
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {}

  ngOnInit(): void {
    //Subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated!;
      this.getUserDetails();
    });
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      //Fetch the logged in user details (user's claims)
      //
      //user full name is exposed as a property name
      this.oktaAuth.getUser().then((res) => {
        this.userFullName = res.name as string;

        //retrieve the user's email from authentication response
        const theEmail = res.email;
        //store the email in the browser's storage
        this.storage.setItem('userEmail', JSON.stringify(theEmail));
      });
    }
  }

  /*
  Okta is not providing signup option for developer accounts. 

  If we need the signup option, we should use a business account.
  */
  logout() {
    //Terminate the session with Okta and removes the current tokens.
    this.oktaAuth.signOut();
  }
}
