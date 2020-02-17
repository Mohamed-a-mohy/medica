import { Component, OnInit, Input } from '@angular/core';

// route import
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// serve import
import { AddtocartService } from '../addtocart.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})

export class ProductdetailsComponent implements OnInit {

  // catch id from url
  indexOflastSlash;
  routeLink;
  productID;
  quantity;

  // itemObj which hold item info
  itemObj;
  itemsInCart;

  flag = false;

  constructor(
    private route: ActivatedRoute,
    private service: AddtocartService,
    private router: Router,
    location: Location) {

    // track id changes/ url changes and send id to the service
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.routeLink = location.path();
      } else {
        this.routeLink = 'Home'
      }
      if (this.routeLink.includes("product/")) {
        this.indexOflastSlash = this.routeLink.lastIndexOf("/");
        if (this.routeLink[this.indexOflastSlash + 1]) {
          this.productID = this.cutString(this.routeLink, this.indexOflastSlash);
          console.log('ya rb', this.productID);
          this.service.trackIdChanges(this.productID);
        }
      }
  });

    
  }

  ngOnInit() {  

    this.service.getData.subscribe(items=>{
      for(let i = 0 ; i < items.length; i++){
        if(this.productID == items[i].id){
          this.itemObj = items[i]
          console.log(this.productID,"items array" , items)
        }
      }
    });

    this.service.cartItems.subscribe(items=>{
      this.itemsInCart=items;
      if(this.itemsInCart[0]){
        console.log(this.itemObj.id)
        console.log(this.itemsInCart)
        for(let i = 0; i< this.itemsInCart.length; i++){
          if(this.itemsInCart[i].id == this.itemObj.id){
            this.flag = true;
            this.itemObj.quantity = this.itemsInCart[i].quantity;
          }
        }
        if(this.flag == false){
          this.itemObj.quantity = 0;
        }
      }
    })
   }


  cutString(str, index) {
    let arr = str.split('');
    let arr2 = [];
    for (let i = index + 1; i < arr.length; i++) {
      arr2.push(arr[i]);
    }
    return arr2.join("");
  }
}