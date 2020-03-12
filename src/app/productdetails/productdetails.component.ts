import { Component, OnInit } from '@angular/core';

// route import
import { ActivatedRoute } from '@angular/router';

// serve import
import { AddtocartService } from '../addtocart.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})

export class ProductdetailsComponent implements OnInit {

  queryParamObj: object;
  productID:string;
  arrayOfProducts: Array<object> = [];
  itemObj:object;
  alter: Array<object> = [];
  currentQuantity: number;
  allAddedToCartBtns: Array<string>;
  currentLink: string;

  constructor(
    private service: AddtocartService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    
    // --------------------------------------------------------
    // track id changes in url 
    // --------------------------------------------------------
    this.route.queryParamMap.subscribe(params => {      
      this.queryParamObj = { ...params.keys, ...params };
      this.productID = this.queryParamObj['params']['id'];
      console.log(document.getElementById('btntocartProDetails'));
      console.log(document.getElementById('sec-alts-items'));
      
      // --------------------------------------------------------
      // get data from service
      // --------------------------------------------------------
      this.service.getData.subscribe(items => {
        // update data in the component
        if (items[0]) {
          this.itemObj = items.filter(item => this.productID == item['id'])[0];
          this.alter = items.filter(item => this.itemObj['active'] == item['active'] && this.itemObj['id'] != item['id']);
        }
      });
    });

    // --------------------------------------------------------
    // update quantity on change
    // --------------------------------------------------------
    this.service.cartItems.subscribe(items => {
      if (items[0]) {
        this.currentQuantity = items.filter(item => item['id'] == this.itemObj['id'])[0]['quantity'];
        this.currentQuantity ? this.itemObj['quantity'] = this.currentQuantity : this.itemObj['quantity'] = 0;
      }
    });
  }
}