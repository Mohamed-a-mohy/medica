import { Component, OnInit, Input } from '@angular/core';
import { AddtocartService } from '../addtocart.service';
<<<<<<< HEAD
import { log } from 'util';
=======
>>>>>>> mohamed


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
<<<<<<< HEAD
    console.log('from - in quantity')
=======
>>>>>>> mohamed
    this.service.decreaseViewCartItem(this.item);
  }
}
