import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  //Inject the router into this component
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(value: string, event: Event){
    event.preventDefault();
    console.log(`value= ${value}`);
    //{path: 'search/:keyword', component: ProductListComponent}
    this.router.navigateByUrl(`/search/${value}`);
  }

}
