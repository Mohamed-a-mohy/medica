import { Component, OnInit, Input } from '@angular/core';
import { AddtocartService } from "../addtocart.service";

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
  }

  addToCart() {
    if (this.item['addToCart'] == 'add to cart') {
      let increaseQuantity: boolean;
      this.item['quantity'] > 0 ? increaseQuantity = false : increaseQuantity = true;
      this.service.addToCart(this.item, increaseQuantity);
    }
  }

}
