import { Component, OnInit ,Input} from '@angular/core';
import { AddtocartService } from "../addtocart.service"


@Component({
  selector: 'app-cartview',
  templateUrl: './cartview.component.html',
  styleUrls: ['./cartview.component.scss']
})
export class CartviewComponent implements OnInit {
  @Input() item ;
  itemsInCart;
  constructor(private service :AddtocartService) { }

  ngOnInit() {

      this.service.cartItems.subscribe(items=>{
      this.itemsInCart=items
    })
  }

}
