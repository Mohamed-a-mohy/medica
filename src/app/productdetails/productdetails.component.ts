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
          this.itemObj = this.service.itemObj;
        }
      }
    });
  }

  ngOnInit() { }


  cutString(str, index) {
    let arr = str.split('');
    let arr2 = [];
    for (let i = index + 1; i < arr.length; i++) {
      arr2.push(arr[i]);
    }
    return arr2.join("");
  }
}