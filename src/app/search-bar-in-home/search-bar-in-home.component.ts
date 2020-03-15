import { Component, OnInit,Input } from '@angular/core';
import { AddtocartService } from '../addtocart.service';
import { RouterModule,Router } from '@angular/router';


@Component({
  selector: 'app-search-bar-in-home',
  templateUrl: './search-bar-in-home.component.html',
  styleUrls: ['./search-bar-in-home.component.scss']
})


export class SearchBarInHomeComponent implements OnInit {
  @Input()item;
  itemSelectedID;

  constructor( private service: AddtocartService,
    private router: Router) { }
  listOfProducts;
  ngOnInit() {
    this.service.getData.subscribe(items => {
      this.listOfProducts = items;
    });
  }

  getId(e){
    let value = e.target.value
    for(let i = 0 ; i < this.listOfProducts.length;i++){
      if(value == `${this.listOfProducts[i].name} ${this.listOfProducts[i].conc}`){
        this.itemSelectedID = this.listOfProducts[i].id
      }
    }
    this.router.navigate(['/product'], { queryParams: {id: this.itemSelectedID}});
    e.target.value=""
  }


}
