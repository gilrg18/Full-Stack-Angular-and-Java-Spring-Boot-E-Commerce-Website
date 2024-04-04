import { Component } from '@angular/core';

//@Component is a decorator
@Component({
  //selector, templateUrl, styleUrls are @Component's decorator properties
  selector: 'app-root', //html tag
  templateUrl: './app.component.html', //related html to this component
  styleUrls: ['./app.component.css'] //related css file to this component
})
export class AppComponent {
  title = 'This is my first angular app :)';
  firstName = 'Gil';
  lastName = 'Ber';
}
