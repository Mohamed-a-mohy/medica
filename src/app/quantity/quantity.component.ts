import { Component, OnInit, Input } from '@angular/core';
import { AddtocartService } from '../addtocart.service';
import { log } from 'util';


@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {
  @Input() item;
  show;
  constructor(private service :AddtocartService) { 
    this.service.isConflict.subscribe(showStatus=>{
      this.show= showStatus;
    });
  }
  ngOnInit() { }

  addToCart(){
    this.service.viewCartItems(this.item);
  }

  removeFromCart(){
    console.log('from - in quantity')
    this.service.decreaseViewCartItem(this.item);
  }
}
