import { Component, OnInit, Input } from '@angular/core';
import { AddtocartService } from '../addtocart.service';


@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {
  @Input() item;

  constructor(private service :AddtocartService) {
  }
  ngOnInit() { }

  addToCart(){
    this.service.viewCartLength(this.item);
    this.service.viewCartItems(this.item);
  }

  removeFromCart(){
    this.service.removeFromCartLength(this.item);
    this.service.decreaseViewCartItem(this.item);
  }
}
