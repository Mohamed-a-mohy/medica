import { Component, OnInit } from '@angular/core';
import { AddtocartService } from "../addtocart.service";


@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {
  quantity;
  items;
/*   item; */

  constructor(private service :AddtocartService) { }
  /* quantity; */
  ngOnInit() {
    

      this.service.cartItems.subscribe(items=>{
      this.items=items
    })
    
  }


/*   addToCart(){
    this.service.viewCartLength(this.item)
    this.service.viewCartItems(this.item)

  } */

  /* increment(){
    this.quantity++
  }

  decrement(){
  if(this.quantity > 0){
    this.quantity--;
    }
  } */

}
