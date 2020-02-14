import { Component, OnInit ,Input} from '@angular/core';
import { AddtocartService } from "../addtocart.service";
import { QuantityService } from '../quantity.service';


@Component({
  selector: 'app-cartview',
  templateUrl: './cartview.component.html',
  styleUrls: ['./cartview.component.scss']
})
export class CartviewComponent implements OnInit {
  @Input() item ;
  itemsInCart;
  quantityArr;
  constructor(private service :AddtocartService, private quantityService: QuantityService) { }

  ngOnInit() {
      this.service.cartItems.subscribe(items=>{
      this.itemsInCart=items;
      if(this.itemsInCart[0]){
        this.quantityArr = this.itemsInCart;
        for(let i = 0; i<this.itemsInCart.length; i++){
          console.log("this.itemsInCart[i].quantity: ", this.itemsInCart[i].quantity)
        }
      }
    })
  }

}
