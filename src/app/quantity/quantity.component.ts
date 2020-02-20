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
    this.service.viewCartItems(this.item);
    }

  removeFromCart(){
    this.service.decreaseViewCartItem(this.item);
  }
}
