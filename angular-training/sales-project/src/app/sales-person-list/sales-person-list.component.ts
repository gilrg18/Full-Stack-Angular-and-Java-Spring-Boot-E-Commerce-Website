import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {
  salesPersonList: SalesPerson[] = [
    new SalesPerson("Gil","Ber","gil.ber@to.com",1818),
    new SalesPerson("Otre","Blig","otre.blig@ot.com",444),
    new SalesPerson("Mi","Guel","mi.guel@an.com",6666),
    new SalesPerson("cle","men","cle.men@ton.com",42069),
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
