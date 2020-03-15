import { Component, OnInit, Input } from '@angular/core';
import { AddtocartService } from '../addtocart.service';


@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {
  @Input() item:object;
  show:boolean;
  constructor(private service :AddtocartService) { 
    this.service.isConflict.subscribe(showStatus=>{
      this.show= showStatus;
    });
  }
  ngOnInit() { }

  addToCart(){
    if(this.item['addToCart'] == 'add to cart'){
      this.item['quantity']++;
    }else{
      this.service.addToCart(this.item, true);
    }
  }

  removeFromCart(){
    if(this.item['addToCart'] == 'add to cart' && this.item['quantity'] > 0){      
      this.item['quantity']--;
    }else{
      this.service.decreaseQuantity(this.item);
    }
  }
}
