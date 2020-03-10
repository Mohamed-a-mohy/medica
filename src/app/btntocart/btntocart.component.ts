import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AddtocartService } from "../addtocart.service"
@Component({
  selector: 'app-btntocart',
  templateUrl: './btntocart.component.html',
  styleUrls: ['./btntocart.component.scss']
})
export class BtntocartComponent implements OnInit {
  @Input() item: object;
  id: string;
  show: boolean;
  element: HTMLElement;

  constructor(private service: AddtocartService) {
    this.service.isConflict.subscribe(showStatus => {
      this.show = showStatus;
    });
  }

  ngOnInit() {
    this.id = 'addbtn_' + this.item['id'];
    console.log(this.id);
  }

  ngAfterViewInit() {
    this.element = document.getElementById(this.id);
    if(this.id == `addbtn_${this.item['id']}`){
      if (this.element.innerText == 'add to cart') {
        this.element.style.backgroundColor = '#ffc401';
      } else {
        this.element.style.backgroundColor = '#01807b';
      }
    }

    this.service.bgColorObs.subscribe(obj => {
      if (`addbtn_${obj['id']}` == this.id) {
        if (obj['addToCart'] == 'add to cart') {
          this.element.style.backgroundColor = '#ffc401';
        } else {
          this.element.style.backgroundColor = '#01807b';
        }
      }
    })
  }

  addToCart() {
    if (this.item['addToCart'] == 'add to cart') {
      let increaseQuantity: boolean;
      this.item['quantity'] > 0 ? increaseQuantity = false : increaseQuantity = true;
      this.service.addToCart(this.item, increaseQuantity);
    }
  }

}
