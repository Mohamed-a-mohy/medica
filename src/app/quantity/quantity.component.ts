import { Component, OnInit, Input } from '@angular/core';
import { QuantityService } from '../quantity.service';
import { AddtocartService } from '../addtocart.service';


@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {
  itemsInCart;
  @Input() itemId;
  quantity;
  flag;
  // index: number;
  constructor(private quantityService: QuantityService, private service :AddtocartService) {
  }
  ngOnInit() {
    // this.quantityService.quantityCounter.subscribe(count=>{
    //   this.quantity = count;
    // })
    console.log(this.itemId);
    this.service.cartItems.subscribe(items=>{
      this.itemsInCart=items;
      this.setQuantity();
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

  setQuantity(){
    if(this.itemsInCart[0]){
      for(let i = 0; i<this.itemsInCart.length; i++){
        console.log('hi')
        if(this.itemId == this.itemsInCart[i].id){
          this.flag = true;
          this.quantity = this.itemsInCart[i].quantity;
        }
        if(this.flag != true){
        //   this.flag = false;
        //   this.index = null;
        //   console.log(this.itemsInCart[this.index])
        //   this.quantity = this.itemsInCart[this.index].quantity;
        // }else{
          this.quantity = 0;
        }
      }
    }else{
      this.quantity = 0;
    }
  }

}
